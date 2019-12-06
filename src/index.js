import Vue from "vue";
import BarChart from "./components/BarChart.vue";

const Components = {
  BarChart
};

Vue.component("BarChart", BarChart);
export { BarChart };

// What should happen if the user installs the library as a plugin
// function install(Vue) {
//   Vue.component("BarChart", BarChart);
// }

// Export the library as a plugin
// export default { install };

export default Components;
