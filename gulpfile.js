var gulp =          require('gulp'),
    concat =        require('gulp-concat'),
    uglify =        require('gulp-uglify'),
    ngAnnotate =    require('gulp-ng-annotate'),
    sourcemaps =    require('gulp-sourcemaps'),
    nodemon =       require('gulp-nodemon'),
    uglifycss =     require('gulp-uglifycss'),
    minifyhtml =    require('gulp-minify-html')


var publicPath = 'webapp/public'
var indexPath = 'webapp/index.html'
var templatesPath = 'webapp/partials/*.html'

gulp.task('js', function() {
    gulp.src(['webapp/js/app.js', 'webapp/js/*.js'])
            .pipe(sourcemaps.init())
            .pipe(concat('app.js'))
            .pipe(ngAnnotate())
            .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(publicPath))
})

gulp.task('css', function() {
    gulp.src('webapp/css/*.css')
            .pipe(sourcemaps.init())
            .pipe(concat('site.css'))
            .pipe(uglifycss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(publicPath))
})

gulp.task('html', function() {
    var opts = {
        conditionals: true,
        spare:true
    };

    gulp.src([indexPath, templatesPath])
        .pipe(minifyhtml(opts))
        .pipe(gulp.dest(publicPath))
})

gulp.task('partialhtml', function() {
    var opts = {
        conditionals: true,
        spare:true
    };

    gulp.src([indexPath, templatesPath])
        .pipe(minifyhtml(opts))
        .pipe(gulp.dest(publicPath + '/partials'))
})

gulp.task('watch:js', ['js'], function() {
    gulp.watch('webapp/js/*.js', ['js'])
})

gulp.task('watch:html', ['html', 'partialhtml'], function() {
    gulp.watch('webapp/**/*.html', ['html', 'partialhtml'])
})

gulp.task('watch:css', ['css'], function() {
    gulp.watch('webapp/css/*.css', ['css'])
})

gulp.task('dev', ['watch:js', 'watch:css', 'watch:html', 'dev:server'])

gulp.task('dev:server', function() {
    nodemon({
        script: 'server.js',
        ext:    'js',
        ignore: ['gulp*', 'webapp/*']
    })
})

