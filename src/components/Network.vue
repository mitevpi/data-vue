<template>
  <svg
    v-if="bounds.minX"
    xmlns="http://www.w3.org/2000/svg"
    :width="width + 'px'"
    :height="height + 'px'"
    @mousemove="drag($event)"
    @mouseup="drop()"
  >
    <line
      v-for="link in graph.links"
      :key="String(link.source.index) + String(link.target.index)"
      :x1="coords[link.source.index].x"
      :y1="coords[link.source.index].y"
      :x2="coords[link.target.index].x"
      :y2="coords[link.target.index].y"
      class="node-line"
    />

    <circle
      v-for="(node, i) in graph.nodes"
      :key="i + 'circle'"
      class="node-network"
      :cx="coords[i].x"
      :cy="coords[i].y"
      :r="20"
      stroke="white"
      stroke-width="1"
      @mousedown="
        currentMove = { x: $event.screenX, y: $event.screenY, node: node }
      "
    />
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

export default {
  name: "Network",
  props: {
    width: Number,
    height: Number,
    graph: Object
  },
  data: () => ({
    padding: 20,
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
    coords() {
      return this.graph.nodes.map(node => {
        return {
          x:
            this.padding +
            ((node.x - this.bounds.minX) * (this.width - 2 * this.padding)) /
              (this.bounds.maxX - this.bounds.minX),
          y:
            this.padding +
            ((node.y - this.bounds.minY) * (this.height - 2 * this.padding)) /
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

<style scooped>
.svg-container {
  display: inline-block;
  position: relative;
  width: 100%;
  padding-bottom: 1%;
  vertical-align: top;
  overflow: hidden;
}

.node-network {
  stroke: #3a403d;
  stroke-width: 0.5px;
  fill: cornflowerblue;
}

.node-network:hover {
  stroke-width: 2px;
}
.node-line {
  stroke: black;
  stroke-width: 2;
}
</style>