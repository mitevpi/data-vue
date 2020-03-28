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
        <g :id="groupId" transform="translate(0,20)">
          <g>
            <transition-group name="flip-list" tag="g">
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
          </g>

          <fade>
            <g v-if="bottomLabels" class="point-label-bottom">
              <bottom-labels
                :name="sortTransition"
                :scale-x="ScaleX"
                :scale-y="ScaleY"
                :data="data"
                :bar-width="barWidth"
                :x-key="xKey"
              />
            </g>
          </fade>
        </g>
      </svg>
    </fade>
  </div>
</template>

<script>
import { reactive, computed, ref, onMounted } from "@vue/composition-api";
import Fade from "./Transitions/Fade.vue";

// hooks
import datasetMetrics from "../hooks/dataUtil";
import { createGroupId, goldenHeight } from "../hooks/svgUtil";
import { scale, scaleYLinear, scaleXLinear } from "../hooks/scale";

// methods
import { ToggleSortByX } from "../js/Sort";

// Animated, reactive line chart
export default {
  name: "PointPlot",
  components: {
    Fade,
    BottomLabels: () => import("./Cartesian Charts/BottomLabels.vue")
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
    // (Optional) The default color to apply on the bars
    barColor: String,
    // (Optional) The color to apply on the bars when hovered over
    hoverColor: String,
    // (Optional) Whether or not to have labels at the bottom of each bar
    bottomLabels: Boolean
  },
  setup(props) {
    const { dataCount, dataMax, dataMin } = datasetMetrics(props);
    const groupId = createGroupId();
    const container = ref(null);

    const state = reactive({
      svgWidth: 0,
      redrawToggle: true,
      sortType: "none",
      animate: false
    });

    const svgWidthComputed = computed(() => state.svgWidth);
    const barWidth = scale(svgWidthComputed, dataCount);
    const svgHeight = goldenHeight(svgWidthComputed);
    const sortTransition = computed(() =>
      state.animate ? "flip-list" : "disabled-list"
    );

    // console.log(refs.container);
    const ScaleY = val =>
      scaleYLinear(val, dataMin.value, dataMax.value, svgHeight.value, 0);

    const ScaleX = val =>
      scaleXLinear(val, dataCount.value, svgWidthComputed.value);

    const SortX = () =>
      (state.sortType = ToggleSortByX(state.sortType, props.data, props.yKey));

    const cssProps = computed(() => {
      return {
        "--point-color": props.barColor || "steelblue",
        "--hover-color": props.hoverColor || "orange"
      };
    });

    onMounted(() => {
      state.svgWidth = container.value.offsetWidth * 0.85;
      setTimeout(() => (state.animate = true), 1100); // turn on sort
    });

    return {
      state,
      container,
      dataCount,
      dataMax,
      dataMin,
      groupId,
      barWidth,
      svgHeight,
      sortTransition,
      cssProps,
      SortX,
      ScaleY,
      ScaleX
    };
  }
};
</script>

<style scoped lang="scss">
@import "../css/transitions";

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
</style>
