var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var karma = require('karma').server;
var browserSync = require('browser-sync');


// VARIABLES ======================================================
var isDist = $.util.env.type === 'dist';
var outputFolder = isDist ? 'dist' : 'build';

var globs = {
  sass: 'src/style/**/*.scss',
  templates: 'src/templates/**/*.tpl.html',
  assets: 'src/assets/**/*.*',
  app: 'src/app/**/*.ts',
  // karma typescript preprocessor generates a bunch of .ktp.ts which gets picked
  // up by the watch, rinse and repeat
  appWithDefinitions: ['src/**/*.ts', '!src/**/*.ktp.*'],
  integration: 'src/tests/integration/**/*.js',
  index: 'src/index.html',
  srcPathForMaps: '/boilerplate/src',
};

var destinations = {
  css: outputFolder + "/style",
  js: outputFolder + "/src",
  libs: outputFolder + "/vendor",
  assets: outputFolder + "/assets",
  index: outputFolder
};

//All bower dependencies here in proper order
var vendoredLibs = [
  'vendor/jquery/dist/jquery.js',
  'vendor/angular/angular.js',
  'vendor/ui-router/release/angular-ui-router.js',
  'vendor/bootstrap-sass/assets/javascripts/bootstrap.js',
  'vendor/angular-bootstrap/ui-bootstrap-tpls.min.js',
  'vendor/restangular/src/restangular.js',
  'vendor/underscore/underscore.js',
  'vendor/angular-sanitize/angular-sanitize.js'
];


var vendorAssets = [
  'vendor/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.eot',
  'vendor/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.swg',
  'vendor/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.ttf',
  'vendor/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.woff',
  'vendor/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.woff2',
  'vendor/font-awesome/fonts/FontAwesome.otf',
  'vendor/font-awesome/fonts/fontawesome-webfont.eot',
  'vendor/font-awesome/fonts/fontawesome-webfont.svg',
  'vendor/font-awesome/fonts/fontawesome-webfont.ttf',
  'vendor/font-awesome/fonts/fontawesome-webfont.woff',
  'vendor/font-awesome/fonts/fontawesome-webfont.woff2'
];

// Will be filled automatically
var vendoredLibsMin = [];

var injectLibsPaths = {
  dev: [],
  dist: []
};

var injectPaths = {
  dev: [],
  dist: []
};

vendoredLibs.forEach(function(lib) {
  // take the filename
  var splittedPath = lib.split('/');
  var filename = splittedPath[splittedPath.length -1];
  injectLibsPaths.dev.push(destinations.libs + '/' + filename);
  // And get the minified version
  filename = filename.split('.')[0] + '.min.js';
  splittedPath[splittedPath.length - 1] = filename;
  vendoredLibsMin.push(splittedPath.join('/'));
  injectLibsPaths.dist.push(destinations.libs + '/' + filename);
});

['dev', 'dist'].forEach(function (env) {
  injectPaths[env] = injectLibsPaths[env].concat([
    destinations.js + "/app/**/module.js",
    isDist ? destinations.js + '/app.js' : destinations.js + "/app/**/*.js",
    destinations.js + "/templates.js",
    destinations.css + "/*.css"
  ]);
});

var tsProject = $.typescript.createProject({
  declarationFiles: true,
  noExternalResolve: true,
  sortOutput: true
});

// TASKS ===========================================================

gulp.task('sass', function () {
  return gulp.src(globs.sass)
    .pipe($.sass({style: 'compressed'}).on('error', $.sass.logError))
    .pipe($.autoprefixer())  // defauls to > 1%, last 2 versions, Firefox ESR, Opera 12.1
    .pipe(gulp.dest(destinations.css))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('ts-lint', function () {
  return gulp.src(globs.app)
    .pipe($.tslint())
    .pipe($.tslint.report('prose', {emitError: true}));
});

gulp.task('ts-compile', function () {
  var tsResult = gulp.src(globs.appWithDefinitions)
      .pipe($.sourcemaps.init())
      .pipe($.typescript(tsProject));

  return tsResult.js.pipe(isDist ? $.concat('app.js') : $.util.noop())
      .pipe($.ngAnnotate({gulpWarnings: false}))
      .pipe(isDist ? $.uglify() : $.util.noop())
    //.pipe($.wrap({ src: './iife.txt'}))
      .pipe($.sourcemaps.write("../maps", {includeContent: false, sourceRoot: globs.srcPathForMaps}))
      .pipe(gulp.dest(destinations.js))
      .pipe(browserSync.reload({stream: true}));

});

gulp.task('templates', function () {
  return gulp.src(globs.templates)
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.ngHtml2js({moduleName: 'templates'}))
    .pipe($.concat('templates.js'))
    .pipe(isDist ? $.uglify() : $.util.noop())
    .pipe(gulp.dest(destinations.js))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('clean', function (cb) {
  del(['dist/', 'build/'], cb);
});

gulp.task('karma-watch', function(cb) {
  karma.start({
    configFile: __dirname + '/karma.conf.js'
  }, cb);
});

gulp.task('browser-sync', function () {
  return browserSync({
    open: false,
    server: {
      baseDir: "./build"
    },
    watchOptions: {
      debounceDelay: 1000
    }
  });
});

gulp.task('copy-vendor', function () {
  return gulp.src(isDist ? vendoredLibsMin : vendoredLibs)
    .pipe(gulp.dest(destinations.libs));
});

gulp.task('copy-assets', function () {
  return gulp.src(globs.assets)
    .pipe(gulp.dest(destinations.assets));
});

gulp.task('copy-vendor-fonts', function () {
  return gulp.src(vendorAssets, {base: './'})
  .pipe($.flatten())
  .pipe(gulp.dest(destinations.assets));
});

gulp.task('index', function () {
  var target = gulp.src(globs.index);
  var _injectPaths = isDist ? injectPaths.dist : injectPaths.dev;

  return target.pipe(
    $.inject(gulp.src(_injectPaths, {read: false}), {
      ignorePath: outputFolder,
      addRootSlash: false
    })
  ).pipe(gulp.dest(destinations.index));
});

gulp.task('watch', function() {
  gulp.watch(globs.sass, gulp.series('sass'));
  gulp.watch(globs.appWithDefinitions, gulp.series('ts-lint', 'ts-compile'));
  gulp.watch(globs.templates, gulp.series('templates'));
  gulp.watch(globs.index, gulp.series('index'));
  gulp.watch(globs.assets, gulp.series('copy-assets'));
});

gulp.task(
  'build',
  gulp.series(
    'clean',
    gulp.parallel('sass', 'copy-assets', 'copy-vendor-fonts', 'ts-compile', 'templates', 'copy-vendor'),
    'index'
  )
);

gulp.task(
  'default',
  gulp.series('build', gulp.parallel('browser-sync', 'watch', 'karma-watch'))
);
