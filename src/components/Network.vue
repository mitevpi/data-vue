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
        :x1="computeX(link.source)"
        :y1="computeY(link.source)"
        :x2="computeX(link.target)"
        :y2="computeY(link.target)"
        class="network-link"
      />
    </g>

    <g>
      <circle
        v-for="(node, i) in graph.nodes"
        :key="i + 'circle'"
        class="network-node"
        :cx="computeX(node)"
        :cy="computeY(node)"
        :r="node[nodeSizeKey]"
        stroke="white"
        stroke-width="1"
        @mousedown="
          currentMove = { x: $event.screenX, y: $event.screenY, node: node }
        "
      />
    </g>
    <g v-if="nodeLabelKey" class="noselect">
      <text
        v-for="(node, i) in graph.nodes"
        :key="i + 'circle-label'"
        :x="computeX(node)"
        :y="computeY(node)"
        text-anchor="middle"
        alignment-baseline="middle"
        class="network-node-label"
      >
        {{ node[nodeLabelKey] }}
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
  forceY,
  forceCollide
} from "d3-force";

export default {
  name: "Network",
  props: {
    width: Number,
    height: Number,
    // The array of data objects to visualize
    graph: Object,
    // The name of the property in the dataset to define node scaling
    nodeSizeKey: String,
    // (Optional) The name of the property in the dataset to use as a node label
    nodeLabelKey: String,
    // (Optional) The color to apply on the nodes in the network
    nodeColor: String,
    // (Optional) The color to apply on the nodes in the network when hovered over
    nodeColorHover: String,
    // (Optional) The stroke width to apply on the nodes in the network
    nodeStrokeSize: Number,
    // (Optional) The stroke width to apply on the nodes in the network when hovered over
    nodeStrokeSizeHover: Number,
    // (Optional) The stroke color to apply on the nodes in the network
    nodeStrokeColor: Number,
    // (Optional) The stroke width to apply to the links between nodes in the network
    linkSize: Number,
    // (Optional) The stroke color to apply to the links between nodes in the network
    linkColor: String
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
        "--node-color-hover": this.nodeColorHover || this.nodeColor,
        "--node-stroke-size": this.nodeStrokeSize || 0.5,
        "--node-stroke-size-hover": this.nodeStrokeSizeHover || 2,
        "--node-stroke-color": this.nodeStrokeColor || "black",
        "--link-color": this.linkColor || "black",
        "--link-size": this.linkSize || 2
      };
    }
  },
  created() {
    this.simulation = forceSimulation(this.graph.nodes)
      .force(
        "charge",
        forceManyBody().strength(d => -100)
      )
      .force(
        "collide",
        forceCollide()
          .strength(0.05)
          .radius(d => {
            return d[this.nodeSizeKey];
          })
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
      this.currentMove = null;
      this.simulation.alpha(1);
      this.simulation.restart();
    },
    computeTruePadding(node) {
      return node[this.nodeSizeKey] + this.padding;
    },
    computeX(node) {
      const truePadding = this.computeTruePadding(node);
      return (
        truePadding +
        ((node.x - this.bounds.minX) * (this.width - 2 * truePadding)) /
          (this.bounds.maxX - this.bounds.minX)
      );
    },
    computeY(node) {
      const truePadding = this.computeTruePadding(node);
      return (
        truePadding +
        ((node.y - this.bounds.minY) * (this.height - 2 * truePadding)) /
          (this.bounds.maxY - this.bounds.minY)
      );
    }
  }
};
</script>

<style scoped lang="scss">
@import "../css/globals.scss";

.network-node {
  stroke: var(--node-stroke-color);
  stroke-width: var(--node-stroke-size);
  fill: var(--node-color);
}

.network-node-label {
}

.network-node:hover {
  stroke-width: var(--node-stroke-size-hover);
  fill: var(--node-color-hover);
}
.network-link {
  stroke: var(--link-color);
  stroke-width: var(--link-size);
}
</style>
