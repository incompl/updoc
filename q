diff --git a/out/site.html b/out/site.html
index f9b9dd2..6372149 100644
--- a/out/site.html
+++ b/out/site.html
@@ -3,342 +3,590 @@
   <head>
     <meta charset="utf-8">
     <title>updoc</title>
-    <link rel="stylesheet" href="../templates/default.css">
+    <script src="prettify.js"></script>
+    <link rel="stylesheet" href="prettify.css">
+    <style>
+body {
+  padding: 0;
+  margin: 0;
+  font-family: sans-serif;
+  line-height: 1.4em;
+}
+
+a:link {
+  color: #000498;
+}
+a:hover {
+  color: #4549ff;
+}
+a:visited {
+  color: black;
+}
+a:active {
+  color: black;
+}
+
+section {
+  padding: .6em 1em .4em;
+  margin: 1em;
+  background-color: #dce8f1;
+  border-radius: 10px;
+}
+
+h1, h2, h3 {
+  text-shadow: 1px 1px 0 #838383;
+  margin: 0 0 .2em;
+}
+
+h1 {
+  font-size: 1.6em;
+}
+
+h2 {
+  font-size: 1.4em;
+}
+
+h3 {
+  font-size: 1.2em;
+}
+
+p {
+  margin: .4em 0;
+}
+
+ul {
+  margin: 0;
+}
+
+.description {
+  background-color: rgba(255, 255, 255, .5);
+  border-radius: 5px;
+  padding: .3em .5em;
+  margin: .5em 0 .3em;
+}
+
+#content {
+  width: 900px;
+  margin: 0 auto;
+}
+
+nav {
+  float: left;
+  width: 150px;
+  padding: 8px;
+  background-color: #dce8f1;
+  border-radius: 10px;
+  border-style: none solid solid none;
+  border-width: 2px;
+  border-color: #8895a0;
+}
+
+nav ul {
+  padding: 2px 7px;
+  list-style-type: none;
+  background-color: rgba(255, 255, 255, .5);
+  border-radius: 5px;
+}
+
+#sections {
+  margin-left: 180px;
+}
+
+footer {
+  text-align: center;
+  padding: .5em 0;
+  color: #858585;
+}
+
+footer a:link, footer a:visited {
+  color: #5b5c88;
+}
+
+code {
+  display: block;
+  font-family: monospace;
+  font-size: 1.3em;
+  white-space: pre;
+  margin: .3em 0;
+  padding: .3em .5em;
+  background-color: rgba(255, 255, 255, .8);
+  border-radius: 5px;
+  color: #1f1f1f;
+}
+
+.header {
+  border-style: none solid solid none;
+  border-width: 2px;
+  border-color: #8895a0;
+}
+
+.property {
+  font-weight: bold;
+}
+
+.depth0 {
+  margin: 0em;
+}
+
+.depth0 h1 {
+  text-shadow: 1px 1px 0 #cc7800;
+}
+
+.depth0.header {
+  margin: 1em 0;
+  border-style: none solid solid none;
+  border-width: 2px;
+  border-color: #9e5d00;
+  border-radius: 20px;
+  background-color: #ffc571;
+}
+
+.depth1 {
+  margin: 1em 0 1em 2em;
+}
+
+.depth1 h1 {
+  text-shadow: 1px 1px 0 #005896;
+}
+
+.depth1.header {
+  border-style: none solid solid none;
+  border-color: #00416e;
+  border-width: 2px;
+  background-color: #c9e9ff;
+  margin: 1em 0 1em 1em;
+}
+
+.depth2 {
+  margin: 1em 0 1em 3em;
+}
+
+.depth2.header {
+  margin: 1em 0 1em 2em;
+}
+
+.depth3 {
+  margin: 1em 0 1em 4em;
+}
+
+.depth3.header {
+  margin: 1em 0 1em 3em;
+}
+    </style>
   </head>
   <body>
     <div id="content">
-      
-        <section class="depth0 header">
-        
-          <h1> updoc</h1>
+      <nav>
+        <ul>
           
+            
+              <li>
+                
+                
+                  <a href="#header-updoc">updoc</a>
+                
+                
+              </li>
+            
           
+            
+              <li>
+                -
+                
+                  <a href="#header-About">About</a>
+                
+                
+              </li>
+            
           
-          <ul>
             
