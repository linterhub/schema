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


// Remote and merge git submodules
const mergeSubmodules = () => git.updateSubmodule({args: '--remote --merge'});

// Git fetch
const fetch = () => git.exec({args: 'fetch'});

// Git rebase
const rebase = () => git.exec({args: 'rebase'});

// Tasks
gulp.task('git-sub-pull', pullSubmodules);
gulp.task('git-pull', pullRepository);
gulp.task('pull', gulp.series('git-sub-pull', 'git-pull'));
