'use strict';

// Get shared core
const core = global.lhcore;

// External modules as aliases
const gulp = core.amd.gulp;
const config = core.cfg;
const gulpInstall = core.amd.gulpInstall;

// Automatically install npm packages with --save-dev flag
const itself = () => gulp
    .src(config.root.package)
    .pipe(gulpInstall());

// Tasks
gulp.task('packages:install', itself);
