<!--Generates a scatterplot with vue component nodes instead of d3. -->
<!-- todo: make multiple scatterplots instead of just one. -->

<script>
import { mapState } from "vuex";
import * as d3 from "d3";



export default {
  name: "VueScatterplot",
  computed: {
    ...mapState({
      data: (state) => state.data,
    }),
    numericVariables() {
      // Filter and return only the numeric variables from your data object
      const numericVars = Object.keys(this.data[0]).filter(
        (key) => {
          // console.log(parseFloat(this.data[0][key]), isNaN(parseFloat(this.data[0][key])))
          return !isNaN(parseFloat(this.data[0][key]))
        }
      );
      console.log(numericVars)
      return numericVars;
    },
  },
  data() {
    return {
      width: 800,
      height: 800,
      cellPadding: 2,
      cellSize:30,
      circleRadius: 5,
      circleColor: "steelblue",
      margin: { top: 20, right: 20, bottom: 20, left: 20 },
    };
  },
  methods: {
    xScale(variable) {
      // Create an x-scale for the given variable
      return d3
        .scaleLinear()
        .domain(d3.extent(this.data, (d) => d[variable]))
        .range([
          this.margin.left,
          this.width - this.margin.right - this.margin.left,
        ]);
    },
    yScale(variable) {
      // Create a y-scale for the given variable
      return d3
        .scaleLinear()
        .domain(d3.extent(this.data, (d) => d[variable]))
        .range([
          this.height - this.margin.bottom - this.margin.top,
          this.margin.top,
        ]);
    },
  },
  mounted() {
    // Your D3 code for drawing axes, labels, etc. can be added here
  },
};
</script>

<template>
  <div class="scatterplot-matrix">
    <svg :width="width" :height="height">
      <g v-for="(rowVar, rowIndex) in numericVariables" :key="rowIndex">
        <g v-for="(colVar, colIndex) in numericVariables" :key="colIndex">
          <g
            :key="`facet-${rowVar}-${colVar}`"
            :transform="`translate(${colIndex * (cellSize + cellPadding)}, ${rowIndex * (cellSize + cellPadding)})`"
          >
            <circle
              v-for="(dataPoint, dataIndex) in data"
              :key="`circle-${dataIndex}`"
              :cx="xScale(rowVar)(dataPoint[rowVar])"
              :cy="yScale(colVar)(dataPoint[colVar])"
              :r="circleRadius"
              :fill="circleColor"
            />
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>

<style>
.scatterplot-matrix {
  /* Add your CSS styling for the component container here */
  padding: 3em;
}
</style>
