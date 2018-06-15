'use strict';

// Shared configuration
const cfg = require('./config.json');

// Shared node modules
const amd = {
  fs: require('fs'),
  log: require('fancy-log'),
  path: require('path'),
  git: require('gulp-git'),
  yaml: require('js-yaml'),
  eslint: require('gulp-eslint'),
  gulp: require('gulp'),
  hubRegistry: require('gulp-hub'),
  jsonData: require('gulp-data'),
  jsonFormat: require('gulp-json-format'),
  jsonSchema: require('gulp-json-schema'),
  jsonSchemaBundle: require('gulp-jsonschema-bundle'),
  jsonSchemaValidator: require('jsonschema').Validator,
};

// Shared functions
const fnc = {
  readJson: (path) => JSON.parse(amd.fs.readFileSync(path)),
  readYaml: (path) => amd.yaml.safeLoad(amd.fs.readFileSync(path)),
  jsonToBuffer: (json) => Buffer.from(JSON.stringify(json), 'utf8'),
};

// Exported shared config, modules and functions
exports = module.exports = {
  cfg: cfg,
  amd: amd,
  fnc: fnc,
};
