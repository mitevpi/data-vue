<template>
  <div class="center global-font">
    <!--    <bar-chart-->
    <!--      title="Bar Chart"-->
    <!--      x-key="name"-->
    <!--      y-key="amount"-->
    <!--      :data="barChartData"-->
    <!--      :top-labels="true"-->
    <!--      :bottom-labels="true"-->
    <!--    />-->
    <!--    <circle-pack-->
    <!--      :width="600"-->
    <!--      :height="600"-->
    <!--      x-key="spaceType"-->
    <!--      y-key="r"-->
    <!--      :nodes="circlePackData"-->
    <!--    />-->
    <network
      :width="600"
      :height="600"
      :graph="networkData"
      node-color="lightgray"
      line-color="gray"
      :node-labels="true"
      y-key="size"
      x-key="size"
    />
  </div>
</template>

<script>
import { MockData } from "@mitevpi/algos";
import { NetworkData } from "./js/CreateData";

export default {
  name: "App",
  components: {
    // BarChart: () => import("./components/BarChart.vue"),
    // CirclePack: () => import("./components/CirclePack.vue")
    Network: () => import("./components/Network.vue")
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
        name: "Willows",
        amount: 9
      }
    ]
  }),
  // computed: {
  //   networkComputed() {
  //     return NetworkData();
  //   }
  // },
  mounted() {
    this.circlePackData = MockData.packData(200);
    console.log(NetworkData());
    console.log(MockData.networkData(50));
    this.networkData = NetworkData();
    setTimeout(() => {
      this.barChartData.push({ name: "New", amount: 19 });
    }, 2000);
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