-              
+              <li>
+                -
+                
+                  <a href="#header-Features">Features</a>
+                
+                
+              </li>
             
-              
+          
             
-              
+              <li>
+                -
+                
+                  <a href="#header-Example">Example</a>
+                
+                
+              </li>
             
-              
+          
+            
+              <li>
+                -
+                
+                  <a href="#header-Download">Download</a>
+                
+                
+              </li>
             
-          </ul>
           
-          <div class="description"> the flexible javascript documentation generator</div>
+            
+              <li>
+                -
+                
+                  <a href="#header-Rules">Rules</a>
+                
+                
+              </li>
+            
           
-        </section>
-      
-        <section class="depth1 header">
-        
-          <h1> About</h1>
+            
+              <li>
+                -
+                
+                  <a href="#header-Using-updoc">Using updoc</a>
+                
+                
+              </li>
+            
           
+            
+              <li>
+                -
+                
+                  <a href="#header-Modules">Modules</a>
+                
+                
+              </li>
+            
           
+            
+              <li>
+                -
+                
+                  <a href="#header-Templates">Templates</a>
+                
+                
+              </li>
+            
           
-          <ul>
             
-              
+          
+        </ul>
+      </nav>
+      <div id="sections">
+        
+          <section class="depth0 header">
+          
+            <h1 id="header-updoc">updoc</h1>
             
-              
             
-              
             
+            <ul>
               
-            
+                
+              
+                
               
+                
+              
+                
+              
+            </ul>
+            
+            <div class="description">the flexible javascript documentation generator</div>
             
-          </ul>
+          </section>
+        
+          <section class="depth1 header">
           
-          <div class="description"><p>
+            <h1 id="header-About">About</h1>
+            
+            
+            
+            <ul>
+              
+                
+              
+                
+              
+                
+              
+                
+              
+                
+              
+            </ul>
+            
+            <div class="description"><p>
 updoc doesn't tell you what to document about your code. You
 just specify whatever properties you care about, then updoc generates
 nice-looking documentation for it.
 </p>
 <p>
 It's suitable both for internal developer documentation and external
-api documentation.</div>
-          
-        </section>
-      
-        <section class="depth1 header">
+api documentation.
+</p></div>
+            
+          </section>
         
-          <h1> Features</h1>
-          
+          <section class="depth1 header">
           
-          
-          <ul>
-            
-              
+            <h1 id="header-Features">Features</h1>
             
-              
             
-              
             
+            <ul>
               
-                <li>
-                  <span class="property">
-                    flexible
-                  </span>
-                   so you can use whatever properties you want
-                </li>
+                
               
-            
+                
               
-                <li>
-                  <span class="property">
-                    aware
-                  </span>
-                   of function and var names
-                </li>
+                
               
-            
+                
+                  <li>
+                    <span class="property">
+                      flexible
+                    </span>
+                    so you can use whatever properties you want
+                  </li>
+                
               
-                <li>
-                  <span class="property">
-                    templates
-                  </span>
-                   are easy to create and modify
-                </li>
+                
+                  <li>
+                    <span class="property">
+                      aware
+                    </span>
+                    of function and var names
+                  </li>
+                
               
-            
+                
+                  <li>
+                    <span class="property">
+                      templates
+                    </span>
+                    are easy to create and modify
+                  </li>
+                
               
-                <li>
-                  <span class="property">
-                    html
-                  </span>
-                   allowed in comments
-                </li>
+                
+                  <li>
+                    <span class="property">
+                      html
+                    </span>
+                    allowed in comments
+                  </li>
+                
               
-            
+                
+                  <li>
+                    <span class="property">
+                      json
+                    </span>
+                    output if you want it
+                  </li>
+                
               
-                <li>
-                  <span class="property">
-                    json
-                  </span>
-                   output if you want it
-                </li>
+                
               
+            </ul>
             
-              
             
-          </ul>
-          
-          
-          
-        </section>
-      
-        <section class="depth1 header">
+            
+          </section>
         
-          <h1> Example</h1>
-          
-          
-            <h2>
-              function
-              
-              
-              
-              foo
-            </h2>
+          <section class="depth1 header">
           
-          
-          <ul>
+            <h1 id="header-Example">Example</h1>
             
-              
             
-              
             
+            <ul>
               
-            
+                
               
-            
+                
               
