'use strict';

// Get shared core
const core = global.lhcore;
const log = core.amd.log;
const rename = core.amd.rename;
const gulpData = core.amd.gulpData;

// External modules as aliases
const gulp = core.amd.gulp;
const jsonFormat = core.amd.jsonFormat;
const jsonSchemaBundle = core.amd.jsonSchemaBundle;
const json2ts = core.amd.json2ts;
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

// Generate typings
const typings = () => gulp
  .src(config.schema.mask)
  .pipe(gulpData(function(file) {
    return json2ts.compile(
      JSON.parse(file.contents.toString()),
      file.path,
      {
        cwd: config.schema.dir,
      })
      .then((ts) => {
        log.info(`${file.path} converted`);
        file.contents = Buffer.from(ts);
        return file;
      })
      .catch((e) => {
        log.info(`${file.path} crashed`);
        log.error(e);
      });
  }))
  .pipe(rename(function(path) {
    path.extname = '.d.ts';
  }))
  .pipe(gulp.dest(config.typings.dir));

// Tasks
gulp.task('build:bundle', bundle);
gulp.task('build:create', create);
gulp.task('build:typings', typings);
