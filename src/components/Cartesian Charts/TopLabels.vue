<template>
  <transition-group :name="name" tag="g">
    <text
      v-for="(item, i) in data"
      :key="item[xKey] + 'top'"
      :x="ScaleX(i) + barWidth / 2 - 10"
      :y="ScaleY(0)"
      :style="{ '--i': i }"
    >
      {{ item[yKey] }}
    </text>
  </transition-group>
</template>

<script>
export default {
  name: "BottomLabels",
  props: {
    name: String,
    ScaleX: Function,
    ScaleY: Function,
    data: Array,
    barWidth: Number,
    xKey: String,
    location: String
  },
  computed: {}
};
</script>

<style scoped lang="scss">
@import "../../css/transitions";
</style>
