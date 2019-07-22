<template>
  <div>
    <BarChart
      title="Bar Chart"
      x-key="name"
      y-key="amount"
      :data="barChartData"
    />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
    BarChart: () => import("./components/BarChart.vue")
  },
  data: () => ({
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
  })
};
</script>

<style></style>
