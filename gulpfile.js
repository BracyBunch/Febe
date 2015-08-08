var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');

gulp.task('default', function(){
  //this the bundler - using browserify
  var bundler = watchify(browserify({
    //first file to look to on how to bundle together, which tends to be app.js
    entries: ['./public/app.jsx'],
    //turn it to JS
    transform: [reactify],
    //files it needs to look at while building
    extensions: ['.jsx'],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  }))

  //this is what is actually doing the building. Telling bundle to bundle
  var build = function(file){
    if(file) gutil.log('recompiling' + file);
      return bundler
        .bundle()
        //says if there is an error during the bundle process, tell us
        .on('error', gutil.log.bind(gutil, 'browserify Error'))
        //put everything into one file called main.js
        .pipe(source('main.js'))
        //put main.js into the main directory
        .pipe(gulp.dest('./'));
    
  };
  build();
  //whenver there is a change in the files it runs the build
  bundler.on('update', build);
});