/**
 * @header updoc
 * @description the flexible javascript documentation generator 
 */

/**
 * @module 1info
 * @header About
 * @description
 * <p>
 * updoc lets you document your code however you want. You provide the
 * information you care about, then updoc generates
 * nice-looking documentation for it. You can customize the output using
 * templates.
 * </p>
 * <p>
 * It's suitable both for internal developer documentation and external
 * api documentation.
 * </p>
 */

/**
 * @module 2features
 * @header Features
 * @flexible so you can use it however you want
 * @aware of function names, var names, and modules
 * @templates are easy to create and modify
 * @html allowed in comments
 * @json output if you want it
 */

/**
 * @module 3example
 * @header Example
 * @demo <a href="example.js">example.js</a> creates <a href="example.html">
 * example.html</a>
 * @bonus this site was created by <a href="index.js">this file</a>
 */

/**
 * @module 4contribute
 * @header Contribute
 * @description <a href="https://github.com/incompl/updoc">on github</a>
 */

/**
 * @module 5using
 * @header Using updoc
 * @description First install <a href="http://nodejs.org/">node</a>
 * and <a href="http://npmjs.org/">npm</a> if you don't have them.
 * Then install updoc like this:
 * <code>sudo npm install updoc -g</code>
 * Use updoc like this:
 * <code>updoc input.js output.html</code>
 * An optional 3rd argument specifies the template.
 * <br>
 * In your JavaScript code, put comments that look like this:
<code>/&#42;&#42;
&nbsp;&#42; &#64;param x value to be returned
&nbsp;&#42; &#64;foobar a property I made up
&nbsp;&#42;/
function bat(x) {return x;}
</code>
 * You can put whatever properties you want. There are a couple special ones:
 * <ul>
 * <li>&#64;<a href="#header-Modules">module</a> is a special property for organizing your
 * documentation.</li>
 * <li>&#64;name overrides the detected function or variable name</li>
 * <li>&#64;type overrides the detected type: 'function' 'var' or 'other'</li>
 * <li>&#64;depth overrides the module depth</li>
 * </ul>
 * That's all the special properties. However, the default template displays these two
 * properties differently:
 * <ul>
 * <li>&#64;header formats the entire section like a header. can be blank or contain a string</li>
 * <li>&#64;description this text is shown with a lighter background below other properties</li>
 * </ul>
 */

/**
 * this line is not in the output
 * @module 6rules
 * @header Rules
 * @start updoc comments with /** on new line
 * @close updoc comments with &#42;/ on new line
 * @leading *s are stripped
 * @&#64; indicates a property (escape with &amp;#64;)
 * @lines following a property
 * are included in that property
 * @text before any properties is not documented
 */

/**
 * @module 7modules
 * @header Modules
 * @description updoc sorts and nests your documentation by modules. Each updoc
 * comment can have a &#64;module property. It looks like this:
 * <code>&#64;module app.util</code>
 * The function or var name is automatically added to the end of the module if
 * appropriate. For example:
<code>/&#42;&#42;
&nbsp;&#42; &#64;module foo.bar
&nbsp;&#42;/
function bat() {} // my module is foo.bar.bat
&nbsp;
var dog = {
&nbsp;  /&#42;&#42;
&nbsp;   &#42; &#64;module dog
&nbsp;   &#42;/
&nbsp;  bark: function() {} // my module is dog.bark
};
</code>
 * Code of this form has its module set automatically:
 * <code>foo.bar.bat = function() {} // my module is foo.bar.bat</code>
 * However, for now, updoc doesn't try to guess modules in this case:
 * <code>this.bar = function() {} // my module isn't detected</code>
 * Also, the window object isn't included in your module:
 * <code>window.bar.bat = function() {} // my module is bar.bat</code>
 * Modules are only automatically detected in the line after an updoc comment.
 * There isn't a full semantic awareness of your code, just a static analysis
 * of one line per comment.<br>
 * If the module property is omitted and isn't detected you get a top-level
 * section.
 */

/**
 * @module 8templates
 * @header Templates
 * @description
 * <p>
 * updoc currently uses
 * <a href="http://documentcloud.github.com/underscore/#template">underscore
 * templates</a>.
 * </p>
 * <p>
 * Templates consume a json file. This json file is just the
 * properties provided in the updoc comments, with a few bonus properties.
 * </p>
<code>{
&nbsp;version: '0.0.1', // updoc version
&nbsp;sections: [ // each updoc comment is a section
&nbsp;&nbsp;{
&nbsp;&nbsp;  name: 'foo' // var name or function name. may be absent
&nbsp;&nbsp;  type: 'function', // function or var or other
&nbsp;&nbsp;  prop: 'val', // &#64;prop val
&nbsp;&nbsp;  module: 'example.util.foo', // &#64;module example.util
&nbsp;&nbsp;  depth: 3 // module depth. &#64;module foo is depth 1
&nbsp; }
&nbsp;]
}</code>
 * <p>
 * You can view the raw json output by specifying "json" as the output file
 * </p>
 */

/**
 * @module 90highlighting
 * @header Highlighting
 * @description
 * The default template uses
 * <a href="http://code.google.com/p/google-code-prettify/">prettify</a>.
 * To get code highlighting, just put prettify.js and prettify.css in the same
 * directory as your output. Then put code in a code element like this:
 * <code>&lt;code>function() {}&lt;/code></code>
 * </p>
 */

/**
 * @module 91footer
 * @description Created by <a href="http://incompl.com">Greg Smith</a>
 * at <a href="http://bocoup.com">Bocoup</a>
 */