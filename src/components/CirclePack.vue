<template>
  <div class="svg-container" align="center">
    <svg :id="svgId" :width="width" :height="height" @click="Reconfigure">
      <g :id="groupId" />
    </svg>
  </div>
</template>

<script>
import { ArraysObjective } from "@mitevpi/algos";
import { select, selectAll, event } from "d3-selection";
import { drag } from "d3-drag";
import { transition } from "d3-transition";
import { scaleOrdinal } from "d3-scale";
import {
  forceSimulation,
  forceCenter,
  forceManyBody,
  forceCollide,
  forceX,
  forceY
} from "d3-force";

export default {
  name: "CirclePack",
  props: {
    xKey: String,
    yKey: String,
    width: Number,
    height: Number,
    nodes: Array
  },
  data: () => ({
    simulation: null,
    nodesComputed: null,
    color: scaleOrdinal([
      "#66c2a5",
      "#fc8d62",
      "#8da0cb",
      "#e78ac3",
      "#a6d854",
      "#ffd92f",
      "#e5c494",
      "#b3b3b3"
    ])
  }),
  computed: {
    dataMax() {
      return ArraysObjective.max(this.nodes, this.yKey);
    },
    dataMin() {
      return ArraysObjective.min(this.nodes, this.yKey);
    },
    groupId() {
      return Math.random()
        .toString(36)
        .substring(7);
    },
    svgId() {
      return Math.random()
        .toString(36)
        .substring(7);
    }
  },
  mounted() {
    this.CreateSimulation();
    this.AddNodes(this.$data.nodesComputed);
    this.Simulate(this.$data.nodesComputed);
  },
  methods: {
    CreateSimulation() {
      this.nodesComputed = this.nodes;
      this.simulation = forceSimulation()
        .force(
          "forceX",
          forceX()
            .strength(0.1)
            .x(this.width * 0.5)
        )
        .force(
          "forceY",
          forceY()
            .strength(0.1)
            .y(this.height * 0.5)
        )
        .force(
          "center",
          forceCenter()
            .x(this.width * 0.5)
            .y(this.height * 0.5)
        )
        .force("charge", forceManyBody().strength(-15));
      console.log("SIMULATION CREATED");
    },
    DragStarted(d) {
      if (!event.active) this.simulation.alphaTarget(0.03).restart();
      d.fx = d.x;
      d.fy = d.y;
    },
    Dragged(d) {
      d.fx = event.x;
      d.fy = event.y;
    },
    DragEnded(d) {
      if (!event.active) this.simulation.alphaTarget(0.03);
      d.fx = null;
      d.fy = null;
    },
    AddNodes(input) {
      const self = this;
      self.node = selectAll(`#${this.groupId}`)
        .selectAll("circle")
        .data(input)
        .enter()
        .append("circle")
        .attr("r", d => {
          return d[this.yKey];
        })
        .attr("fill", d => {
          return self.color(d[this.xKey]);
        })
        .attr("cx", d => {
          return d.x;
        })
        .attr("cy", d => {
          return d.y;
        })
        .attr("class", "node-main")
        .call(
          drag()
            .on("start", self.DragStarted)
            .on("drag", self.Dragged)
            .on("end", self.DragEnded)
        );
    },
    Simulate(input) {
      // let self = this;
      this.simulation
        .nodes(input)
        .force(
          "collide",
          forceCollide()
            .strength(0.5)
            .radius(d => {
              return d.r + 2.5;
            })
            .iterations(1)
        )
        .on("tick", _d => {
          select(`#${this.groupId}`)
            .selectAll("circle")
            .attr("cx", da => {
              return da.x;
            })
            .attr("cy", db => {
              return db.y;
            });
        });
    },
    Reconfigure() {
      const self = this;

      this.nodesComputed.map(node => {
        node.x = (self.width / 2) * Math.random();
        node.y = (self.height / 2) * Math.random();
      });

      // selectAll("circle")
      //   .transition()
      //   .duration(1000)
      //   .attr("cx", (d, i) => {
      //     const identity = self.nodesComputed.filter(n => n.id === d.id)[0];
      //     const dimension = self.width / 2 + Math.random() * (i * 1.25);
      //     return dimension;
      //   })
      //   .attr("cy", (d, i) => {
      //     return self.height / 2 + Math.random() * (i * 1.25);
      //   });
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

.node-main {
  stroke: #3a403d;
  stroke-width: 0.5px;
}

.node-main:hover {
  stroke-width: 2px;
}
</style>
