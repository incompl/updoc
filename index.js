/*
updoc.js -- a flexible documentation generator for javascript

Copyright (C) 2011 Greg Smith <gsmith@incompl.com>

Released under the MIT license:
https://github.com/incompl/updoc/blob/master/LICENSE

Created at Bocoup http://bocoup.com
*/

module.exports = function(inputFile, outputFile, templateFile) {

  // dependencies
  var path = require("path");
  var fs = require("fs");
  var _ = require("underscore");

  // get updoc version
  var packageInfoFile = path.join(__dirname, "/package.json");
  var packageInfoData = fs.readFileSync(packageInfoFile, "utf8");
  var packageInfo = JSON.parse(packageInfoData);
  var VERSION = packageInfo.version;
  
  // shared :|
  var i;

  var html;
  var fileData;
  
  var returnValue;
  
  // parameter checks
  
  var args = process.argv.slice(2);
  
  if (!inputFile) {
    console.error("Please specify an input file.");
    return;
  }
  
  if (!outputFile) {
    console.error("Please specify an output file.");
    return;
  }
  
  if (!templateFile) {
    console.error("Please specify an template file.");
    return;
  }
  
  var fileStats = fs.statSync(inputFile);
  if (!fileStats.isFile()) {
    console.error(inputFile + " is not a file.");
    return; 
  }
  
  var templateFileStats = fs.statSync(templateFile);
  if (!templateFileStats.isFile()) {
    console.error(templateFile + " is not a file.");
    return; 
  }
  
  if (!inputFile.match(/\.js$/)) {
    console.error("Input file should be a .js file");
    return;
  }
  
  if (outputFile.match(/\.js$/)) {
    console.error("Output file should not be a .js file");
    return;
  }
  
  // parse the input file
  var data = fs.readFileSync(inputFile, "utf8");
  
  // parse out each updoc comment, including the line after the comment ends
  var updocComments = data.match(/^\s*\/\*\*[\s\S]*?\*\/\n?[^\n]*/gm);
  
  // start result object we will output as json
  var json = {
    version: VERSION,
    sections: [],
    deepest_depth: 0,
    shallowest_depth: 9999
  };
  
  // for each updoc comment...
  _.each(updocComments, function(commentAndNextLine) {

    // the data for this comment that will be in the output json
    var sectionData = {};
    
    // section isn't output if it contains page info such as @_page_title
    var sectionHasPageInfo = false;
    
    // get the "code line" aka the line after the comment ends. may be blank.
    // we'll be trying to infer name and module info from it.
    var lines = commentAndNextLine.split(/\n/);
    var codeLine = lines[lines.length - 1];
    
    // isolate the comment and get the @properties from it
    var blockComment = commentAndNextLine.match(/^\s*\/\*\*[\s\S]*?\*\//gm)[0];
    var properties = blockComment.match(/@[^@]*/g);
    
    // module detection
    var module;
    var detectedModule = false;
    var restOfModuleLine;
    var moduleRegexResult = codeLine.match(/^\s*(window\.)?([\w$_.]+)\s+=\s+(.*)/);
    if (moduleRegexResult && moduleRegexResult.length > 2) {
      module = moduleRegexResult[2];
      restOfModuleLine = moduleRegexResult[3];
    }
    
    // properties that are obviated and will be deleted later
    var deleteProps = {};
    
    // module name and type for
    //   foo.bar.baz = ...;
    // and
    //   this.foo = ...;
    // and
    //   window.foo = ...;
    if (module && restOfModuleLine) {
      
      // we're not smart enough to figure out "this" yet
      if (!codeLine.match(/^\s*this\./)) {
        sectionData._module = module;
        detectedModule = true;
      }
      
      sectionData._name = module.substr(module.lastIndexOf(".") + 1);
      
      // if this is the module pattern, detected by the (, don't call it a
      // function.
      // EG: in this example foo is not type=function in the output
      // var foo = (function() {return {};})();
      if (restOfModuleLine.match(/^\s*([^(]|)?\s*function\s*\(/)) {
        sectionData._type = "function";
        sectionData._params = restOfModuleLine.match(/function\s*\(([^)]*)\)/)[1];
      }
      else {
        sectionData._type = "other";
      }
    }
    
    // name and type for
    //   function foo() {
    // and
    //   foo: function() {
    // but not
    //   var (function() {return {};})();
    else if (codeLine.match(/^[^(]*function/)) {
      (function() {
        var regexResult = codeLine.match(/function ([\w$_]+)\s*\(([^)]*)\)/);
        if (regexResult) {
          sectionData._name = regexResult[1];
          sectionData._params = regexResult[2];
        }
        else {
          regexResult = codeLine.match(/([\w$_]+):\s*function\s*\(([^)]*)\)/);
          if (regexResult) {
            sectionData._name = regexResult[1];
            sectionData._params = regexResult[2];
          }
        }
      })();
      sectionData._type = "function";
    }
    
    // name and type for
    //   var foo = 5;
    else if (codeLine.match("var")) {
      sectionData._name = codeLine.match(/var ([\w$_]+)/)[1];
      sectionData._type = "var";
    }
    
    // name and type not detected
    else {
      sectionData._type = "other";
    }
    
    // for each property in the section...
    _.each(properties, function(property) {
      var propRegexResult;
      var propName;
      var propVal;
      var numberedPropName; // duplicate props get numbers on the end
      var previousNumberedPropName;
      var propNum;
      var propValLines = [];
        
      // cleanup stray comment and javadoc-ish syntax
      property = property.replace(/^[\s\*]*/mg, "\n");
      property = property.replace(/[\s\*]*$/mg, "");
      property = property.replace(/^[\s\*\/]*$/mg, "");
        
      // get the prop/value info
      propRegexResult = property.match(/@(\S*)\s*([\s\S]*)/);
      propName = propRegexResult[1];
      propVal = propRegexResult[2];
        
      // remove empty lines
      _.each(propVal.split(/\n/), function(line) {
        if (line.length > 0) {
          propValLines.push(line);
        }
      });
      
      // these properties are overrides if provided
      if (propName === "_module") {
        sectionData._module = propValLines[0];
        detectedModule = false;
      }
      else if (propName === "_name") {
        sectionData._name = propValLines[0];
      }
      else if (propName === "_type") {
        sectionData._type = propValLines[0];
      }
      else if (propName === "_params") {
        sectionData._params = propValLines[0];
      }
      
      // these properties are for the whole page, not this section
      else if (propName.match(/^_page_/)) {
        sectionHasPageInfo = true;
        json[propName.substr(6)] = propValLines[0] || "";
      }
      
      // put numbers on the end of duplicate properties
      // @param and @param become @param1 and @param2
      // if the prop ends with a colon, the number goes before the colon
      else {
        numberedPropName = propName;
        while (sectionData[numberedPropName]) {
          propNum = numberedPropName.match(/(\d+):?$/);
          if (propNum) {
            numberedPropName = numberedPropName.match(/(\D+):?\d+/)[1];
            numberedPropName += (Number(propNum[1]) + 1);
            if (propName.match(/:$/)) {
              numberedPropName += ":";
            }
          }
          else {
            previousNumberedPropName = propName.replace(/([^:]*)(:?)$/, "$11");
            if (propName.match(/:$/)) {
              previousNumberedPropName += ":";
            }
            sectionData[previousNumberedPropName] = sectionData[propName];
            numberedPropName = propName.replace(/([^:]*)(:?)$/, "$12");
            if (propName.match(/:$/)) {
              numberedPropName += ":";
            }
            deleteProps[propName] = true;
          }
        }
        sectionData[numberedPropName] = propValLines.join("\n");
      }
    });
    
    // if we have numbered versions, delete the unnumbered version
    _.each(deleteProps, function(val, prop) {
      delete sectionData[prop];
    });
    
    // if module wasn't detected, add the name to the provided @module
    if (!detectedModule && sectionData._name) {
      if (sectionData._module) {
        sectionData._module += "." + sectionData._name;
      }
      else {
        sectionData._module = sectionData._name;
      }
    }
    
    // if module was detected but custom name was provided
    if (detectedModule && sectionData._name) {
      sectionData._module = sectionData._module.replace(/\.[^.]*$/,
                                                        "." + sectionData._name);
    }
    
    // module depth
    if (sectionData._module && !sectionData._depth) {
      sectionData._depth = sectionData._module.split(".").length;
      if (sectionData._depth > json.deepest_depth) {
        json.deepest_depth = sectionData._depth;
      }
      if (sectionData._depth < json.shallowest_depth) {
        json.shallowest_depth = sectionData._depth;
      }
    }
    else if (!sectionData._depth) {
      sectionData._depth = 0;
    }
    
    // this section is done, add it to the output
    if (!sectionHasPageInfo) {
      json.sections.push(sectionData);
    }
    
  });
  
  // sort the data by module, then by name
  // the module contains the name,
  // but the name is important if there is no module
  json.no_sort = json.no_sort !== undefined;
  if (!json.no_sort) {
    json.sections.sort(function(a, b) {
      var aModule = a._module ? a._module.toLowerCase() : null;
      var bModule = b._module ? b._module.toLowerCase() : null;
      var aName = a._name ? a._name.toLowerCase() : null;
      var bName = b._name ? b._name.toLowerCase() : null;
      if (aModule === bModule) {
        if (!aName) {
          return -1;
        }
        if (!bName) {
          return 1;
        }
        return aName > bName ? 1 : -1;
      }
      else if (!aModule) {
        return -1;
      }
      else if (!bModule) {
        return 1;
      }
      else {
        return aModule > bModule ? 1 : -1;
      }
    });
  }
  
  // page defaults
  if (!json.title) {
    json.title = "Change Title with @_page_title property";
  }
  if (!json.description) {
    json.description = "";
  }
  if (!json.css) {
    json.css = false;
  }
  json.compact_index = json.compact_index !== undefined;
  
  // always return json to caller
  returnValue = JSON.stringify(json);
  
  // if 2nd argument is "json" write out raw json
  if (outputFile === "json") {
    console.info(returnValue);
  }
  
  // if 2nd argument is "dry" this is a dry run that doesn't do anything
  // besides having updoc() return its result 
  else if (outputFile !== "dry") {
    
    // Apply the template and write out HTML
    fileData = fs.readFileSync(templateFile, "utf8");
    html = _.template(fileData, json);
    
    fs.writeFileSync(outputFile, html);
    console.log("Success! Documentation created at " + outputFile);
  
  }
  
  return returnValue;
  
};
