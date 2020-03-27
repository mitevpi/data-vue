<template>
  <div ref="container" align="center" :style="cssProps">
    <h1 v-show="title !== null" class="chart-title">{{ title }}</h1>
    <fade>
      <svg
        v-if="redrawToggle === true"
        :width="svgWidth"
        :height="svgHeight * 1.25"
        @click="SortX"
      >
        <!--TODO: Figure out better logic for not cutting off labels-->
        <g :id="groupId" transform="translate(0,20)">
          <transition-group :name="sortTransition" tag="g">
            <circle
              v-for="(item, i) in data"
              :key="item[xKey] + 'point'"
              :cx="ScaleX(i) + barWidth / 2"
              :cy="ScaleY(item[yKey])"
              :style="{ '--i': i }"
              class="point-positive"
              r="10"
            />
          </transition-group>
          <fade>
            <g v-if="bottomLabels">
              <transition-group :name="sortTransition" tag="g">
                <text
                  v-for="(item, i) in data"
                  :key="item[xKey] + 'bottom'"
                  :x="ScaleX(i)"
                  :y="ScaleY(0) + 20"
                  class="point-label-bottom"
                  :style="{ '--i': i }"
                >
                  {{ item[xKey] }}
                </text>
              </transition-group>
            </g>
          </fade>
        </g>
      </svg>
    </fade>
  </div>
</template>

<script>
import {
  ArraysObjective,
  Strings,
  StringsLatin,
  Numbers
} from "@mitevpi/algos";
import Fade from "./Transitions/Fade.vue";

import { ToggleSortByX } from "../js/Sort";

// Animated, reactive bar chart
export default {
  name: "LineChart",
  components: {
    Fade
  },
  props: {
    // Title of the chart
    title: String,
    // The name of the property in the dataset to use for the X axis
    xKey: String,
    // The name of the property in the dataset to use for the Y axis
    yKey: String,
    // The array of data objects to visualize
    data: Array,
    // (Optional) What kind of animation to apply to the chart
    animation: String,
    // (Optional) The default color to apply on the bars
    barColor: String,
    // (Optional) The color to apply on the bars when hovered over
    hoverColor: String,
    // (Optional) Whether or not to have labels at the bottom of each bar
    bottomLabels: Boolean
  },
  data: () => ({
    svgWidth: 0,
    redrawToggle: true,
    sortType: "none",
    animate: false
  }),
  computed: {
    groupId() {
      return StringsLatin.removeNonAlpha(Strings.createUniqueID());
    },
    dataCount() {
      return this.data.length;
    },
    dataMax() {
      return ArraysObjective.max(this.data, this.yKey);
    },
    dataMin() {
      return ArraysObjective.min(this.data, this.yKey);
    },
    barWidth() {
      const finalWidth = this.svgWidth / this.dataCount - 5;
      return finalWidth > 0 ? finalWidth : 0;
    },
    svgHeight() {
      return this.svgWidth / 1.61803398875; // golden ratio
    },
    sortTransition() {
      return this.animate ? "flip-list" : "disabled-list";
    },
    cssProps() {
      return {
        "--point-color": this.barColor || "steelblue",
        "--hover-color": this.hoverColor || "orange"
      };
    }
  },
  watch: {},
  mounted() {
    this.svgWidth = this.$refs.container.offsetWidth * 0.75;
    // TODO: ADD TOGGLE FOR DIFFERENT LOAD ANIMATIONS
    setTimeout(() => {
      this.animate = true;
    }, 1100);
  },
  methods: {
    ScaleY(val) {
      return Numbers.normalizeToRange(
        val,
        this.dataMin > 0 ? 0 : this.dataMin,
        this.dataMax,
        this.svgHeight,
        0
      );
    },
    ScaleX(val) {
      return Numbers.normalizeToRange(val, 0, this.dataCount, 0, this.svgWidth);
    },
    SortX() {
      this.sortType = ToggleSortByX(this.sortType, this.data, this.yKey);
    }
  }
};
</script>

<style scoped lang="scss">
.chart-title {
}
.point-label-top {
}
.point-label-bottom {
}
.point-positive {
  /*transition-duration: 0.3s;*/
  fill: var(--point-color);
}

.point-positive:hover {
  /*transition-duration: 0.3s;*/
  fill: var(--hover-color);
}

.flip-list {
  &-move {
    transition: transform 0.5s ease-in-out;
    transition-delay: calc(0.15s * var(--i));
  }
  &-enter-active,
  &-leave-active {
    transition: opacity 2s;
  }
  &-enter,
  &-leave-to {
    opacity: 0;
  }
}
</style>
