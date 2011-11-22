var fs = require("fs");
_ = require("underscore");

var VERSION = "0.1";

var args = process.argv.slice(2);

var file = args[0] || "example.js";
var targetFile = args[1] || "out/result.html";
var templateFile = args[2] || "templates/default._template";

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
    var blockData = {};
    var moduleData;
    var deleteProps = {};
    
    // determine variable or function name
    if (lastLine.match("function")) {
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
      propInfo = property.match(/@(\S*)\s+([\s\S]*)/);
      propName = propInfo[1];
      propVal = propInfo[2];
        
      // remove empty lines and stuff
      _.each(propVal.split(/\n/), function(line) {
        if (line.length > 0) {
          propValLines.push(line);
        }
      });
      
      // add number to prop names if there is more than one with same name
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
    });
    
    // If we have numbered versions, delete the unnumbered version
    _.each(deleteProps, function(val, prop) {
      delete blockData[prop];
    });
    
    // Module info
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
    if (a.module === b.module) {
      if (a.name === undefined) {
        return false;
      }
      if (b.name === undefined) {
        return true;
      }
      return a.name > b.name;
    }
    else {
      return a.module > b.module;
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