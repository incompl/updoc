/**
 * @_page_title Example App
 * @_page_description Used to show off how cool updoc is.
 * Spoiler warning: it's <em>really cool</em>.
 */

/**
 * @_module guesser
 * @header Guesser module
 * @description The main application
 */

/**
 * @_module util
 * @header Util Module
 * @description Back door debugging stuff
 */

window.example = (function() {
  
  /**
   * @_module guesser
   * @description Can't guess this from outside the module.
   * Is a value from 1 to 10
   */
  var SECRET = numBetween(1, 10);

  /**
   * @_module util.math
   * @header Math
   * @description Useful math utilities
   */
  
  /**
   * @_module util.math
   * @description Create random number between x and y
   * @return number
   */
  function numBetween(x, y) {
    return Math.round(Math.random() * (y - 1) + 1 + x);
  }
  
  return {
    
    /**
     * @_module guesser
     * @description Guess what the secret value is
     * @return true or false
     */
    guess: function(value) {
      return value === SECRET;
    },
    
    /**
     * @_module util.cheating
     * @header Cheating
     * @description For development only!
     */
    
    /**
     * @_module util.cheating
     * @description Cheat and learn the secret value
     * @return a number 1-10
     */
    cheat: function() {
      return SECRET;
    }
    
  };
  
})();
