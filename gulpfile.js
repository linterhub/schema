'use strict';

// Set global shared core
const lhcore = require('./script/gulp/index.js');
global.lhcore = lhcore;

// External modules as aliases
const gulp = lhcore.amd.gulp;
const hubRegistry = lhcore.amd.hubRegistry;
const gulpHelpDoc = lhcore.amd.gulpHelpDoc;

// Load tasks into the registry of gulp
hubRegistry([
  'script/gulp/**/task.*.js',
]);

/**
 * Validate all schemas
 *
 * @task {validate}
 */
gulp.task('validate', gulp.series('validate:all'));

/**
 * Check all files via linting
 *
 * @task {lint}
 */
gulp.task('lint', gulp.series('lint:all'));

/**
 * Clean node_modules folder and install all npm package
 *
 * @task {packages:reinstall}
 */
gulp.task('packages:reinstall', gulp.series(
    'clean:node',
    'packages:install'
));

/**
 * Clean following folders: build, release and node modules
 *
 * @task {clean}
 */
gulp.task('clean', gulp.parallel(
    'packages:reinstall',
    'clean:build',
    'clean:release'
));

/**
 * Import licenses and languages
 *
 * @task {import}
 */
gulp.task('import', gulp.series('pull:submodules', 'import:all'));

/**
 * Create build and run tests for core schemas in `build` folder
 *
 * @task {build}
 */
gulp.task('build', gulp.series(
    'lint',
    'validate',
    'clean:build',
    'build:bundle',
    'build:create',
    'build:typings'
));

/**
 * Create a pull for git submodules and repository
 *
 * @task {pull}
 */
gulp.task('pull', gulp.parallel('pull:all'));

/**
 * The created release of core schemas with next version of release and
 * include all static files, put it's to `release` folder,
 * and run tests for core schemas after that
 *
 * @task {release}
 * @arg {nextRelease} [optional] version of next release. By default: 0.9.0
 */
gulp.task('release', gulp.series(
    'test:source',
    'build',
    'test:build',
    'clean:release',
    'release:all'
));

/**
 * Run test for core schemas
 *
 * @task {test}
 */
gulp.task('test', gulp.series(
    'test:source',
    'build',
    'test:build',
    'clean:release',
    'release:all',
    'test:release'
));

/**
 * Publish last release to gh-pages
 *
 * @task {deploy}
 * @arg {gitUserName} [optional] set a git user name
 * @arg {gitUserEmail} [optional] set a git user email
 */
gulp.task('deploy', gulp.series(
    'clean:release',
    'packages:personal',
    'deploy:copy',
    'release:copy',
    'deploy:publish'
));

/**
 * Print help
 *
 * @task {default}
 */
gulp.task('default', () => {
  return gulpHelpDoc(gulp);
});

/**
 * The test deploy of core schemas with next version of release
 *
 * @task {release}
 * @arg {nextRelease} [optional] version of next release. By default: 0.9.0
 */
gulp.task('test:deploy', gulp.series(
    'clean',
    'build',
    'test:build',
    'release:all',
    'test:release',
    'npm:pack',
    'packages:local',
    'clean:release',
    'deploy:copy'
));
