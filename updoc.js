updoc = function(file, targetFile, templateFile) {

  var fs = require("fs");
  var _ = require("underscore");
  
  var VERSION = "0.0.1";
  
  var args = process.argv.slice(2);
  
  if (!file) {
    console.error("Please specify an input file.");
    return;
  }
  
  if (!targetFile) {
    console.error("Please specify an output file.");
    return;
  }
  
  if (!templateFile) {
    console.error("Please specify an template file.");
    return;
  }
  
  var fileStats = fs.statSync(file);
  if (!fileStats.isFile()) {
    console.error(file + " is not a file.");
    return; 
  }
  
  var templateFileStats = fs.statSync(templateFile);
  if (!templateFileStats.isFile()) {
    console.error(templateFile + " is not a file.");
    return; 
  }
  
  fs.readFile(file, "utf8", function (err, data) {
    var blockComments;
    var json = {
      version: VERSION,
      sections:[]
    };
    
    if (err) {
      console.error("Can't read " + file + ": " + err.code);
    }
    
    blockComments = data.match(/^\s*\/\*\*[\s\S]*?\*\/\n?[^\n]*/gm);
    
    _.each(blockComments, function(commentAndNextLine) {
      var lines = commentAndNextLine.split(/\n/);
      var lastLine = lines[lines.length - 1];
      var blockComment = commentAndNextLine.match(/^\s*\/\*\*[\s\S]*?\*\//gm)[0];
      var properties = blockComment.match(/@[^@]*/g);
      var potentialValue;
      
      var detectedModule = false;
      var potentialModule = lastLine.match(/^\s*(window\.)?([\w$_.]+)\s+=\s+(.*)/);
      var module;
      var restOfModuleLine;
      
      var blockData = {};
      var moduleData;
      var deleteProps = {};
      
      // module and name for
      //   foo.bar.baz = ...;
      // and
      //   this.foo = ...;
      if (potentialModule && potentialModule[3]) {
        module = potentialModule[2];
        restOfModuleLine = potentialModule[3];
        
        // we're not smart enough to figure out "this yet
        if (!lastLine.match(/^\s*this\./)) {
          blockData.module = module;
          detectedModule = true;
        }
        
        blockData.name = module.substr(module.lastIndexOf(".") + 1);
        // if this is the module pattern, detected by the (, don't call it a function
        if (restOfModuleLine.match(/^\s*([^(]|)?\s*function\s*\(/)) {
            console.log('func');
          blockData.type = "function";
        }
        else {
          blockData.type = "other";
        }
      }
      // function name for
      //   function foo() {
      // and
      //   foo: function() {
      else if (lastLine.match("function")) {
        potentialValue = lastLine.match(/function ([\w$_]+)/);
        if (potentialValue) {
          blockData.name = potentialValue[1];
        }
        else {
          potentialValue = lastLine.match(/([\w$_]+):\s*function/);
          if (potentialValue) {
            blockData.name = potentialValue[1];
          }
        }
        blockData.type = "function";
      }
      // var name for
      //   var foo = 5;
      else if (lastLine.match("var")) {
        blockData.name = lastLine.match(/var ([\w$_]+)/)[1];
        blockData.type = "var";
      }
      else {
        blockData.type = "other";
      }
      
      _.each(properties, function(property) {
        var propInfo;
        var propName;
        var numberedPropName;
        var propVal;
        var propNum;
        var propValLines = [];
          
        // cleanup stray comment and javadoc-ish syntax
        property = property.replace(/^[\s\*]*/mg, "\n");
        property = property.replace(/[\s\*]*$/mg, "");
        property = property.replace(/^[\s\*\/]*$/mg, "");
          
        // get the prop/value info
        propInfo = property.match(/@(\S*)\s*([\s\S]*)/);
        propName = propInfo[1];
        propVal = propInfo[2];
          
        // remove empty lines and stuff
        _.each(propVal.split(/\n/), function(line) {
          if (line.length > 0) {
            propValLines.push(line);
          }
        });
        
        // add number to prop names if there is more than one with same name
        if (propName === "module") {
          blockData.module = propValLines[0];
        }
        else if (propName === "name") {
          blockData.name = propValLines[0];
        }
        else {
          numberedPropName = propName;
          while (blockData[numberedPropName]) {
            propNum = numberedPropName.match(/\d+$/);
            if (propNum) {
              numberedPropName = numberedPropName.match(/(\D+)\d+/)[1] + (Number(propNum) + 1);
            }
            else {
              blockData[numberedPropName + "1"] = blockData[numberedPropName];
              numberedPropName = numberedPropName + "2";
              deleteProps[propName] = true;
            }
          }
          blockData[numberedPropName] = propValLines.join("\n");
        }
      });
      
      // If we have numbered versions, delete the unnumbered version
      _.each(deleteProps, function(val, prop) {
        delete blockData[prop];
      });
      
      // if module wasn't detected, add the name to the provided @module
      if (!detectedModule && blockData.name) {
        if (blockData.module) {
          blockData.module += "." + blockData.name;
        }
        else {
          blockData.module = blockData.name;
        }
      }
      
      // depth
      if (blockData.module) {
        moduleData = blockData.module.split(".");
        blockData.depth = moduleData.length;
      }
      else {
        blockData.depth = 0;
      }
      
      json.sections.push(blockData);
    });
    
    // Sort the data by module
    json.sections.sort(function(a, b) {
      var aModule = a.module ? a.module.toLowerCase() : null;
      var bModule = b.module ? b.module.toLowerCase() : null;
      var aName = a.name ? a.name.toLowerCase() : null;
      var bName = b.name ? b.name.toLowerCase() : null;
      if (aModule === bModule) {
        if (aName === undefined) {
          return -1;
        }
        if (bName === undefined) {
          return 1;
        }
        return aName > bName ? 1 : -1;
      }
      else if (aModule === undefined) {
        return -1;
      }
      else if (bModule === undefined) {
        return 1;
      }
      else {
        return aModule > bModule ? 1 : -1;
      }
    });
    
    // if 2nd argument is "json" write out raw json
    if (targetFile === "json") {
      console.info(json);
    }
    else {
      
      // Apply the template and write out HTML
      fs.readFile(templateFile, "utf8", function (err, data) {
        var html = _.template(data, json);
        fs.writeFile(targetFile, html, function(err) {
          if (err) {
            console.log(err);
          }
          else {
            console.log("Success! Documentation created at " + targetFile);
          }
        }); 
      });
    
    }
    
  });
  
}
