<template>
  <transition-group :name="name" tag="g">
    <text
      v-for="(item, i) in data"
      :key="item[xKey] + 'bottom'"
      :x="ScaleX(i) + barWidth / 2"
      :y="ScaleY(0) + 20"
      :style="{ '--i': i }"
      text-anchor="middle"
    >
      {{ item[xKey] }}
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
  computed: {
    // labelLocation() {
    //   switch (this.location) {
    //     case "middle":
    //       // code block
    //       break;
    //     case "left":
    //       // code block
    //       break;
    //     default:
    //     // code block
    //   }
    // }
  }
};
</script>

<style scoped lang="scss">
@import "../../css/transitions";
</style>
