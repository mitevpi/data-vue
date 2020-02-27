// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from "vue";
import BarChart from "./components/BarChart.vue";
import CirclePack from "./components/CirclePack.vue";
import Network from "./components/Network.vue";

const Components = {
  BarChart,
  CirclePack,
  Network
};

Vue.component("BarChart", BarChart);
Vue.component("CirclePack", CirclePack);
Vue.component("Network", Network);

export { BarChart };
export { CirclePack };
export { Network };

// What should happen if the user installs the library as a plugin
// function install(Vue) {
//   Vue.component("BarChart", BarChart);
// }

// Export the library as a plugin
// export default { install };

export default Components;
