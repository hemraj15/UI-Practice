var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync'),
autoprefixer = require('autoprefixer'),
postcss = require('gulp-postcss'),
cssVars = require('postcss-simple-vars'),
mixins = require('postcss-mixins'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
rename = require('gulp-rename'),
nodemon = require('gulp-nodemon');


gulp.task('browser-sync', ['nodemon'], function() {
  browserSync({
    proxy: "localhost:3000",  // local node app address
    port: 8080,  // use *different* port than above
    notify: true
  });
});


gulp.task('default', ['browser-sync'],function(){
	
	watch('./public/js/**/*.js',function(){
		browserSync.reload();
	});

	watch('./public/**/*.html',function(){
		browserSync.reload();
	});

	watch('./src/styles/td/**/*.css', function(){
		gulp.start('cssInject');
	});
});

gulp.task('cssInject',['td-style'], function(){
	gulp.src('./public/css/td-style.css')
		.pipe(browserSync.stream());
});

gulp.task('td-style', function(){
	return gulp.src('./src/styles/td/style.css')
		.pipe(postcss([cssImport, mixins, cssVars, nested, autoprefixer]))
		.on('error', function(errInfo){
	    	console.log(errInfo);
	    	this.emit('end');
	    })
	    .pipe(rename('td-style.css'))
	    .pipe(gulp.dest('./public/css/'));
});

gulp.task('nodemon', function (cb) {
	
	var started = false;
	
	return nodemon({
		script: 'app.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true; 
		} 
	});
});