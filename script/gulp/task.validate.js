'use strict';

// Get shared core
const core = global.lhcore;

// External modules as aliases
const gulp = core.amd.gulp;
const jsonSchema = core.amd.jsonSchema;
const config = core.cfg;

// Validate all core schemas according to schemaver
const validateCore = () => gulp
    .src(config.schema.mask)
    .pipe(jsonSchema({
        schema: config.schema.ver,
        loadMissingSchemas: true,
        checkRecursive: true,
        verbose: true,
    }));

// Validate all collection schemas according to schemaver
const validateCollection = () => gulp
    .src(config.collection.mask)
    .pipe(jsonSchema({
        schema: config.schema.draft,
        loadMissingSchemas: true,
        checkRecursive: true,
        verbose: true,
    }));

// Tasks
gulp.task('validate-core', validateCore);
gulp.task('validate-collection', validateCollection);
gulp.task('validate', gulp.parallel('validate-core', 'validate-collection'));
