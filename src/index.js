// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
import BarChart from "./components/BarChart.vue";
import CirclePack from "./components/CirclePack.vue";
import Network from "./components/Network.vue";
import PointPlot from "./components/PointPlot.vue";

Vue.use(VueCompositionApi);

const Components = {
  BarChart,
  CirclePack,
  Network,
  PointPlot
};

Vue.component("BarChart", BarChart);
Vue.component("CirclePack", CirclePack);
Vue.component("Network", Network);
Vue.component("PointPlot", PointPlot);

export { BarChart };
export { CirclePack };
export { Network };
export { PointPlot };

// What should happen if the user installs the library as a plugin
// function install(Vue) {
//   Vue.component("BarChart", BarChart);
// }

// Export the library as a plugin
// export default { install };

export default Components;
