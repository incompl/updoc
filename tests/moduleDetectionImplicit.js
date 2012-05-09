/**
 * the bare minimum
 */

var y = {
  /**
   * function in object literal
   */
  "foo": function() {}
}

/**
 * normal function
 */
function bar() {}

var x = {
  /**
   * function in object literal
   */
  "foo": function bar() {},
}

/**
 * namespace
 */
d.bar = function() {}

/**
 * this
 */
this.bar = function() {}

/**
 * window
 */
window.bar = function() {}

/**
 * module pattern
 */
var bar = (function() {return {};})();

/**
 * module pattern again
 */
window.bar = (function() {return {};})();