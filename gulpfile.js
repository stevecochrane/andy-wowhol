var autoprefixer     = require("autoprefixer");
var calc             = require("postcss-calc");
var colorFunction    = require("postcss-color-function");
var cssnano          = require("cssnano");
var customMedia      = require("postcss-custom-media");
var customProperties = require("postcss-custom-properties");
var gulp             = require("gulp");
var nested           = require("postcss-nested");
var pxtorem          = require("postcss-pxtorem");
var postcss          = require("gulp-postcss");
var postcssImport    = require("postcss-import");

gulp.task("css", function() {
    return gulp.src("src/static/css/main.css")
        .pipe(postcss([
            postcssImport(),
            customProperties(),
            customMedia(),
            calc(),
            nested(),
            colorFunction(),
            pxtorem({
                //  Apply pxtorem to all style properties.
                propWhiteList: []
            }),
            autoprefixer(),
            cssnano()
        ]))
        .pipe(gulp.dest("dist/static/css/"));
});

gulp.task("default", [
    "css"
]);
