# V3.js (D3 + Vue Data Visualization Components)

[![Generic badge](https://img.shields.io/badge/Docs-Web-Green.svg)](https://mitevpi.github.io/data-vue/)
[![Generic badge](https://img.shields.io/badge/Docs-MD-Green.svg)](docs/components)
[![Generic badge](https://img.shields.io/badge/Demo-CodeSandbox-Green.svg)](http://bit.ly/v3js-demo)

[![npm](https://img.shields.io/npm/v/@mitevpi/v3.svg)](https://www.npmjs.com/package/@mitevpi/v3) [![npm bundle size](https://img.shields.io/bundlephobia/min/@mitevpi/v3.svg)](https://bundlephobia.com/result?p=@mitevpi/v3)
[![npm](https://img.shields.io/npm/dw/@mitevpi/v3.svg)](https://www.npmjs.com/package/@mitevpi/v3)
[![npm2](https://img.shields.io/npm/dt/@mitevpi/v3.svg)](https://www.npmjs.com/package/@mitevpi/v3)

[![GitHub issues](https://img.shields.io/github/issues/mitevpi/data-vue.svg)](https://github.com/mitevpi/data-vue/issues) ![David](https://img.shields.io/david/dev/mitevpi/data-vue.svg)
[![GitHub last commit](https://img.shields.io/github/last-commit/mitevpi/data-vue.svg)](https://github.com/mitevpi/data-vue/commits/master)

![Azure DevOps builds](https://img.shields.io/azure-devops/build/pmitevpi/pmitevpi/3)
![Azure DevOps Tests](https://img.shields.io/azure-devops/tests/pmitevpi/pmitevpi/3)

A collection of customizable, interactive, and reusable data visualization components built
using D3 and Vue.js: `v3.js`.

<p float="left">
    <img src="https://i.imgur.com/IkjDubm.png" alt="Network Graph" width="300"/>
    <img src="https://i.imgur.com/4C4luhb.png" alt="Bar Chart" width="300"/>
</p>

## Usage

To use this module, install locally using the command below, or clone this repository and import the .vue files
directly from source. Full documentation can be found on the [GitHub Pages Site](https://mitevpi.github.io/data-vue/)
for this project. Editable example usages and component demos can be found on [CodeSandbox](http://bit.ly/v3js-demo),
and a [deployed demo](http://bit.ly/v3js-deployed) is also available.

```cmd
npm i @mitevpi/v3
```

### Importing

#### In-Component Import

For single use in a component or small set of components.

Static import using the compiled `.js` file.

```js
// component.vue
import { BarChart } from "@mitevpi/v3";

export default {
  name: "Tester",
  components: {
    BarChart
  }
};
```

Chunked import using the source `.vue` file.

```js
// component.vue
export default {
  name: "Tester",
  components: {
    BarChart: () => import("@mitevpi/v3/src/components/BarChart"),
  }
};
```

#### Global

Importing the single file `.vue` components directly. (If using Vue CLI 3 with Babel or TypeScript, it's recommended
that you import its src directory. This will minimize the size of your application by preventing duplicate or
unnecessary polyfills.)

Importing source `.vue` file.

```js
// main.js
import BarChart from "@mitevpi/v3/src/components";
Vue.use(BarChart);
```

Importing the bundled `.js`.

```js
// main.js
import BarChart from "@mitevpi/v3";
Vue.use(BarChart);
```

## Documentation

Full documentation can be found on the [GitHub Pages Site](https://mitevpi.github.io/data-vue/)
for this project.Editable example usages and component demos can be found on [CodeSandbox](http://bit.ly/v3js-demo),
and a [deployed demo](http://bit.ly/v3js-deployed) is also available.

## Developer Documentation

### Building

In order to contribute to this project, fork/clone this repository locally. After cloning is completed, you can install dependencies and start a development server by running the commands below in the root directory of this repository. Once the development server is running, view localhost:8080 using Chrome and [Vue.js Dev Tools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en).

```cmd
npm i
npm run serve
```

The served "app" is a simple container for the individual components which make up the library. It's only used for testing/visualizing components, and will not be included in the final library build and distribution.

## Commands

The following commands are used to develop the project:

1. `npm run build` - Build the package distribution bundle.
2. `npm run serve` - Start a development server with live-reloading on changes. (Used for previewing individual components.)
3. `npm run lint` - Lint code using ESLint and Vue, AirBnB, and Prettier configs.
4. `npm test` - Run unit tests for the individual components in the package.
5. `vuese gen` - Generate components documentation through the [Vuese CLI](https://vuese.org/cli/#motivation). Must have the CLI installed globally on your machine, as it is not included as a dev dependency here.
