'use strict';

// Get shared core
const core = global.lhcore;

// External modules as aliases
const config = core.cfg;
const gulp = core.amd.gulp;
const jsonSchema = core.amd.jsonSchema;

// Validate all schemas
const validate = (mask, schema) => gulp
    .src(mask)
    .pipe(jsonSchema({
        schema: schema,
        loadMissingSchemas: true,
        checkRecursive: true,
        verbose: true,
    }));

// Validate all internal schema using schemaver
const validateInternal = () => validate(
    config.internal.mask,
    config.schema.ver
);

// Validate all core schemas using schemaver
const validateCore = () => validate(
    config.schema.mask,
    config.schema.ver
);

// Validate all type schemas using base schema
const validateType = () => validate(
    config.type.mask,
    config.schema.schema
);

// Validate all template schemas using base schema
const validateTemplate = () => validate(
    config.template.mask,
    config.schema.schema
);

// Tasks
gulp.task('validate:type', validateType);
gulp.task('validate:core', validateCore);
gulp.task('validate:template', validateTemplate);
gulp.task('validate:internal', validateInternal);
gulp.task('validate:all', gulp.parallel(
    'validate:core',
    'validate:type',
    'validate:template',
    'validate:internal'
));
