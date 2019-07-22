import Vue from "vue";
import BarChart from "./BarChart.vue";

export { BarChart };

const Components = {
  BarChart
};

Vue.component("BarChart", BarChart);

// What should happen if the user installs the library as a plugin
// function install(Vue) {
//   Vue.component("BarChart", BarChart);
// }

// Export the library as a plugin
// export default { install };

export default Components;
