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

gulp.task('default', gulp.series('validate'));
gulp.task('import', gulp.series('pull-submodules', 'import'));
gulp.task('validate', gulp.series('import', 'validate'));
