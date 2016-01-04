var gulp = require('gulp')
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
    .pipe(sass({
      outputStyle: 'compressed',
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
  gulp.watch('scss/mars/*.scss', ['marsSass']);
  gulp.watch('scss/eCommerce/*.scss', ['eCommerceSass']);
  gulp.watch('scss/iSample/*.scss', ['iSampleSass']);  
  gulp.watch('scss/*.scss', ['marsSass', 'eCommerceSass', 'iSampleSass']);  
});