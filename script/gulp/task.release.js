'use strict';

// Get shared core
const core = global.lhcore;

// External modules as aliases
const gulp = core.amd.gulp;
const jsonFormat = core.amd.jsonFormat;
const jsonData = core.amd.jsonData;
const path = core.amd.path;
const log = core.amd.log;
const config = core.cfg;

// Externally functions as aliases
const readJson = core.fnc.readJson;
const jsonToBuffer = core.fnc.jsonToBuffer;
const nextRelease = core.fnc.nextRelease;

// Copy all static assets to release
const copyStatic = () => gulp
    .src(config.assets.cname)
    .pipe(gulp.dest(config.release.dir));

// Copy to release all schemas and update root
const createRelease = () => gulp
    .src(config.build.mask)
    .pipe(jsonData((file) => {
        let content = readJson(file.path);
        content.$version = nextRelease();
        file.contents = jsonToBuffer(content);
        return file;
    }))
    .pipe(jsonFormat(4))
    .pipe(gulp.dest(config.release.dir))
    .pipe(gulp.dest((file) => {
        let content = readJson(file.path);
        let version = content.$version;
        return path.join(config.release.dir, version);
    }));

// Log release number
const logRelease = (done) => {
    log.info(`Release: ${nextRelease()}`);
    done();
};

// Tasks
gulp.task('static', copyStatic);
gulp.task('create-release', createRelease);
gulp.task('release', gulp.parallel('static', 'create-release', logRelease));
