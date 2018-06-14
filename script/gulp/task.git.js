'use strict';

// Get shared core
const core = global.lhcore;

// External modules as aliases
const gulp = core.amd.gulp;
const git = core.amd.git;

// Update gt submodules
const pullSubmodules = () => git.updateSubmodule({args: '--init'});

// Tasks
gulp.task('pull-submodules', pullSubmodules);
