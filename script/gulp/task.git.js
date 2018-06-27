'use strict';

// Get shared core
const core = global.lhcore;

// External modules as aliases
const gulp = core.amd.gulp;
const git = core.amd.git;

// Update git submodules
const pullSubmodules = () => git.updateSubmodule({
    args: '--init --remote --merge',
});

// Pull git repository
const pullRepository = () => git.pull({
    args: '--rebase',
});


// Tasks
gulp.task('pull:submodules', pullSubmodules);
gulp.task('pull:repository', pullRepository);
gulp.task('pull:all', gulp.series(
    'pull:submodules',
    'pull:repository'
));
