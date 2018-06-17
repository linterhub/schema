'use strict';

// Set global shared core
const lhcore = require('./script/gulp/index.js');
global.lhcore = lhcore;

// External modules as aliases
const gulp = lhcore.amd.gulp;
const hubRegistry = lhcore.amd.hubRegistry;

// Load tasks into the registry of gulp
hubRegistry([
  'script/gulp/**/task.*.js',
]);

gulp.task('import', gulp.series('git-pull', 'import-schemas'));
gulp.task('build', gulp.series('validate', 'lint', 'bundle-build'));
gulp.task('clean-build', gulp.series('import', 'build'));

gulp.task('default', gulp.series(
    'build',
    'test-build',
    'release',
    'test-release'
));
