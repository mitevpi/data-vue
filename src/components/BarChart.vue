<template>
  <div ref="container" class="svg-container" align="center" :style="cssProps">
    <h1 v-show="title !== null" class="chart-title">{{ title }}</h1>
    <svg v-if="redrawToggle === true" :width="svgWidth" :height="svgHeight">
      <g>
        <rect
          v-for="item in data"
          :key="item[xKey]"
          class="bar-positive"
          :x="xScale(item[xKey])"
          :y="yScale(0)"
          :width="xScale.bandwidth()"
          :height="0"
        />
      </g>
    </svg>
  </div>
</template>

<script>
import { scaleLinear, scaleBand } from "d3-scale";
import { max, min } from "d3-array";
import { selectAll } from "d3-selection";
import { transition } from "d3-transition";

// Animated, reactive bar chart
export default {
  name: "BarChart",
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
    hoverColor: String
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
    redrawToggle: true
  }),
  computed: {
    /**
     * @vuese
     * The maximum value in the core dataset.
     * @type Number
     */
    dataMax() {
      return max(this.data, d => {
        return d[this.yKey];
      });
    },
    /**
     * @vuese
     * The minimum value in the core dataset.
     * @type Number
     */
    dataMin() {
      return min(this.data, d => {
        return d[this.yKey];
      });
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
     * The D3 scale function for the Y axis (based on the Y key).
     * @type Function
     */
    yScale() {
      return scaleLinear()
        .rangeRound([this.svgHeight, 0])
        .domain([this.dataMin > 0 ? 0 : this.dataMin, this.dataMax]);
    },
    /**
     * @vuese
     * The computed height of the SVG container, based on the overall width.
     * @type Number
     */
    svgHeight() {
      return this.svgWidth / 1.61803398875; // golden ratio
    },
    cssProps() {
      return {
        "--bar-color": this.barColor || "steelblue",
        "--hover-color": this.hoverColor || "orange"
      };
    }
  },
  mounted() {
    this.svgWidth = this.$refs.container.offsetWidth * 0.75;
    this.AddResizeListener();
    // TODO: ADD TOGGLE FOR DIFFERENT LOAD ANIMATIONS
    this.AnimateLoad();
  },
  methods: {
    /**
     * @vuese
     * Run the animation which "grows" the bar chart from the default 0 values.
     */
    AnimateLoad() {
      selectAll("rect")
        .data(this.data)
        .transition()
        .delay((d, i) => {
          return i * 150;
        })
        .duration(1000)
        .attr("y", d => {
          return this.yScale(d[this.yKey]);
        })
        .attr("height", d => {
          return this.svgHeight - this.yScale(d[this.yKey]);
        });
    },
    /**
     * @vuese
     * Add a listener to udpate and redraw the chart after X seconds of a resize event.
     */
    AddResizeListener() {
      // redraw the chart 300ms after the window has been resized
      const self = this;
      window.addEventListener("resize", () => {
        this.$data.redrawToggle = false;
        setTimeout(() => {
          this.$data.redrawToggle = true;
          this.$data.svgWidth = self.$refs.container.offsetWidth * 0.75;
          this.AnimateLoad();
        }, 300);
      });
    }
  }
};
</script>

<style scoped>
.chart-title {
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
}

.bar-positive {
  fill: var(--bar-color);
}

.bar-positive:hover {
  fill: var(--hover-color);
}

.svg-container {
  display: inline-block;
  position: relative;
  width: 100%;
  padding-bottom: 1%;
  vertical-align: top;
  overflow: hidden;
}
</style>
