# V3.js (D3 + Vue Data Visualization Components)

[![Generic badge](https://img.shields.io/badge/Docs-Web-Green.svg)](https://mitevpi.github.io/data-vue/) [![Generic badge](https://img.shields.io/badge/Docs-MD-Green.svg)](docs/README.md) 

[![npm](https://img.shields.io/npm/v/@mitevpi/v3.svg)](https://www.npmjs.com/package/@mitevpi/v3) [![npm bundle size](https://img.shields.io/bundlephobia/min/@mitevpi/v3.svg)](https://bundlephobia.com/result?p=@mitevpi/v3) [![npm](https://img.shields.io/npm/dw/@mitevpi/v3.svg)](https://www.npmjs.com/package/@mitevpi/v3) [![npm2](https://img.shields.io/npm/dt/@mitevpi/v3.svg)](https://www.npmjs.com/package/@mitevpi/v3)

[![GitHub issues](https://img.shields.io/github/issues/mitevpi/data-vue.svg)](https://github.com/mitevpi/data-vue/issues) ![David](https://img.shields.io/david/dev/mitevpi/data-vue.svg) [![GitHub last commit](https://img.shields.io/github/last-commit/mitevpi/data-vue.svg)](https://github.com/mitevpi/data-vue/commits/master)

A collection of modular, reusable data visualization components built using D3 and Vue.js: `v3`.

## Usage

To use this module, install locally using the command below, or clone this repository and import the .vue files directly from source. Full documentation can be found on the [GitHub Pages Site](https://mitevpi.github.io/data-vue/) for this project.

```cmd
npm i @mitevpi/v3
```

### Dependencies

Currently, this package depends on the following modules to work. These must be installed in your Vue.js application prior to using the components in the `v3` package. Installing the `v3` package should automatically install these dependencies to your project.

1. `d3-scale`
2. `d3-transition`
3. `d3-array`
4. `d3-selection`

### Importing

#### In-Component Import

For single use in a component or small set of components.

```js
// component.vue
import { BarChart } from "@mitevpi/v3/src/components";

export default {
  name: "Tester",
  components: {
    BarChart
  }
};
</script>
```

```js
// component.vue
export default {
  name: "Tester",
  components: {
    BarChart: () => import("@mitevpi/v3/src/components/BarChart"),
  }
};
</script>
```

#### Global

Importing the single file .vue components directly. (If using Vue CLI 3 with Babel or TypeScript, it's recommended that you import its src directory. This will minimize the size of your application by preventing duplicate or unnecessary polyfills.)

```js
// main.js
import BarChart from "@mitevpi/v3/src/components";
Vue.use(BarChart);
```

Importing the bundled .js and .css components individually.

```js
import BarChart from "@mitevpi/v3";
import "@mitevpi/v3/dist/v3.css";
Vue.use(BarChart);
```

## Documentation

Documentation can be found in the [docs](/docs) folder.

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
