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
            <rect
              v-for="(item, i) in data"
              :key="item[xKey] + 'bar'"
              :x="ScaleX(i)"
              :y="ScaleY(item[yKey])"
              :width="barWidth"
              :height="svgHeight - ScaleY(item[yKey])"
              :style="{ '--i': i }"
              class="bar-positive"
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
                  class="bar-label-bottom"
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

import { GrowAll } from "../js/AnimateBarLoad";
import { ToggleSortByX } from "../js/AnimateBarSort";

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
    // (Optional) Whether or not to have labels at the top of each bar
    topLabels: Boolean,
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
        "--bar-color": this.barColor || "steelblue",
        "--hover-color": this.hoverColor || "orange"
      };
    }
  },
  watch: {
    dataCount() {
      setTimeout(() => {
        GrowAll(
          this.groupId,
          this.data,
          this.ScaleY,
          this.yKey,
          this.svgHeight
        );
      }, 10);
    }
  },
  mounted() {
    this.svgWidth = this.$refs.container.offsetWidth * 0.75;
    // TODO: ADD TOGGLE FOR DIFFERENT LOAD ANIMATIONS
    GrowAll(this.groupId, this.data, this.ScaleY, this.yKey, this.svgHeight);
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
.bar-label-top {
}
.bar-label-bottom {
}
.bar-positive {
  /*transition-duration: 0.3s;*/
  fill: var(--bar-color);
}

.bar-positive:hover {
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
