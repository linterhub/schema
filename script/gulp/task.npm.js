'use strict';

// Get shared core
const core = global.lhcore;

// External modules as aliases
const gulp = core.amd.gulp;
const config = core.cfg;
const gulpExec = core.amd.gulpExec;
const gulpInstall = core.amd.gulpInstall;

// External functions as aliases
const readJson = core.fnc.readJson;

// Run npm pack
const pack = () => gulp
    .src('./')
    .pipe(gulpExec(`npm pack`))
    .pipe(gulpExec.reporter());

// Automatically install all npm packages
const installAll = () => gulp
    .src(config.root.package)
    .pipe(gulpInstall());

// Install all local packages from `tgz` files in root directory
const local = () => install('<%= file.path %>', config.root.tgz);

// Install package from npm by name of project
const personal = () => {
    const packageJson = readJson(config.root.package);
    return install(packageJson.name, config.root.dir);
};

// Install some package by name
const install = (name, dir) => gulp
    .src(dir)
    .pipe(gulpExec(`npm install ${name} --force`))
    .pipe(gulpExec.reporter());

// Tasks
gulp.task('npm:pack', pack);
gulp.task('packages:install', installAll);
gulp.task('packages:local', local);
gulp.task('packages:personal', personal);
