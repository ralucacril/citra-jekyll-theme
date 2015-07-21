var gulp = require("gulp");
var bsync = require("browser-sync");
var cprocess = require("child_process");
var reload = bsync.reload;

/* jekyll tasks */
gulp.task("jekyll-build", function(done) {
    bsync.notify("Building Jekyll", 500);

    return cprocess.spawn("jekyll", ["build"], { stdio: "inherit" })
        .on("close", done);
});

/* browser sync tasks */
gulp.task("browser-sync", ["jekyll-build"], function() {
    bsync.init({
        server: { baseDir: "_site" },
        ui: false
    });
});

gulp.task("browser-reload", ["jekyll-build"], function() {
    reload();
});

/* watch tasks */
gulp.task("watch-files", function() {
    gulp.watch([
        "index.html",
        "_includes/*.html",
        "_layouts/*.html",
        "_posts/*",
        "_sass/*.scss",
        "assets/css/*.scss",
        "assets/js/*.js"
    ], ["browser-reload"]);
});

gulp.task("default", ["browser-sync", "watch-files"]);
