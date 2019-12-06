# Data Vue (D3 + Vue Data Visualization Components)

A collection of modular, reusable data visualization components built using D3 and Vue.js: `data-vue`.

## Usage

This package is currently not published on npm and must be installed from the git repository, or from a local pack. Once installed, it can be imported and used in any Vue.js app/component.

### Dependencies

Currently, this package depends on the following modules to work. Installing the `data-vue` package should automatically install these dependencies to your project.

1. `d3-scale`
2. `d3-transition`
3. `d3-array`
4. `d3-selection`

### Importing

#### In-Component Import

For single use in a component or small set of components.

```js
// component.vue
import { BarChart } from "data-vue/src/components";

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
    BarChart: () => import("data-vue/src/components"),
  }
};
</script>
```

#### Global

Importing the single file .vue components directly. (If using Vue CLI 3 with Babel or TypeScript, it's recommended that you import its src directory. This will minimize the size of your application by preventing duplicate or unnecessary polyfills.)

```js
// main.js
import BarChart from "data-vue/src/components";
Vue.use(BarChart);
```

Importing the bundled .js and .css components individually.

```js
import BarChart from "data-vue";
import "data-vue/dist/data-vue.css";
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
