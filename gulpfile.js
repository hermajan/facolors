const autoprefixer = require("gulp-autoprefixer");
const gulp = require("gulp");
const sass = require("gulp-sass");
const rename = require("gulp-rename");

const files = {
	styles: {
		path: ["scss/**/*.scss"],
		watch: "scss/**/*.scss"
	}
};

// Compiles the SCSS files into CSS
function styles() {
	return gulp.src(files.styles.path)
		.pipe(sass({outputStyle: "expanded"}).on("error", sass.logError)) // compiles SCSS to CSS
		.pipe(autoprefixer()) // adds vendor prefixes to CSS rules
		.pipe(gulp.dest("css")) // puts final CSS in dist folder
		.pipe(sass({outputStyle: "compressed"}).on("error", sass.logError)) // compiles to CSS and minifies CSS files
		.pipe(rename({suffix: ".min"}))
		.pipe(gulp.dest("css"));
}

// Watch SCSS and JS files for changes
function watch() {
	gulp.watch([files.styles.watch], gulp.parallel(styles));
}

// Export the default Gulp task so it can be run
exports.default = gulp.series(
	gulp.parallel(styles), watch
);
