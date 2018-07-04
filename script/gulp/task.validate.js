'use strict';

// Get shared core
const core = global.lhcore;

// External modules as aliases
const gulp = core.amd.gulp;
const jsonSchema = core.amd.jsonSchema;
const config = core.cfg;

// Validate all schemas
const validate = (mask, schema) => gulp
    .src(mask)
    .pipe(jsonSchema({
        schema: schema,
        loadMissingSchemas: true,
        checkRecursive: true,
        verbose: true,
    }));

// Validate all core schemas according to schemaver
const validateCore = () => validate(
    config.schema.mask,
    config.schema.ver
);

// Validate all collection schemas according to draft schema
const validateCollection = () => validate(
    config.collection.mask,
    config.schema.schema
);

// Validate all template schemas according to draft schema
const validateTemplate = () => validate(
    config.template.mask,
    config.schema.schema
);

// Tasks
gulp.task('validate:core', validateCore);
gulp.task('validate:template', validateTemplate);
gulp.task('validate:collection', validateCollection);
gulp.task('validate:all', gulp.parallel(
    'validate:core',
    'validate:template',
    'validate:collection'
));
