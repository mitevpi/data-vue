<template>
  <svg
    :id="svgId"
    class="svg-container"
    :width="width"
    :height="height"
    @click="onClick"
  >
    <slot />
  </svg>
</template>

<script>
import { Strings } from "@mitevpi/algos";

export default {
  name: "Container",
  props: {
    // The desired width of the visualization
    width: Number,
    // The desired height of the visualization
    height: Number,
    // Function to execute when clicked
    onClick: {
      type: Function,
      required: false
    }
  },
  computed: {
    /**
     * @vuese
     * The unique identifier for the svg containing child elements created by this component.
     * @type String
     */
    svgId() {
      return Strings.removeNonAlpha(Strings.createUniqueID());
    }
  }
};
</script>
<style scoped>
.svg-container {
  display: inline-block;
  position: relative;
  width: 100%;
  padding-bottom: 1%;
  vertical-align: top;
  overflow: hidden;
}
</style>
