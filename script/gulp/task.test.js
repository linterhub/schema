'use strict';

// Get shared core
const core = global.lhcore;

// External modules as aliases
const gulp = core.amd.gulp;
const log = core.amd.log;
const jsonData = core.amd.jsonData;
const config = core.cfg;
const JsonSchemaValidator = core.amd.jsonSchemaValidator;

// External functions as aliases
const readJson = core.fnc.readJson;
const validator = new JsonSchemaValidator();

// If result of test is true
const testTrue = (test, schema, done) => {
    if (test.valid) {
        log.info(`OK: ${schema.description} ${test.description}`);
    } else {
        log.error(`FAIL: ${schema.description} ${test.description}`);
        log.error(`FILE: ${test.data.$ref}`);
        log.error(`MESSAGE: Validation failed`);
        done();
    }
};

// If result of test is false
const testFalse = (test, schema, done, error) => {
    if (!test.valid) {
        log.info(`OK: ${schema.description} ${test.description}`);
    } else {
        log.error(`FAIL: ${schema.description} ${test.description}`);
        log.error(`FILE: ${test.data.$ref}`);
        error.errors.map((err) => {
            log.error(`MESSAGE: ${err.message}`);
            log.error(`SCHEMA PATH: ${err.property}`);
        });
        done(error);
    }
};

// Run separately test
const runTest = (test, schema, done) => {
    const data = readJson(test.data.$ref);
    const result = validator.validate(data, schema.$schema.$ref);
    if (result.errors && result.errors.length) {
        testFalse(test, schema, done, result);
    } else {
        testTrue(test, schema, done);
    }
};

// Run all json tests
const test = (done) => gulp
    .src(config.test.mask)
    .pipe(jsonData((file) => {
        const schema = readJson(file.path);
        const tasks = schema.tests.map((test) => runTest(test, schema, done));
        return Promise.all(tasks);
    }));

// Preload schemas from folder
const preload = (mask) => gulp
    .src(mask)
    .pipe(jsonData((file) => {
        const schema = readJson(file.path);
        validator.addSchema(schema, schema.$id);
        log.info(`SCHEMA PRELOAD: ${file.path}`);
    }));

// Preload schemas from build folder
const buildPreload = () => preload(config.build.mask);

// Preload schemas from release folder
const releasePreload = () => preload(config.release.mask);

// Tasks
gulp.task('test-preload-build', buildPreload);
gulp.task('test-preload-release', releasePreload);
gulp.task('test-build', gulp.series('test-preload-build', test));
gulp.task('test-release', gulp.series('test-preload-release', test));
