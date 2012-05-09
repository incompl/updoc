/**
 * explicit module
 * @_module a
 */

/**
 * normal function
 * @_module b
 */
function bar() {}

var x = {
  /**
   * function in object literal
   * @_module c 
   */
  "foo": function bar() {},
  
    /**
   * function in object literal
   * @_module ca
   */
  "foo": function() {}
}

/**
 * namespace
 * @_module d
 */
d.bar = function() {}

/**
 * this
 * @_module e
 */
this.bar = function() {}

/**
 * window
 * @_module f
 */
window.bar = function() {}

/**
 * module pattern
 * @_module g
 */
var bar = (function() {return {};})();

/**
 * module pattern again
 * @_module h
 */
window.bar = (function() {return {};})();