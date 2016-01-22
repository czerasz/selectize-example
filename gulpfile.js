var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

// gulp.task('js-watch',   browserSync.reload);
// gulp.task('html-watch', browserSync.reload);

gulp.task('serve', function () {
    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./client",
            routes: {
                "/bower_components": "./bower_components"
            }
        },
        port: 9000
    });

    // gulp.watch("./client/js/*.js", ['js-watch']);
    // gulp.watch("./client/*.html",  ['html-watch']);
    gulp.watch("./client/js/*.js").on('change', browserSync.reload);
    gulp.watch("./client/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
