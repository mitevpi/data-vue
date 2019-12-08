<template>
  <div class="center">
    <bar-chart
      title="Bar Chart"
      x-key="name"
      y-key="amount"
      :data="barChartData"
    />
    <!-- <BarChart
      title="Bar Chart1"
      x-key="name"
      y-key="amount"
      :data="barChartData"
    /> -->
    <circle-pack
      :width="600"
      :height="600"
      x-key="spaceType"
      y-key="r"
      :nodes="circlePackData"
    />
    <network :width="600" :height="600"></network>
  </div>
</template>

<script>
import { range } from "d3-array";

export default {
  name: "App",
  components: {
    BarChart: () => import("./components/BarChart.vue"),
    CirclePack: () => import("./components/CirclePack.vue"),
    Network: () => import("./components/Network.vue")
  },
  data: () => ({
    spaceTypes: ["Office", "Meeting", "Support", "Creative", "Circulation"],
    circlePackData: [],
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
    this.CreatePackData();
  },
  methods: {
    CreatePackData() {
      const r = () => Math.random();
      this.circlePackData = range(200).map(i => {
        const randomNumber = Math.floor(r() * this.spaceTypes.length);
        return {
          r: r() * 14 * r() * 2 * r() * 2,
          id: i,
          spaceType: this.spaceTypes[randomNumber]
        };
      });
    }
  }
};
</script>

<style>
.center {
  margin: auto;
  width: 50%;
  /* border: 3px solid green; */
  padding: 10px;
}
</style>
