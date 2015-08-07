- automatic SASS compilation using libsass  with auto-prefixing
- automatic DI annotation (via ng-annotate, no need for .$inject)
- automatic typescript linting and compilation (+ concatenation and minification on dist environment)
- automatic preload of templates using html2js (+ minification on dist environment)
- continuous testing with karma
- integration testing with protractor
- automatic copy of libs and assets
- automatic injections of css/js files in index.html


## Install

- npm -g install bower
- npm -g install gulp
- npm -g install typescript
- bower install
- npm install
- ./node_modules/.bin/webdriver-manager update


To get running run the following:

- gulp



## Tasks
This uses gulp (http://gulpjs.com/) so you can call any of the tasks defined in the gulpfile.
The default one watches over the files and runs the associated tasks when needed and is called like this:

gulp

To build the version to distribute, run the following:
gulp build --type dist
