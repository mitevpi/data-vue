<template>
  <svg
    v-if="bounds.minX"
    xmlns="http://www.w3.org/2000/svg"
    :width="width + 'px'"
    :height="height + 'px'"
    :style="cssProps"
    @mousemove="drag($event)"
    @mouseup="drop()"
  >
    <g>
      <line
        v-for="link in graph.links"
        :key="String(link.source.index) + String(link.target.index)"
        :x1="coords[link.source.index].x"
        :y1="coords[link.source.index].y"
        :x2="coords[link.target.index].x"
        :y2="coords[link.target.index].y"
        class="node-line"
      />
    </g>

    <g>
      <circle
        v-for="(node, i) in graph.nodes"
        :key="i + 'circle'"
        class="node-network"
        :cx="coords[i].x"
        :cy="coords[i].y"
        :r="node[yKey]"
        stroke="white"
        stroke-width="1"
        @mousedown="
          currentMove = { x: $event.screenX, y: $event.screenY, node: node }
        "
      />
    </g>
    <g v-if="nodeLabels">
      <text
        v-for="(node, i) in graph.nodes"
        :key="i + 'circle-label'"
        :x="coords[i].x"
        :y="coords[i].y"
      >
        {{ node[yKey] }}
      </text>
    </g>
  </svg>
</template>

<script>
import {
  forceSimulation,
  forceManyBody,
  forceLink,
  forceX,
  forceY
} from "d3-force";
import { ArraysObjective, Strings, StringsLatin } from "@mitevpi/algos";

export default {
  name: "Network",
  props: {
    width: Number,
    height: Number,
    graph: Object,
    yKey: String,
    // (Optional) The default color to apply on the nodes in the network
    nodeColor: String,
    // (Optional) The color to apply on the links between nodes in the network
    lineColor: String,
    // (Optional) Whether or not to have labels on each node
    nodeLabels: Boolean
  },
  data: () => ({
    padding: 5,
    simulation: null,
    currentMove: null
  }),
  computed: {
    bounds() {
      return {
        minX: Math.min(...this.graph.nodes.map(n => n.x)),
        maxX: Math.max(...this.graph.nodes.map(n => n.x)),
        minY: Math.min(...this.graph.nodes.map(n => n.y)),
        maxY: Math.max(...this.graph.nodes.map(n => n.y))
      };
    },
    cssProps() {
      return {
        "--node-color": this.nodeColor || "cornflowerblue",
        "--line-color": this.lineColor || "black"
      };
    },
    /**
     * @vuese
     * The maximum value in the core dataset.
     * @type Number
     */
    dataMax() {
      return ArraysObjective.max(this.graph.nodes, this.yKey);
    },
    /**
     * @vuese
     * The minimum value in the core dataset.
     * @type Number
     */
    dataMin() {
      return ArraysObjective.min(this.graph.nodes, this.yKey);
    },
    coords() {
      return this.graph.nodes.map(node => {
        // set padding per node, to ensure that nodes don't get clipped due to size
        const truePadding = node[this.yKey] + this.padding;
        return {
          x:
            truePadding +
            ((node.x - this.bounds.minX) * (this.width - 2 * truePadding)) /
              (this.bounds.maxX - this.bounds.minX),
          y:
            truePadding +
            ((node.y - this.bounds.minY) * (this.height - 2 * truePadding)) /
              (this.bounds.maxY - this.bounds.minY)
        };
      });
    }
  },
  created() {
    this.simulation = forceSimulation(this.graph.nodes)
      .force(
        "charge",
        forceManyBody().strength(d => -100)
      )
      .force("link", forceLink(this.graph.links))
      .force("x", forceX())
      .force("y", forceY());
  },
  methods: {
    drag(e) {
      if (this.currentMove) {
        this.currentMove.node.fx =
          this.currentMove.node.x -
          ((this.currentMove.x - e.screenX) *
            (this.bounds.maxX - this.bounds.minX)) /
            (this.width - 2 * this.padding);
        this.currentMove.node.fy =
          this.currentMove.node.y -
          ((this.currentMove.y - e.screenY) *
            (this.bounds.maxY - this.bounds.minY)) /
            (this.height - 2 * this.padding);
        this.currentMove.x = e.screenX;
        this.currentMove.y = e.screenY;
      }
    },
    drop() {
      delete this.currentMove.node.fx;
      delete this.currentMove.node.fy;
      this.currentMove = null;
      this.simulation.alpha(1);
      this.simulation.restart();
    }
  }
};
</script>

<style scoped lang="scss">
.node-network {
  stroke: #3a403d;
  stroke-width: 0.5px;
  fill: var(--node-color);
}

.node-network:hover {
  stroke-width: 2px;
}
.node-line {
  stroke: var(--line-color);
  stroke-width: 2;
}
</style>
