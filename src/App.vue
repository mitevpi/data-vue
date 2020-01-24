<template>
  <div class="center global-font">
    <bar-chart
      title="Bar Chart"
      x-key="name"
      y-key="amount"
      :data="barChartData"
      :top-labels="true"
      :bottom-labels="true"
    />
    <!--    <circle-pack-->
    <!--      :width="600"-->
    <!--      :height="600"-->
    <!--      x-key="spaceType"-->
    <!--      y-key="r"-->
    <!--      :nodes="circlePackData"-->
    <!--    />-->
    <!--    <network :width="600" :height="600" :graph="networkData"></network>-->
  </div>
</template>

<script>
import { PackData, NetworkData } from "./js/CreateData";

export default {
  name: "App",
  components: {
    BarChart: () => import("./components/BarChart.vue")
    // CirclePack: () => import("./components/CirclePack.vue")
    // Network: () => import("./components/Network.vue")
  },
  data: () => ({
    circlePackData: [],
    networkData: [],
    barChartData: [
      {
        name: "Roses",
        amount: 25
      },
      {
        name: "Tulips",
        amount: 40
      },
      {
        name: "Daisies",
        amount: 15
      },
      {
        name: "Narcissuses",
        amount: 9
      }
    ]
  }),
  mounted() {
    this.circlePackData = PackData();
    this.networkData = NetworkData();
  },
  methods: {}
};
</script>

<style>
.center {
  margin: auto;
  width: 50%;
  /* border: 3px solid green; */
  padding: 10px;
}
.global-font {
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
}
</style>
