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
const gitUserName = core.fnc.gitUserName;
const gitUserEmail = core.fnc.gitUserEmail;
const githubToken = core.fnc.githubToken;

// Copy last release from npm package to release folder
const copyLastRelease = () => gulp
    .src(`./node_modules/${packageJson.name}/${config.release.mask}`)
    .pipe(gulp.dest(config.release.dir))
    .pipe(gulp.dest((file) => {
        let content = readJson(file.path);
        let version = content.$version;
        return path.join(config.release.dir, version);
    }));

// Publish release folder to gh-pages
const publish = (done) => {
    const packageJson = readJson(config.root.package);
    return ghPages.publish(
        config.release.dir,
        {
            add: true,
            repo: `https://${githubToken()}@github.com/${packageJson.repository}.git`,
            user: {
                name: gitUserName(),
                email: gitUserEmail(),
            },
            message: config.git.message,
        },
        done
    );
};

// Tasks
gulp.task('deploy:publish', publish);
gulp.task('deploy:copy', copyLastRelease);
