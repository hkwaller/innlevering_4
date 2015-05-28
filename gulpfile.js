var gulp =          require('gulp'),
    concat =        require('gulp-concat'),
    uglify =        require('gulp-uglify'),
    ngAnnotate =    require('gulp-ng-annotate'),
    sourcemaps =    require('gulp-sourcemaps'),
    nodemon =       require('gulp-nodemon'),
    uglifycss =     require('gulp-uglifycss')


gulp.task('js', function() {
    gulp.src(['webapp/js/app.js', 'webapp/js/*.js'])
            .pipe(sourcemaps.init())
            .pipe(concat('app.js'))
            .pipe(ngAnnotate())
            .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets'))
})

gulp.task('css', function() {
    gulp.src('webapp/css/*.css')
            .pipe(sourcemaps.init())
            .pipe(concat('site.css'))
            .pipe(uglifycss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets'))
})

gulp.task('watch:js', ['js'], function() {
    gulp.watch('webapp/js/*.js', ['js'])
})

gulp.task('watch:css', ['css'], function() {
    gulp.watch('webapp/css/*.css', ['css'])
})

gulp.task('dev', ['watch:js', 'watch:css', 'dev:server'])

gulp.task('dev:server', function() {
    nodemon({
        script: 'server.js',
        ext:    'js',
        ignore: ['webapp*', 'gulp*', 'assets*']
    })
})

