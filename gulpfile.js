// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var autoprefixer = require('gulp-autoprefixer');
var compass = require('gulp-compass');
var cleanCSS = require('gulp-clean-css');

// Compile Our Sass and autoprefix
gulp.task('sass', function(){
    return gulp.src('sass/**/*.scss')
        .pipe(compass({
            config_file: 'config.rb',}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions','ie >= 9'],
            cascade: false
        }))
        .pipe(gulp.dest('css/'))
        .on('end', function() {
            console.log('the end');
        })
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('sass/**/*.scss', ['sass']);
    console.log('watching.. press ctrl + c to leave.');
});


// Default Task
gulp.task('default', ['sass', 'watch']);