UI READ ME:


libraries included:
jquery (from remote source)
jquery mobile (from remote source)
handlebars (local version)
wps-js (this library is not used. to much hassle to get this to work. would be a nice to have)


Minimum needed files:
index.html
css/style.css
js/buildForm.js
js/buildOutput.js
img/deltares-logo-m-2x.png
img/floodtags-r-logo-03b.png
img/tanzania-red-cross1.png
data/user_agreement_tanzania_app.pdf


script in the index.html initializes the page and handles data requests, you can find URLS, that need to change here
script in the buildForm.js builds the initial form based on the init data requested
script in the buildOutput.js fills the handlebar templates in index.html with the data provided from the form request.

LINES YOU HAVE TO CHANGE BEFORE DEPLOYING
-----------------------------------------
You will need to change the links in the index.html to refer to the right place. The lines where these links are located are here:
* Line 31:                     var wpsUrl = "http://tw-089.xtr.deltares.nl/cgi-bin/pywps.cgi";
* Line 224:                  <a id="agree" href="http://d01518.directory.intra:8080/tanzania_viewer/#input" class="ui-btn-right ui-btn ui-corner-all ui-btn-icon-left ui-icon-check" data-theme="b">I agree</a>
* Line 252:                  <a href="http://d01518.directory.intra:8080/tanzania_viewer/#input" data-rel="back" class="ui-btn-left ui-btn ui-corner-all ui-btn-icon-left ui-icon-carat-l">Back</a>


There is some unused script that handles a possible wps-js solution to talking with the backend.
While using a wps library has our preference, in the short time, with the limited scope,
getting this to work was more work than reading the minimum xml response and building the request url ourselves.

The application opens with a disclaimer that is possible to print and download. Without agreeing nothing happens basically.
After initalisation data is gotten from the server a form is build. The user can interact and request data based on his settings.
A pywps request is done and the response is parsed and put into templates. 
A quick note on text in the UI: these come 90% of the time from the server. 
Make sure your text (in the xml, but also in the configuration) is readable and clear for users.

There is an overview template and detailpages templates. After the templates are filled, the overview is shown and the user can move
freely from overview to detail and back again.

Going back from the overview page lands you on the form and you can try a new request.
