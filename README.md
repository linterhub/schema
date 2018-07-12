# @linterhub/schema [![travis][travis-shield]][travis-url] [![semantic][semantic-shield]][semantic-url] [![npm][npm-shield]][npm-url] [![github][github-shield]][github-url]

> JSON Schema definitions for linterhub

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
distribution and configuration formats (JSON Schema & JSON files).
Under the hood, the main idea is pretty similar to
[meta-package managers][meta-url] approach.

> More details in [doс][doc-url] or at [the catalog page][catalog-url].

## Installation

### NPM

Requirements:

- [Node.js][node-js] 8.3+
- [npm][npm] 5.3+

```bash
npm install @linterhub/schema --save-dev
```

### GitHub

All schemas and the source code are available for download
at [GitHub Releases][github-release-url] and
[GitHub pages][github-pages-url] as well.

## Usage

### JavaScript

Get Schema for `linter` definition and output it to console:

```javascript
const schema = require('@linterhub/schema');
console.log(schema.linter);
```

### JSON

Describe the linter capabilities and provide some extra info:
how to install it and how to execute it - [Step by Step guide][doc-url].

## Contribute

You may contribute in several ways like requesting new features,
adding tests, fixing bugs, improving documentation or examples.
Please check our [contributing guidelines][contributing].

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
[github-release-url]: https://github.com/linterhub/schema/releases
[github-pages-url]: https://github.com/linterhub/schema/tree/gh-pages
[schema-url]: http://json-schema.org/
[web-url]: https://schema.linterhub.com
[doc-url]: https://github.com/linterhub/schema/blob/develop/doc
[linter-url]: https://en.wikipedia.org/wiki/List_of_tools_for_static_code_analysis
[license-url]: https://github.com/linterhub/schema/blob/develop/LICENSE.md
[catalog-url]: https://github.com/linterhub/catalog
[meta-url]: https://en.wikipedia.org/wiki/List_of_software_package_management_systems#Meta_package_managers
[contributing]: https://github.com/linterhub/schema/blob/develop/.github/CONTRIBUTING.md
