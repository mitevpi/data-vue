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
        :x1="link.source.cx"
        :y1="link.source.cy"
        :x2="link.target.cx"
        :y2="link.target.cy"
        :stroke-width="link.strokeWidth"
        class="network-link"
      />
    </g>

    <g>
      <circle
        v-for="(node, i) in graph.nodes"
        :key="i + 'circle'"
        class="network-node"
        :cx="node.cx"
        :cy="node.cy"
        :r="node.radius"
        stroke="white"
        :stroke-width="node.strokeWidth"
        @mousedown="
          currentMove = { x: $event.screenX, y: $event.screenY, node: node }
        "
      />
    </g>
    <g v-if="nodeLabelKey" class="noselect">
      <text
        v-for="(node, i) in graph.nodes"
        :key="i + 'circle-label'"
        :x="node.cx"
        :y="node.cy"
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
import { NetworkNodes } from "../js/NetworkNodes";
import { NetworkLinks } from "../js/NetworkLinks";

export default {
  name: "Network",
  props: {
    // Chart width
    width: Number,
    // Chart height
    height: Number,
    // The array of data objects to visualize
    graph: Object,
    // (Optional) The name of the property in the dataset to define node scaling, or a static number
    nodeSize: String,
    // (Optional) The name of the property in the dataset to use as a node label
    nodeLabelKey: String,
    // (Optional) The color to apply on the node labels in the network,
    nodeLabelColor: String,
    // (Optional) The color to apply on the nodes in the network
    nodeColor: String,
    // (Optional) The color to apply on the nodes in the network when hovered over
    nodeColorHover: String,
    // (Optional) The stroke width to apply on the nodes in the network
    nodeStrokeSize: String,
    // (Optional) The stroke width to apply on the nodes in the network when hovered over
    nodeStrokeSizeHover: Number,
    // (Optional) The stroke color to apply on the nodes in the network
    nodeStrokeColor: String,
    // (Optional) The stroke width to apply to the links between nodes in the network
    linkSize: String,
    // (Optional) The stroke color to apply to the links between nodes in the network
    linkColor: String
  },
  data: () => ({
    padding: 5,
    simulation: null,
    currentMove: null,
    networkLinks: null,
    networkNodes: null
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
        "--node-stroke-size-hover": this.nodeStrokeSizeHover || 2,
        "--node-stroke-color": this.nodeStrokeColor || "black",
        "--link-color": this.linkColor || "black",
        "--node-label-color": this.nodeLabelColor || "black"
      };
    }
  },
  watch: {
    bounds(val) {
      this.networkNodes.bounds = val;
      this.graph.nodes.map(node => {
        node.cx = this.networkNodes.ComputeX(node, this.width);
        node.cy = this.networkNodes.ComputeY(node, this.height);
      });
    }
  },
  mounted() {
    this.networkLinks = new NetworkLinks(this.linkSize);
    this.networkNodes = new NetworkNodes(
      this.nodeSize,
      this.nodeStrokeSize,
      this.padding,
      this.bounds
    );
    this.computeGraphProps();
    this.simulation = forceSimulation(this.graph.nodes)
      .force("charge", forceManyBody().strength(-100))
      .force(
        "collide",
        forceCollide()
          .strength(0.05)
          .radius(node => {
            return node.radius;
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
    computeGraphProps() {
      this.graph.nodes.map(node => {
        node.radius = this.networkNodes.ComputeSize(node);
        node.strokeWidth = this.networkNodes.ComputeStrokeSize(node);
      });
      this.graph.links.map(link => {
        link.strokeWidth = this.networkLinks.ComputeSize(link);
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "../css/globals.scss";

.network-node {
  stroke: var(--node-stroke-color);
  fill: var(--node-color);
}

.network-node-label {
  fill: var(--node-label-color);
}

.network-node:hover {
  stroke-width: var(--node-stroke-size-hover);
  fill: var(--node-color-hover);
}
.network-link {
  stroke: var(--link-color);
}
</style>
