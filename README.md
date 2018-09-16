Default Styleguide
=================

Frontend boilerplate/utility-belt/... running on [Gulp](http://gulpjs.com/), [Sass](http://sass-lang.com/) & [nunjucks templates](https://mozilla.github.io/nunjucks/)

Principle
---------
* `development/` contains application code and assets
    * `fonts` contains the webfonts and the assets to generate the iconfont
    * `img` contains all images used in the project
    * `js` javascript files
    * `meta` contains some meta tags that are needed for creating deploys (.htaccess, favicons, ...)
    * `sass` the sass files for styling
    * `templates` Nunjucks templates (same folder-structure philosophy as for `sass/`)
* `deploy/` contains the built application
* `dist/` contains build files for CDN use.
* `Gulpfile.js` configures Gulp tasks
    * `gulp/` contains the separated gulp tasks
    * `gulp/config/config-default.json` Contains default keys for running the gulp tasks.
* `package.json` contains npm dependencies


Installing
----------
Prerequisites for installing

* [Node](http://nodejs.org) (for gulp build environment)
* [NPM](https://www.npmjs.com/) (for package management)

please read the `package.json` file for additional dependencies.

###How to get started

1) If not present on your system (aka install once)

* install [Node](http://nodejs.org) + [NPM](https://www.npmjs.com/)
* `(sudo) npm install gulp -g`: install Gulp (globaly)

2) Navigate to your project folder (aka install for each project)

* `(sudo) npm install`: install npm dependencies

### config

You can find a default configuration file in `gulp/config/config-default.json`.
Please copy and rename this file to `config.json`. This new file is your own
personal configuration and can be set as you want. It will not be committed.

the config file contains following self-explanatory data-keys

 * `PROJECT_*` project related naming and metadata



Common tasks
------------

* `gulp` same as gulp server but opens the new page in a browser window automatically (being lazy is not a crime)
* `gulp server` to start a web server (including livereload, running on port 9000)
* `gulp build` to build a production-ready application in the `deploy/` folder
* `gulp iconfont` to create an icon font from a set of svg-sources that are found in `developent/fonts/icon-sources/*.svg`
* `gulp semver -m '[your message]' [ --patch | --minor | --major ]` gives a versionbump to `version.json` using the parameters given.
* `gulp distribute` Creates a `dist/` deploy and pushes it to the `DIST_FTP` if configured
* `gulp deploy -m '[your message]' [ --patch | --minor | --major ]` The master task to make builds. Keep in mind that following tasks are a dependency from this task:
    * `build` + the `deploy/` is pushed to the `FTP` if configured
    * `semver` Make shure to give the right parameters
    * if `DIST_FTP` is configured, than `distribute` is executed as well
