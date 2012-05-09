/*
Run me at the command line with "nodeunit test.js"
  
In the tests folder, each foo.js file is input and foo.json is used to test
the result of running "updoc foo.js json"

The expected and actual results are compared semantically.
Formatting will not cause tests to fail.
*/

var TESTS_DIR = "tests";

var path = require("path");
var fs = require("fs");
var _ = require("underscore");
var updoc = require("./index.js");

var files = fs.readdirSync(TESTS_DIR);
var jsFiles = {};
var jsonFiles = {};

_.each(files, function(file) {
  if (file.match(/\.js$/)) {
    jsFiles[file] = true;
  }
  else if (file.match(/\.json$/)) {
    jsonFiles[file] = true;
  }
});

_.each(jsFiles, function(val, jsFileName) {
  var jsonFileName = jsFileName.replace(/js$/, "json");
  if (!jsonFiles[jsonFileName]) {
    console.error("No json file for " + jsFileName);
    delete jsFiles[jsFileName];
  }
  else {
    jsFiles[jsFileName] = jsonFileName; 
  }
});

_.each(jsFiles, function(val, jsFileName) {
  exports[jsFileName] = function(test) {
    
    var actual = JSON.parse(updoc(path.join(TESTS_DIR, jsFileName),
                            "dry",
                            path.join("templates", "default._template")));
                            
    var expected = JSON.parse(fs.readFileSync(path.join(TESTS_DIR,
                                                        jsFiles[jsFileName])));
                                                        
    test.equal(actual.sections.length,
               expected.sections.length,
               "section count");
    
    if (actual.sections.length === expected.sections.length) {
      for (var i = 0; i < actual.sections.length; i++) {
        
        _.each(expected.sections[i], function(val, prop) {
          test.equal(actual.sections[i][prop],
                     expected.sections[i][prop],
                     "section: " + (i + 1) +" property: " + prop);
        });
      }
    }
    
    test.done();
  }
});
