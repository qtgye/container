var fs = require('fs');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
// var notify = require('gulp-notify');
// var notify = require('node-notifier').notify;
var watch = require('gulp-watch');
var jasmine = require('gulp-jasmine');
var jasmineBrowser = require('gulp-jasmine-browser');
var http = require('http');
// var reporters = require('jasmine-reporters');
var args = process.argv.slice(3);

var filesForTest = ['dist/tests.js'];
var jasmineDir = 'jasmine-standalone';
var serverRunning = false;
var distFiles = {
	app : 'app.js',
	tests : 'tests.js'
};


function getConfig () {
	return JSON.parse(fs.readFileSync(`${__dirname}/config.json`,'utf-8'));
}


function combineAppScripts () {

	var containerFile = getConfig().container;
	containerFile = `${__dirname}/containers/${containerFile}`;

	if ( !fs.existsSync(containerFile) ) {
		console.log(`Main container file is missing : "${containerFile}"`);
		return;
	}

	return gulp.src([containerFile,'tests/modules/*.js'])
			.pipe(concat(distFiles.app))
			.pipe(uglify())
			.on('error', function (err) {
				console.error(Error(err));
			})
			.pipe(gulp.dest('dist'))
			.on('end', combineSpecScripts);
}



function combineSpecScripts () {

	var specFilesList = fs.readFileSync('specsManifest.json');
	specFilesList = JSON.parse(specFilesList).files;
	specFilesList = specFilesList.map(function (_filePath) {
		return 'tests/specs/' + _filePath;
	});

	return gulp.src(specFilesList)
		.pipe(concat(distFiles.tests))
		// .pipe(uglify())
		.on('error', function (err) {
			console.error(Error(err));
		})
		.pipe(gulp.dest('dist'))
		.on('end', copyToJasmineRoot);
}


function copyToJasmineRoot () {
	console.log('\nCopying to Jasmine directory...\n');
	var appContents = fs.readFileSync('dist/'+distFiles.app,'utf-8');
	var testsContents = fs.readFileSync('dist/'+distFiles.tests,'utf-8');
	fs.writeFileSync(`${jasmineDir}/src/${distFiles.app}`,appContents);
	fs.writeFileSync(`${jasmineDir}/spec/${distFiles.tests}`,testsContents);
}


function jasmineConsole() {

	// Combine files
	gulp.src(filesForTest)
		.pipe(concat('merged.js'))
		.pipe(gulp.dest('dist'))
		.on('end', function () {

			// Run tests
			gulp.src('dist/merged.js')
				.pipe(jasmine({
				}));
		});

}


gulp.task('jasmine-browser', function () {

	gulp.src(filesForTest)
		.pipe(watch(filesForTest))
		.pipe(jasmineBrowser.specRunner())
		.pipe(jasmineBrowser.server({
				port: 8888
		}));
});


gulp.task('jasmine-console', jasmineConsole);

gulp.task('scripts', combineAppScripts);

gulp.task('watch', ['scripts'], function () {
	gulp.watch(['tests/**/*.js'], ['scripts']);
});


gulp.task('default', ['scripts']);
