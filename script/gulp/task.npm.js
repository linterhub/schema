'use strict';

// Get shared core
const core = global.lhcore;

// External modules as aliases
const gulp = core.amd.gulp;
const config = core.cfg;
const gulpExec = core.amd.gulpExec;

// Run npm pack
const pack = () => gulp
    .src('./')
    .pipe(gulpExec(`npm pack`))
    .pipe(gulpExec.reporter());

// Automatically install all npm packages
const install = () => gulp
    .src(config.root.package)
    .pipe(gulpInstall());

// Install all local packages from `tgz` files in root directory
const local = () => gulp
    .src(config.root.tgz)
    .pipe(gulpExec('npm install <%= file.path %> --force'))
    .pipe(gulpExec.reporter());

// Tasks
gulp.task('npm:pack', pack);
gulp.task('packages:install', install);
gulp.task('packages:local', local);
