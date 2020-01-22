<template>
  <div align="center">
    <container
      ref="container"
      :width="width"
      :height="height"
      :on-click="Reconfigure"
    >
      <g :id="groupId" />
    </container>
  </div>
</template>

<script>
import { ArraysObjective, Strings, StringsLatin } from "@mitevpi/algos";
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

import Container from "./SVG/Container.vue";

export default {
  name: "CirclePack",
  components: {
    Container
  },
  props: {
    // The name of the property in the dataset to use for defining "identity"
    xKey: String,
    // The name of the property in the dataset to use for defining scalar amounts
    yKey: String,
    // The desired width of the visualization
    width: Number,
    // The desired height of the visualization
    height: Number,
    // The array of data poitns to visualize
    nodes: Array
  },
  data: () => ({
    simulation: null,
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
    /**
     * @vuese
     * The maximum value in the core dataset.
     * @type Number
     */
    dataMax() {
      return ArraysObjective.max(this.nodes, this.yKey);
    },
    /**
     * @vuese
     * The minimum value in the core dataset.
     * @type Number
     */
    dataMin() {
      return ArraysObjective.min(this.nodes, this.yKey);
    },
    /**
     * @vuese
     * The unique identifier for the group of svg child elements created by this component.
     * @type String
     */
    groupId() {
      return StringsLatin.removeNonAlpha(Strings.createUniqueID());
    }
  },
  mounted() {
    // console.log(this.$refs.container.svgId);
    this.CreateSimulation();
    this.AddNodes(this.nodes);
    this.Simulate(this.nodes);
  },
  methods: {
    /**
     * @vuese
     * Create the force simulation which will animate the component.
     */
    CreateSimulation() {
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
    /**
     * @vuese
     * Add the nodes as svg circle elements to the DOM.
     */
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
    /**
     * @vuese
     * Initiate the simulation animation.
     */
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
    /**
     * @vuese
     * Randomize the positions of the circles on the screen.
     */
    Reconfigure() {
      const self = this;
      console.log(('hi'))
      this.nodes.map(node => {
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
.node-main {
  stroke: #3a403d;
  stroke-width: 0.5px;
}

.node-main:hover {
  stroke-width: 2px;
}
</style>
