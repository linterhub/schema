'use strict';

// Get shared core
const core = global.lhcore;

// External modules as aliases
const gulp = core.amd.gulp;
const eslint = core.amd.eslint;
const jsonFormat = core.amd.jsonFormat;
const config = core.cfg;

// Lint and autfix all js files
const lintJs = () => gulp
    .src([config.src.exclude, config.src.js])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());

// Lint and autfix all json files
const lintJson = () => gulp
    .src(config.src.mask)
    .pipe(jsonFormat(4))
    .pipe(gulp.dest(config.src.dir));

// Tasks
gulp.task('lint-js', lintJs);
gulp.task('lint-json', lintJson);
gulp.task('lint', gulp.parallel('lint-js', 'lint-json'));
