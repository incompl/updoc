var fs = require("fs");
var _ = require("underscore");
var combyne = require("combyne");

var args = process.argv.slice(2);

var file = args[0];
var targetFile = "out/result.html";

fs.readFile(file, "utf8", function (err, data) {
  var blockComments;
  var json = {sections:[]};
  
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
    var blockData = {data:{}};
    var moduleData;
    
    // get name
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
      var propVal;
      var propValLines = [];
        
      // cleanup stray comment and javadoc-ish syntax
      property = property.replace(/^[\s\*]*/m, "");
      property = property.replace(/[\s\*]*$/m, "");
      property = property.replace(/^[\s\*\/]*$/m, "");
        
      // get the prop/value info
      propInfo = property.match(/@(\S*)([\s\S]*)/);
      propName = propInfo[1];
      propVal = propInfo[2];
        
      // remove empty lines and stuff
      _.each(propVal.split(/\n/), function(line) {
        var trimmedLine = line.replace(/^[\s\*]*/, "");
        trimmedLine = trimmedLine.replace(/[\s\*]*$/, "");
        if (trimmedLine.length > 0) {
          propValLines.push(trimmedLine);
        }
      });
      
      blockData[propName] = propValLines.join("\n");
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
  
  fs.readFile("template.html", "utf8", function (err, data) {
    var html = combyne(data).render(json);
    fs.writeFile("out/result.html", html, function(err) {
      if (err) {
        console.log(err);
      }
      else {
        console.log("Success! Documentation created at " + targetFile);
      }
    }); 
  });
  
});