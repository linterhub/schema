'use strict';

// Get shared core
const core = global.lhcore;

// External modules as aliases
const gulp = core.amd.gulp;
const jsonData = core.amd.jsonData;
const jsonFormat = core.amd.jsonFormat;
const config = core.cfg;

// Externall functions as aliases
const readJson = core.fnc.readJson;
const readYaml = core.fnc.readYaml;
const toBuffer = core.fnc.jsonToBuffer;

// Import licenses from spdx
const importLicenses = () => gulp
    .src(config.template.spdx)
    .pipe(jsonData((file) => {
        const list = readJson(config.ext.spdx);
        const template = readJson(file.path);
        template.enum = list.licenses.map((l) => l.licenseId);
        file.contents = toBuffer(template);
        return file;
    }))
    .pipe(jsonFormat(4))
    .pipe(gulp.dest(config.collection.dir));

// Import languages from linguist
const importLanguages = () => gulp
    .src(config.template.linguist)
    .pipe(jsonData((file) => {
        const list = readYaml(config.ext.linguist);
        const template = readJson(file.path);
        const names = Object.keys(list);
        template.definitions.language.oneOf = names.map((name) => {
            const item = list[name];
            const language = {
                enum: [name],
            };
            if (item.extensions && item.extensions.length) {
                language.extensions = item.extensions;
            }
            if (item.filenames && item.filenames.length) {
                language.filenames = item.filenames;
            }
            return language;
        });
        file.contents = toBuffer(template);
        return file;
    }))
    .pipe(jsonFormat(4))
    .pipe(gulp.dest(config.collection.dir));

// Tasks
gulp.task('import-licenses', importLicenses);
gulp.task('import-languages', importLanguages);
gulp.task('import', gulp.parallel('import-licenses', 'import-languages'));
