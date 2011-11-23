/**
 * @header Example App
 * @description Used to show off how cool updoc is.
 * Spoiler warning: it's <em>really cool</em>.
 */

/**
 * @module guesser
 * @header Guesser module
 * @description The main application
 */

/**
 * @module util
 * @header Util Module
 * @description Back door debugging stuff
 */

window.example = (function() {
  
  /**
   * @module guesser
   * @description Can't guess this from outside the module.
   * Is a value from 1 to 10
   */
  var SECRET = numBetween(1, 10);

  /**
   * @header Math
   * @module util.math
   * @description Useful math utilities
   */
  
  /**
   * @module util.math
   * @description Create random number between x and y
   * @param x number
   * @param y number
   * @return number
   */
  function numBetween(x, y) {
    return Math.round(Math.random() * (y - 1) + 1 + x);
  }
  
  return {
    
    /**
     * @module guesser
     * @param guessed value
     * @description Guess what the secret value is
     * @return true or false
     */
    guess: function(v) {
      return v === SECRET;
    },
    
    /**
     * @header Cheating
     * @module util.cheating
     * @description For development only!
     */
    
    /**
     * @module util.cheating
     * @description Cheat and learn the secret value
     * @return a number 1-10
     */
    cheat: function() {
      return SECRET;
    }
    
  };
  
})();
