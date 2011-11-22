/**
 * @header updoc
 * @description the flexible javascript documentation generator 
 */

/**
 * @module 1info
 * @header About
 * @description
 * <p>
 * updoc doesn't tell you what to document about your code. You
 * just specify whatever properties you care about, then updoc generates
 * nice-looking documentation for it.
 * </p>
 * <p>
 * It's suitable both for internal developer documentation and external
 * api documentation.
 */

/**
 * @module 2features
 * @header Features
 * @flexible so you can use whatever properties you want
 * @aware of function and var names
 * @templates are easy to create and modify
 * @html allowed in comments
 * @json output if you want it
 */

/**
 * @module 3download
 * @header Download
 * @description <a href="https://github.com/incompl/updoc">on github</a>
 */

/**
 * @module 3example
 * @header Example
 * @param x Number
 * @param y Number
 * @param z Number
 * @return Number 
 * @description
 * <p><a href="example.js">example.js</a> creates <a href="example.html">example.html</a></p>
 * <p>This section was created from:</p>
 <code>&#47;&#42;&#42;
&nbsp;&#42; &#64;module 3example
&nbsp;&#42; &#64;header Example
&nbsp;&#42; &#64;param x Number
&nbsp;&#42; &#64;param y Number
&nbsp;&#42; &#64;param z Number
&nbsp;&#42; &#64;return Number 
&nbsp;&#42; &#64;description This section was created from:
&nbsp;&#42; &lt;code>...&lt;/code>
&nbsp;&#42;&#47;
function foo(x, y, z) {return x + y + z;}</code>
 * <p>See also <a href="site.js">the js file that generated this site</a></p>
 */
function foo(x, y, z) {return x + y + z;}

/**
 * not documented
 * @module 4rules
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
 * @module 5using
 * @header Using updoc
 * @description You can use updoc like this:
 * <code>node updoc input.js output.html</code>
 * An optional 3rd argument specifies the template.
 *
 */

/**
 * @module 6modules
 * @header Modules
 * @description updoc organizes your documentation by modules. Each comment
 * block can have a &#64;module property. It looks like this:
 * <code>&#64;module app.util.foobar</code>
 * Sections are nested by
 * the module's depth and sorted by name. The sort order follows:
 * <ol>
 *   <li>alphabetical by module</li>
 *   <li>alphabetical by name (for functions and vars)</li>
 *   <li>order of appearance in source</li>
 * </ol>
 * If the module property is ommitited it is a top-level section.
 */

/**
 * @module 7templates
 * @header Templates
 * @description
 * <p>
 * Templates consume a json file. This json file is just the
 * properties provided in the updoc comments, with a few bonus properties.
 * </p>
<code>{
&nbsp;version: '0.1', // updoc version
&nbsp;sections: [ // each updoc comment is a section
&nbsp;&nbsp;{
&nbsp;&nbsp;  name: 'foo' // var name or function name. may be absent
&nbsp;&nbsp;  type: 'function', // function or var or other
&nbsp;&nbsp;  prop: 'val', // &#64;prop val
&nbsp;&nbsp;  module: 'example.util', // &#64;module example.util
&nbsp;&nbsp;  depth: 2 // module depth. &#64;module foo.bar.bat is depth 3
&nbsp; }
&nbsp;]
}</code>
 * <p>
 * No other properties are special, but the template can decide to make them
 * special. For example, the default template has special formatting for
 * &#64;header and &#64;description. These are not treated specially by
 * the updoc code itself.
 * </p>
 * <p>
 * updoc currently uses
 * <a href="http://documentcloud.github.com/underscore/#template">underscore
 * templates</a>.
 * </p>
 * <p>
 * You can view the raw json output by specifying "json" as the output file
 * </p>
 * <code>node updoc example.js json</code>
 */

/**
 * @description Created by <a href="http://incompl.com">Greg Smith</a>
 * at <a href="http://bocoup.com">Bocoup</a>
 */