-                <li>
-                  <span class="property">
-                    param1
-                  </span>
-                   x Number
-                </li>
+                
               
-            
+                
+                  <li>
+                    <span class="property">
+                      demo
+                    </span>
+                    <a href="example.js">example.js</a> creates <a href="example.html">
+example.html</a>
+                  </li>
+                
               
-                <li>
-                  <span class="property">
-                    param2
-                  </span>
-                   y Number
-                </li>
+                
+                  <li>
+                    <span class="property">
+                      bonus
+                    </span>
+                    this site was created by <a href="site.js">this file</a>
+                  </li>
+                
               
-            
-              
-                <li>
-                  <span class="property">
-                    param3
-                  </span>
-                   z Number
-                </li>
+                
               
+            </ul>
             
-              
-                <li>
-                  <span class="property">
-                    return
-                  </span>
-                   Number
-                </li>
-              
             
-              
             
-              
-            
-          </ul>
-          
-          <div class="description"> This section created from:
-<code>
-&#47;&#42;&#42;
-&nbsp;&#42; &#64;module 3example
-&nbsp;&#42; &#64;header Example
-&nbsp;&#42; &#64;param x Number
-&nbsp;&#42; &#64;param y Number
-&nbsp;&#42; &#64;param z Number
-&nbsp;&#42; &#64;return Number
-&nbsp;&#42; &#64;description This section created from:
-&nbsp;&#42; &lt;code>...&lt;/code>
-&nbsp;&#42;&#47;
-function foo(x, y, z) {return x + y + z;}
-</code>
-<p><a href="example.js">example.js</a> creates <a href="example.html">example.html</a></p>
-<p>See also <a href="site.js">the js file that generated this site</a></p></div>
-          
-        </section>
-      
-        <section class="depth1 header">
+          </section>
         
-          <h1> Rules</h1>
-          
-          
+          <section class="depth1 header">
           
-          <ul>
+            <h1 id="header-Download">Download</h1>
             
-              
-            
-              
             
-              
             
+            <ul>
               
