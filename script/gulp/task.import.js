'use strict';

// Get shared core
const core = global.lhcore;

// External modules as aliases
const gulp = core.amd.gulp;
const gulpData = core.amd.gulpData;
const jsonFormat = core.amd.jsonFormat;
const config = core.cfg;

// External functions as aliases
const readJson = core.fnc.readJson;
const readYaml = core.fnc.readYaml;
const toBuffer = core.fnc.jsonToBuffer;

// Import licenses from spdx
const licenses = () => gulp
    .src(config.template.spdx)
    .pipe(gulpData((file) => {
        const list = readJson(config.ext.spdx);
        const template = readJson(file.path);
        template.enum = list.licenses.map((l) => l.licenseId);
        file.contents = toBuffer(template);
        return file;
    }))
    .pipe(jsonFormat(4))
    .pipe(gulp.dest(config.type.dir));

// Import languages from linguist
const languages = () => gulp
    .src(config.template.linguist)
    .pipe(gulpData((file) => {
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
    .pipe(gulp.dest(config.type.dir));

// Tasks
gulp.task('import:licenses', licenses);
gulp.task('import:languages', languages);
gulp.task('import:all', gulp.parallel('import:licenses', 'import:languages'));
