<template>
    <svg class="miniScatterplot" :style="{  width: width + 'px', height: height+ 'px' }" :id="plotName" ref="scatterplotSvg"></svg>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: "miniScatterplot",
  components: {
    
  },
  props: {
    data: Array,
    x: {type: String, default: ""},
    y: {type: String, default: ""},
    r: { type: Number, default: 2},
    width: {type: Number, default: 50},
    height: { type: Number, default: 50 },
    edge: { type: Number, default: 5 }, //how many pixels from the edge of the scatter plot?
  },
  data() {
    return {
      plotName: this.x + "_x_" + this.y,
      colIDname: this.x + "-col",
      padding: { top: this.edge, right: this.edge, bottom: this.edge, left: this.edge },      
    }
  },
  mounted() {
    this.renderScatterplot();
  },
    updated() {
    this.updateScatterplot();
  },
  methods: {
    //todo: - Would call these functions if they were recognized by the time the component is mounting. I think theres an issue with lifecycle timing of these functions.
    // xScale(variable) { 
    //   // Create an x-scale for the given variable
    //   return d3
    //     .scaleLinear()
    //     .domain(d3.extent(this.data, (d) => d[variable]))
    //     .range([
    //       this.padding.left,
    //       this.width - this.padding.right - this.padding.left,
    //     ]);
    // },
    // yScale(variable) {
    //   // Create a y-scale for the given variable
    //   return d3
    //     .scaleLinear()
    //     .domain(d3.extent(this.data, (d) => d[variable]))
    //     .range([
    //       this.height - this.padding.bottom - this.padding.top,
    //       this.padding.top,
    //     ]);
    // },
    renderScatterplot() {
      const plotSelectorID = "#" + this.plotName
      const svg = d3.select(plotSelectorID); //this.$refs.scatterplotSvg);

      // Create scales based on provided dimensions
      const xScale = d3
        .scaleLinear()
        .domain([d3.min(this.data, d => d[this.x]), d3.max(this.data, d => d[this.x])])
        .range([this.padding.left, this.width-this.padding.right]);

      const yScale = d3
        .scaleLinear()
        .domain([d3.min(this.data, d => d[this.y]), d3.max(this.data, d => d[this.y])])
        .range([this.height - this.padding.bottom, this.padding.top]);

      // Create circles for each data point
      svg.selectAll('circle')
        .data(this.data)
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d[this.x])) //, (d) => d.x))
        .attr('cy', d => yScale(d[this.y]))
        .attr('r', this.r)
    },
    updateScatterplot() {
      const plotSelectorID = "#" + this.plotName
      const svg = d3.select(plotSelectorID);  //this.$refs.scatterplot);

      // Update scatterplot using D3 functions
      svg.selectAll('circle')
        .exit().remove()

      svg.selectAll('circle')
        .data(this.data)
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d[this.x])) //, (d) => d.x))
        .attr('cy', d => yScale(d[this.y]))
        .attr('r', this.r)
    },
  },
  watch: {
    data: {
      deep: true,
      handler() {
        this.updateScatterplot();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
/* Add your component styles here */
circle{
  fill:var(--circles)
}
.miniScatterplot {
  background-color: var(--dusty-rose-200);
}

</style>
