'use strict';

// Get shared core
const core = global.lhcore;

// External modules as aliases
const gulp = core.amd.gulp;
const config = core.cfg;
const path = core.amd.path;
const ghPages = core.amd.ghPages;
const packageJson = require('../../package.json');

// Externally functions as aliases
const readJson = core.fnc.readJson;

const copyLastRelease = () => gulp
    .src(`./node_modules/${packageJson.name}/${config.release.mask}`)
    .pipe(gulp.dest(config.release.dir))
    .pipe(gulp.dest((file) => {
        let content = readJson(file.path);
        let version = content.$version;
        return path.join(config.release.dir, version);
    }));

const publish = (done) => ghPages.publish(
    config.release.dir,
    {add: true},
    done
);

// Tasks
gulp.task('deploy:publish', publish);
gulp.task('deploy:copy', copyLastRelease);
