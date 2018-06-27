'use strict';

// Get shared core
const core = global.lhcore;

// External modules as aliases
const gulp = core.amd.gulp;
const jsonFormat = core.amd.jsonFormat;
const jsonSchemaBundle = core.amd.jsonSchemaBundle;
const config = core.cfg;

// Resolve and inline all $ref in collections
const bundle = () => gulp
  .src(config.schema.collection)
  .pipe(jsonSchemaBundle())
  .pipe(jsonFormat(4))
  .pipe(gulp.dest(config.build.dir));

// Copy to build all schemas
const create = () => gulp
  .src([
    config.schema.mask,
    '!' + config.schema.collection,
  ])
  .pipe(gulp.dest(config.build.dir));

// Tasks
gulp.task('build:bundle', bundle);
gulp.task('build:create', create);
