/**
 * @_page_title updoc
 * @_page_description the flexible javascript documentation generator
 * @_page_compact_index
 * @_page_no_sort
 */

/**
 * @header About
 * @description
 * <p>
 * updoc converts special comments in your code into nice-looking documentation.
 * You can document whatever information you want, and you can customize the
 * output with templates.
 * </p>
 * <p>
 * Contribute on <a href="https://github.com/incompl/updoc">github</a>
 * </p>
 */

/**
 * @header Examples
 * @demo <a href="example.js">example.js</a> creates <a href="example.html">
 * example.html</a>
 * @boxbox uses updoc for its
 * <a href="http://incompl.github.com/boxbox/updoc.html">api documentation</a>
 * @bonus this site was created by <a href="index.js">this file</a>
 */

/**
 * @header Getting Started
 * @description
 * 
 * First install <a href="http://nodejs.org/">node</a>
 * and <a href="http://npmjs.org/">npm</a> if you don't have them.
 * Then install updoc like this:
 * <code>sudo npm install updoc -g</code>
 * Use updoc like this:
 * <code>updoc input.js output.html</code>
 * An optional 3rd argument specifies the template.<br>
 * In your JavaScript code, put comments that look like this:
<code>/&#42;&#42;
&nbsp;&#42; &#64;secure true
&nbsp;&#42;/
 function multiply(a, b) {return a * b;}
</code>
 * This comment says that the function "multiply" has a property "secure" with
 * the value "true". You can put whatever properties you want.
 * The function name and parameters are detected and included in the
 * documentation automatically.
 */

/**
 * this line is not in the output
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
 * @header Special Properties
 * @description
 * Special updoc properties start with an underscore.
 * <ul>
 * <li>&#64;<a href="#header-Modules">_module</a> is a special property for organizing your
 * documentation.</li>
 * <li>&#64;_depth overrides the module depth</li>
 * <li>&#64;_name overrides the detected function or variable name</li>
 * <li>&#64;_params overrides the detected parameter list</li>
 * <li>&#64;_type overrides the detected type: 'function' 'var' or 'other'</li>
 * </ul>
 * 
 * <h2>properties with special formatting</h2>
 * The following properties aren't "special" but the default template displays
 * them differently:
 * <ul>
 * <li>&#64;header is used in the table of contents if no name is found</li>
 * <li>&#64;description text is shown below other properties</li>
 * </ul>
 * 
 * <h2>updoc page properties</h2>
 * If an updoc comment contains any of these properties, that comment isn't output
 * and instead defines information about the whole page.
 * <ul>
 * <li>&#64;_page_title title for the whole page</li>
 * <li>&#64;_page_description text shown under the title</li>
 * <li>&#64;_page_css external css file to include</li>
 * <li>&#64;_page_compact_index displays the deepest tier of your index
 * inline instead of as list items</li>
 * <li>&#64;_page_no_sort do not sort the output</li>
 * </ul>
 */

/**
 * @header Modules
 * @description updoc sorts and nests your documentation by modules. Each updoc
 * comment can have a &#64;_module property. It looks like this:
 * <code>&#64;_module app.util</code>
 * The function or var name is automatically added to the end of the module if
 * appropriate. For example:
<code>/&#42;&#42;
&nbsp;&#42; &#64;_module foo.bar
&nbsp;&#42;/
function bat() {} // my module is foo.bar.bat
&nbsp;
var dog = {
&nbsp;  /&#42;&#42;
&nbsp;   &#42; &#64;_module dog
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
 * @header Templates
 * @description
 * <p>
 * updoc currently uses
 * <a href="http://documentcloud.github.com/underscore/#template">underscore
 * templates</a>.
 * </p>
 * <p>
 * Templates consume a json file. This json file contains the
 * properties provided in the updoc comments, with a few bonus properties.
 * </p>
<code>{
&nbsp;version: '0.0.1', // updoc version
&nbsp;title: 'updoc', // value of &#64;_page_title
&nbsp;...
&nbsp;sections: [ // each updoc comment is a section
&nbsp;&nbsp;{
&nbsp;&nbsp;  _name: 'foo' // var name or function name
&nbsp;&nbsp;  _type: 'function', // function or var or other
&nbsp;&nbsp;  _params: 'x, y', // function parameters
&nbsp;&nbsp;  _module: 'example.util.foo', // full module name
&nbsp;&nbsp;  _depth: 3 // module nesting level
&nbsp;&nbsp;  awesome: 'extremely' // custom property
&nbsp; }
&nbsp;]
}</code>
 * <p>
 * You can view the raw json output by specifying "json" as the output file
 * </p>
 */


/**
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
 * @description Created by <a href="http://incompl.com">Greg Smith</a>
 * at <a href="http://bocoup.com">Bocoup</a>
 */