-                <li>
-                  <span class="property">
-                    start
-                  </span>
-                   updoc comments with /** on new line
-                </li>
+                
               
-            
+                
               
-                <li>
-                  <span class="property">
-                    close
-                  </span>
-                   updoc comments with &#42;/ on new line
-                </li>
+                
               
-            
+                
               
-                <li>
-                  <span class="property">
-                    leading
-                  </span>
-                   *s are stripped
-                </li>
+                
               
+            </ul>
             
-              
-                <li>
-                  <span class="property">
-                    &#64
-                  </span>
-                   indicates a property (escape with &amp;#64;)
-                </li>
-              
+            <div class="description"><a href="https://github.com/incompl/updoc">on github</a></div>
             
-              
-                <li>
-                  <span class="property">
-                    lines
-                  </span>
-                   following a property
+          </section>
+        
+          <section class="depth1 header">
+          
+            <h1 id="header-Rules">Rules</h1>
+            
+            
+            
+            <ul>
+              
+                
+              
+                
+              
+                
+              
+                
+                  <li>
+                    <span class="property">
+                      start
+                    </span>
+                    updoc comments with /** on new line
+                  </li>
+                
+              
+                
+                  <li>
+                    <span class="property">
+                      close
+                    </span>
+                    updoc comments with &#42;/ on new line
+                  </li>
+                
+              
+                
+                  <li>
+                    <span class="property">
+                      leading
+                    </span>
+                    *s are stripped
+                  </li>
+                
+              
+                
+                  <li>
+                    <span class="property">
+                      &#64;
+                    </span>
+                    indicates a property (escape with &amp;#64;)
+                  </li>
+                
+              
+                
+                  <li>
+                    <span class="property">
+                      lines
+                    </span>
+                    following a property
 are included in that property
-                </li>
+                  </li>
+                
               
-            
+                
+                  <li>
+                    <span class="property">
+                      text
+                    </span>
+                    before any properties is not documented
+                  </li>
+                
               
-                <li>
-                  <span class="property">
-                    text
-                  </span>
-                   before any properties is not documented
-                </li>
+                
               
+            </ul>
             
-              
             
-          </ul>
-          
-          
-          
-        </section>
-      
-        <section class="depth1 header">
+            
+          </section>
         
-          <h1> Using updoc</h1>
-          
-          
+          <section class="depth1 header">
           
-          <ul>
+            <h1 id="header-Using-updoc">Using updoc</h1>
             
-              
             
-              
             
+            <ul>
               
-            
+                
               
-            
+                
+              
+                
               
+                
+              
+                
+              
+            </ul>
             
-          </ul>
-          
-          <div class="description"> You can use updoc like this:
+            <div class="description">You can use updoc like this:
 <code>node updoc input.js output.html</code>
 An optional 3rd argument specifies the template.</div>
-          
-        </section>
-      
-        <section class="depth1 header">
+            
+          </section>
         
-          <h1> Modules</h1>
-          
+          <section class="depth1 header">
           
-          
-          <ul>
+            <h1 id="header-Modules">Modules</h1>
             
-              
             
-              
             
+            <ul>
               
-            
+                
               
-            
+                
+              
+                
               
+                
+              
+                
+              
+            </ul>
             
-          </ul>
-          
-          <div class="description"> updoc organizes your documentation by modules. Each comment
-block can have a &#64module property. It looks like this:
-<code>&#64module app.util.foobar</code>
+            <div class="description">updoc organizes your documentation by modules. Each comment
+block can have a &#64;module property. It looks like this:
+<code>&#64;module app.util.foobar</code>
 Sections are nested by
 the module's depth and sorted by name. The sort order follows:
 <ol>
@@ -346,36 +594,35 @@ the module's depth and sorted by name. The sort order follows:
 <li>alphabetical by name (for functions and vars)</li>
 <li>order of appearance in source</li>
 </ol>
-If the module property is ommitited it is a top-level section.</div>
-          
-        </section>
-      
-        <section class="depth1 header">
+If the module property is omitted it is a top-level section.</div>
+            
+          </section>
         
-          <h1> Templates</h1>
-          
+          <section class="depth1 header">
           
-          
-          <ul>
+            <h1 id="header-Templates">Templates</h1>
             
-              
             
-              
             
+            <ul>
               
-            
+                
               
-            
+                
               
+                
+              
+                
+              
+                
+              
+            </ul>
             
-          </ul>
-          
-          <div class="description"><p>
+            <div class="description"><p>
 Templates consume a json file. This json file is just the
 properties provided in the updoc comments, with a few bonus properties.
 </p>
-<code>
-{
+<code>{
 &nbsp;version: '0.1', // updoc version
 &nbsp;sections: [ // each updoc comment is a section
 &nbsp;&nbsp;{
@@ -386,8 +633,7 @@ properties provided in the updoc comments, with a few bonus properties.
 &nbsp;&nbsp;  depth: 2 // module depth. &#64;module foo.bar.bat is depth 3
 &nbsp; }
 &nbsp;]
-}
-</code>
+}</code>
 <p>
 No other properties are special, but the template can decide to make them
 special. For example, the default template has special formatting for
@@ -395,36 +641,51 @@ special. For example, the default template has special formatting for
 the updoc code itself.
 </p>
 <p>
+updoc currently uses
+<a href="http://documentcloud.github.com/underscore/#template">underscore
+templates</a>.
+</p>
+<p>
 You can view the raw json output by specifying "json" as the output file
 </p>
 <code>node updoc example.js json</code></div>
-          
-        </section>
-      
-        <section class="depth0 ">
+            
+          </section>
         
+          <section class="depth0 ">
           
-          
-          
-          
-          <ul>
             
-              
             
-              
             
+            
+            <ul>
+              
+                
+              
+                
               
+                
+              
+            </ul>
             
-          </ul>
-          
-          <div class="description"> Created by <a href="http://incompl.com">Greg Smith</a>
+            <div class="description">Created by <a href="http://incompl.com">Greg Smith</a>
 at <a href="http://bocoup.com">Bocoup</a></div>
-          
-        </section>
-      
+            
+          </section>
+        
+      </div>
     </div>
     <footer>
       generated by <a href="https://github.com/incompl/updoc">updoc</a> 0.1
     </footer>
+    <script>
+(function() {
+  var codes = document.getElementsByTagName("code")
+  for (var i = 0; i < codes.length; i++) {
+    codes[i].className = codes[i].className + " prettyprint";
+  }
+  prettyPrint();
+})();
+  </script>
   </body>
 </html>
\ No newline at end of file
