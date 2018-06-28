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
 * Validate all core and collection schemas
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
 * Clean following folders: build, release and node modules
 *
 * @task {clean}
 */
gulp.task('clean', gulp.series('clean:all'));

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
    'build:create'
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
    'build',
    'test:build',
    'clean:release',
    'release:all'
));

/**
 * Run test for core schemas in `build` folder
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
 */
gulp.task('deploy', gulp.series(
    'clean:release',
    'deploy:copy',
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
