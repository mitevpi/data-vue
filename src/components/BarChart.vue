<template>
  <div ref="container" align="center" :style="cssProps">
    <h1 v-show="title !== null" class="chart-title">{{ title }}</h1>
    <fade>
      <svg
        v-if="state.redrawToggle === true"
        :width="state.svgWidth"
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
              :y="ScaleY(0)"
              :width="barWidth"
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
                :x="ScaleX(i) + barWidth / 2 - 10"
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
import { reactive, computed, watch } from "@vue/composition-api";
import Fade from "./Transitions/Fade.vue";

import datasetMetrics from "../hooks/dataUtil";
import { createGroupId, goldenHeight } from "../hooks/svgUtil";
import { scale, scaleYLinear, scaleXLinear } from "../hooks/scale";

import { GrowAll } from "../js/AnimateBarLoad";
import { ToggleSortByX } from "../js/Sort";

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
  setup(props) {
    const { dataCount, dataMax, dataMin } = datasetMetrics(props);

    const groupId = createGroupId();

    const state = reactive({
      svgWidth: 0,
      redrawToggle: true,
      sortType: "none",
      animate: false
    });

    const svgWidthComputed = computed(() => {
      return state.svgWidth;
    });

    const barWidth = scale(svgWidthComputed, dataCount);
    const svgHeight = goldenHeight(svgWidthComputed);

    watch(dataCount, () => setTimeout(() => this.AnimateGrow(), 10));

    return {
      state,
      dataCount,
      dataMax,
      dataMin,
      groupId,
      barWidth,
      svgWidthComputed,
      svgHeight
    };
  },
  computed: {
    sortTransition() {
      return this.state.animate ? "flip-list" : "disabled-list";
    },
    cssProps() {
      return {
        "--bar-color": this.barColor || "steelblue",
        "--hover-color": this.hoverColor || "orange"
      };
    }
  },
  mounted() {
    this.state.svgWidth = this.$refs.container.offsetWidth * 0.75;
    this.AddResizeListener();
    this.AnimateGrow();
    setTimeout(() => (this.state.animate = true), 1100);
  },
  methods: {
    AnimateGrow() {
      GrowAll(this.groupId, this.data, this.ScaleY, this.yKey, this.svgHeight);
    },
    ScaleY(val) {
      return scaleYLinear(val, this.dataMin, this.dataMax, this.svgHeight, 0);
    },
    ScaleX(val) {
      return scaleXLinear(val, this.dataCount, this.state.svgWidth);
    },
    SortX() {
      this.state.sortType = ToggleSortByX(
        this.state.sortType,
        this.data,
        this.yKey
      );
    },
    AddResizeListener() {
      // redraw the chart 300ms after the window has been resized
      const self = this;
      window.addEventListener("resize", () => {
        self.state.redrawToggle = false;
        setTimeout(() => {
          self.state.redrawToggle = true;
          self.state.svgWidth = self.$refs.container.offsetWidth * 0.85;
          this.AnimateGrow();
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
