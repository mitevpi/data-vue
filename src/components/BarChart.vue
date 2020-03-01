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
              :x="xScale(item[xKey])"
              :y="ScaleY(0)"
              :width="xScale.bandwidth()"
              :height="0"
              :style="{ '--i': i }"
              class="bar-positive"
            />
          </transition-group>
          <g v-if="topLabels">
            <transition-group :name="sortTransition" tag="g">
              <text
                v-for="(item, i) in data"
                :key="item[xKey] + 'top'"
                :x="xScale(item[xKey]) + xScale.bandwidth() / 2 - 10"
                :y="ScaleY(0)"
                class="bar-label-top"
                :style="{ '--i': i }"
              >
                {{ item[yKey] }}
              </text>
            </transition-group>
          </g>

          <fade>
            <g v-if="bottomLabels">
              <transition-group :name="sortTransition" tag="g">
                <text
                  v-for="(item, i) in data"
                  :key="item[xKey] + 'bottom'"
                  :x="xScale(item[xKey])"
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
import { scaleBand } from "d3-scale";
import Fade from "./Transitions/Fade.vue";

import { GrowAll } from "../js/AnimateBarLoad";
import { ToggleSortByX } from "../js/AnimateBarSort";

// Animated, reactive bar chart
export default {
  name: "BarChart",
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
    /**
     * @vuese
     * The width of the SVG element, determined by the width of the parent div.
     */
    svgWidth: 0,
    /**
     * @vuese
     * Whether or not to redraw the bar chart and re-run the animation (based on resize event).
     */
    redrawToggle: true,
    sortType: "none",
    animate: false
  }),
  computed: {
    /**
     * @vuese
     * A unique ID for the `svg`/`g` container for this chart.
     * @type String
     */
    groupId() {
      return StringsLatin.removeNonAlpha(Strings.createUniqueID());
    },
    dataCount() {
      return this.data.length;
    },
    /**
     * @vuese
     * The maximum value in the core dataset.
     * @type Number
     */
    dataMax() {
      return ArraysObjective.max(this.data, this.yKey);
    },
    /**
     * @vuese
     * The minimum value in the core dataset.
     * @type Number
     */
    dataMin() {
      return ArraysObjective.min(this.data, this.yKey);
    },
    /**
     * @vuese
     * The D3 scale function for the X axis (based on the X key).
     * @type Function
     */
    xScale() {
      return scaleBand()
        .rangeRound([0, this.svgWidth])
        .padding(0.1)
        .domain(
          this.data.map(d => {
            return d[this.xKey];
          })
        );
    },
    /**
     * @vuese
     * The computed height of the SVG container, based on the overall width.
     * @type Number
     */
    svgHeight() {
      return this.svgWidth / 1.61803398875; // golden ratio
    },
    /**
     * @vuese
     * Whether or not to activate the sort transition animation (if active on render,
     * it will conflict with the "grow" animation.
     * @type String
     */
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
    this.AddResizeListener();
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
    SortX() {
      this.sortType = ToggleSortByX(this.sortType, this.data, this.yKey);
    },
    /**
     * @vuese
     * Add a listener to update and redraw the chart after X seconds of a resize event.
     */
    AddResizeListener() {
      // redraw the chart 300ms after the window has been resized
      const self = this;
      window.addEventListener("resize", () => {
        self.redrawToggle = false;
        setTimeout(() => {
          self.redrawToggle = true;
          self.svgWidth = self.$refs.container.offsetWidth * 0.85;
          GrowAll(
            this.groupId,
            this.data,
            this.ScaleY,
            this.yKey,
            this.svgHeight
          );
        }, 300);
      });
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
