var gulp = require('gulp')
  , concat = require('gulp-concat')
  , insert = require('gulp-insert')
  , path = require('path')
  , gutil = require('gulp-util')
  , plumber = require('gulp-plumber')
  , sass = require('gulp-sass')
// NOTE: autoprefixer requires a newer version of node.
//  , autoprefixer = require('gulp-autoprefixer')
  , ROOT_PATH = path.resolve(__dirname)
  , MARS_LOCATION = '../../../mars/MARS20/MarsUI/Content/OnBoarding'
  , ECOMMERCE_LOCATION = '../../../RA-Shopping-Cart--UI/ShoppingCart/ShoppingCart/Styles'
  , ISAMPLE_LOCATION = '../../../iSample/BFW_Web/Styles';

gulp.task('marsCSSBundle', function() {
    return gulp.src(['scss/mars/normalize.scss','scss/mars/LP_font.scss','scss/mars/loading.scss','scss/mars/font-awesome.scss','scss/mars/overrides.scss','scss/mars/MARS.scss'])
    .pipe(insert.transform(function(contents, file) {
      var filename = file.path.replace(file.base,'');
      var comment = '/*! ' + filename + ' */ \n';
      return comment + contents;
    }))    
    .pipe(sass({
      outputStyle: 'compressed',
      // outputStyle: 'nested',
      // sourceComments: 'map',
      includePaths: []
    }))
    .pipe(concat('Mars-Common-Bundle.css'))
    .pipe(gulp.dest(MARS_LOCATION));
});

gulp.task('marsUnauthenticatedCSSBundle', function() {
    return gulp.src(['scss/mars/ladda.min.scss','scss/mars/unauthenticated.scss'])
    .pipe(insert.transform(function(contents, file) {
      var filename = file.path.replace(file.base,'');
      var comment = '/*! ' + filename + ' */ \n';
      return comment + contents;
    }))
    .pipe(sass({
      outputStyle: 'compressed',
      // outputStyle: 'nested',
      // sourceComments: 'map',
      includePaths: []
    }))
    .pipe(concat('Mars-Unauthenticated-Bundle.css'))
    .pipe(gulp.dest(MARS_LOCATION));
});

// Compile Our Sass
gulp.task('marsSass', function() {
    return gulp.src('scss/mars/*.scss')
    .pipe(plumber({
      errorHandler: function(error) {
        gutil.log(
          gutil.colors.cyan('Plumber') + gutil.colors.red(' found unhandled error:\n'),
          error.toString()
        );
        this.emit('end');
      }
    }))
    .pipe(sass(
{      outputStyle: 'compressed',
      // outputStyle: 'nested',
      // sourceComments: 'map',
      includePaths: []
    }))
//    .pipe(autoprefixer())
    .pipe(gulp.dest(MARS_LOCATION));
});

gulp.task('eCommerceSass', function() {
    return gulp.src('scss/eCommerce/*.scss')
    .pipe(plumber({
      errorHandler: function(error) {
        gutil.log(
          gutil.colors.cyan('Plumber') + gutil.colors.red(' found unhandled error:\n'),
          error.toString()
        );
        this.emit('end');
      }
    }))
    .pipe(sass({
      outputStyle: 'compressed',
      // outputStyle: 'nested',
      // sourceComments: 'map',
      includePaths: []
    }))
//    .pipe(autoprefixer())
    .pipe(gulp.dest(ECOMMERCE_LOCATION));
});

gulp.task('iSampleSass', function() {
    return gulp.src('scss/iSample/*.scss')
    .pipe(plumber({
      errorHandler: function(error) {
        gutil.log(
          gutil.colors.cyan('Plumber') + gutil.colors.red(' found unhandled error:\n'),
          error.toString()
        );
        this.emit('end');
      }
    }))
    .pipe(sass({
      outputStyle: 'compressed',
      // outputStyle: 'nested',
      // sourceComments: 'map',
      includePaths: []
    }))
//    .pipe(autoprefixer())
    .pipe(gulp.dest(ISAMPLE_LOCATION));
});

gulp.task('watch', function() {
  gulp.watch('scss/mars/*.scss', ['marsSass', 'marsCSSBundle']);
  gulp.watch('scss/eCommerce/*.scss', ['eCommerceSass']);
  gulp.watch('scss/iSample/*.scss', ['iSampleSass']);  
  gulp.watch('scss/*.scss', ['marsSass', 'eCommerceSass', 'iSampleSass']);  
});