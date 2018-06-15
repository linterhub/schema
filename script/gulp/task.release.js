'use strict';

// Get shared core
const core = global.lhcore;

// External modules as aliases
const gulp = core.amd.gulp;
const path = core.amd.path;
const config = core.cfg;

// Externally functions as aliases
const readJson = core.fnc.readJson;

// Copy to release all schemas and update root
const createRelease = () => gulp
    .src(config.build.mask)
    .pipe(gulp.dest(config.release.dir))
    .pipe(gulp.dest((file) => {
        let content = readJson(file.path);
        let version = content.$version;
        return path.join(config.release.dir, version);
    }));

// Tasks
gulp.task('create-release', createRelease);
gulp.task('release', gulp.parallel('create-release'));
