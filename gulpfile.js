var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var cleanCSS    = require('gulp-clean-css');
var rename      = require('gulp-rename');
sass.compiler   = require('node-sass');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

// Move the javascript files into our /src/js folder
gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/tether/dist/js/tether.min.js'])
        .pipe(gulp.dest("src/js"))
        .pipe(browserSync.stream());
});

gulp.task('minify-css', function() {
    return gulp.src('src/css/style.css')
        .pipe(cleanCSS())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('dist/css'));
});

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', function() { 

    browserSync.init({
        server: "./src"
    });

    gulp.watch("src/*.html")
    .on('change', function(path, stats) {
        console.log(path);
        browserSync.reload();
    });

    gulp.watch('src/scss/*.scss', gulp.task('sass'))
    .on('change', function(path, stats) {
        console.log(path);
        browserSync.reload();
        // code to execute on change
    });

    gulp.watch('src/css/*.css', gulp.task('minify-css'))
    .on('change', function(path, stats) {
        console.log(path);
        browserSync.reload();
        // code to execute on change
    });

}));

// gulp.task('default', ['js','serve']);
gulp.task('default', gulp.series(['js','serve']));