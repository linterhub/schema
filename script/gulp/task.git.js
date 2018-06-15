'use strict';

// Get shared core
const core = global.lhcore;

// External modules as aliases
const gulp = core.amd.gulp;
const git = core.amd.git;

// Update git submodules
const pullSubmodules = () => git.updateSubmodule({args: '--init'});

// Remote and merge git submodules
const mergeSubmodules = () => git.updateSubmodule({args: '--remote --merge'});

// Git fetch
const fetch = () => git.exec({args: 'fetch'});

// Git rebase
const rebase = () => git.exec({args: 'rebase'});

// Tasks
gulp.task('fetch', fetch);
gulp.task('rebase', rebase);
gulp.task('merge-submodules', mergeSubmodules);
gulp.task('pull-submodules', pullSubmodules);

gulp.task('update-submodules', gulp.series(
            'fetch',
            'rebase',
            'merge-submodules'));
