# @linterhub/schema [![travis][travis-shield]][travis-url] [![semantic][semantic-shield]][semantic-url] [![npm][npm-shield]][npm-url] [![github][github-shield]][github-url]

## Table of Contents

- [Background](#background)
- [Installation](#installation)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Background

There are a lot of [linters][linter-url] of different types, distributed
in different ways and each may have specific runtime dependencies.
This repository contains a proposal of unified linter definition,
distribution and configuration formats (JSON Schema files).
The proposal is pretty similar to [meta-package managers][meta-url]
approach.

> More details in [docs][doc-url] or at [the catalog page][catalog-url].

## Installation

Requirements:

- [`Node.js 8.3.0 or higher`][node-js]
- [`npm 5.3.0 or higher`][npm]

```bash
npm install @linterhub/schema --save-dev
```

## Usage

```javascript
const schema = require('@linterhub/schema');
console.log(schema.linter);
```

Full description in [documentation][doc-url]

## Contribute

You may contribute in several ways like creating new features, tests,
fixing bugs, improving documentation or examples.

> More details in [CONTRIBUTING.md][contributing].

## License

[MIT][license-url]

[travis-shield]: https://img.shields.io/travis/linterhub/schema/master.svg
[travis-url]: https://travis-ci.org/linterhub/schema/branches
[semantic-shield]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
[npm-shield]: https://img.shields.io/npm/v/@linterhub/schema.svg
[npm-url]: https://www.npmjs.com/package/@linterhub/schema
[npm]: https://www.npmjs.com
[node-js]: https://nodejs.org
[github-shield]: https://img.shields.io/github/release/linterhub/schema.svg?label=github
[github-url]: https://github.com/linterhub/schema
[schema-url]: http://json-schema.org/
[web-url]: https://schema.linterhub.com
[doc-url]: ./doc/
[linter-url]: https://en.wikipedia.org/wiki/List_of_tools_for_static_code_analysis
[license-url]: ./license.md
[catalog-url]: https://github.com/linterhub/catalog
[meta-url]: https://en.wikipedia.org/wiki/List_of_software_package_management_systems#Meta_package_managers
[contributing]: ./github/CONTRIBUTING.md
