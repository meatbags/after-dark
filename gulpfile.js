var gulp = require("gulp"),
	sass = require("gulp-sass"),
	cleanCSS = require("gulp-clean-css"),
	autoprefixer = require('gulp-autoprefixer'),
	base = './',
	pathSCSS = base + 'style/',
	destCSS = base + 'build';

gulp.task("sass", function(){
  return gulp.src(pathSCSS + "style.scss", {style: "compressed"})
	  .pipe(sass())
	  .pipe(gulp.dest(destCSS))
	  .pipe(cleanCSS({keepSpecialComments: 0}))
		.pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
	  .pipe(gulp.dest(destCSS));
});

gulp.task('watch', function(){
	gulp.watch( [pathSCSS + "**/*.scss"], ["sass"]);
});
