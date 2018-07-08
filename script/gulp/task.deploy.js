'use strict';

// Get shared core
const core = global.lhcore;

// External modules as aliases
const gulp = core.amd.gulp;
const config = core.cfg;
const path = core.amd.path;
const log = core.amd.log;
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
    const name = gitUserName();
    const email = gitUserEmail();
    const token = githubToken();
    log.info(`GH USER : ${name}`);
    log.info(`GH EMAIL: ${email}`);
    log.info(`GH TOKEN: ${token ? 'OK' : 'NOT OK'}`);
    const repo = `https://${token}@github.com/${packageJson.repository}.git`;
    return ghPages.publish(
        config.release.dir,
        {
            add: true,
            repo: repo,
            user: {
                name: name,
                email: email,
            },
            message: config.git.message,
            silent: true,
            logger: (message) => log.error(`${message}\n`),
        },
        done
    );
};

// Tasks
gulp.task('deploy:publish', publish);
gulp.task('deploy:copy', copyLastRelease);
