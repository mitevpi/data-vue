import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";

import App from "./App.vue";

Vue.config.productionTip = false;
Vue.use(VueCompositionApi);

new Vue({
  components: { App },
  render: h => h(App)
}).$mount("#app");
