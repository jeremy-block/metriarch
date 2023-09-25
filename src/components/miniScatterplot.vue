<template>
    <svg :class="this.x == this.$route.query.xDomain && this.y == this.$route.query.yRange ? 'theSelectedMiniPlot': ''"

    class="miniScatterplot" :style="{  width: width + 'px', height: height+ 'px' }" :id="plotName" ref="scatterplotSvg"></svg>
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
    selectedSessionIndex: {type: Number, default: -1}
  },
  data() {
    return {
      plotName: this.x + "_x_" + this.y,
      colIDname: this.x + "-col",
      padding: { top: parseFloat(this.edge), right: parseFloat(this.edge), bottom: parseFloat(this.edge), left: parseFloat(this.edge) },
      defaultColor: '#794c89',
      emphasisColor: '#D91C38',
    }
  },
  mounted() {
    this.renderScatterplot();
  },
  //   updated() {
  //   this.updateScatterplot();
  // },
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
        .domain([d3.min(this.data, d => parseFloat(d[this.x])), d3.max(this.data, d => parseFloat(d[this.x]))])
        .range([this.padding.left, this.width-this.padding.right]);

      const yScale = d3
        .scaleLinear()
        .domain([d3.min(this.data, d => parseFloat(d[this.y])), d3.max(this.data, d => parseFloat(d[this.y]))])
        .range([this.height - this.padding.bottom, this.padding.top]);

      // Create circles for each data point
      svg.selectAll('circle')
        .data(this.data)
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d[this.x])) //, (d) => d.x))
        .attr('cy', d => yScale(d[this.y]))
        .attr('r', this.r)
        .attr('fill', (d, i) => {
          if (i == this.selectedSessionIndex) {
            // console.log(i)
            return this.emphasisColor
          } else {
            return this.defaultColor
          }
        })
    },
    checkDotColors() {
      // console.log("🚀 ~ file: miniScatterplot.vue:93 ~ checkDotColors")
       const plotSelectorID = "#" + this.plotName
      const svg = d3.select(plotSelectorID); //this.$refs.scatterplotSvg);
      svg.selectAll('circle')
      .attr('fill', (d, i) => {
          if (i == this.selectedSessionIndex) {
            // console.log(i)
            return this.emphasisColor
          } else {
            return this.defaultColor
          }
        })
    },
    // updateScatterplot() { //I don't think we ever hit the update function.
    //   const plotSelectorID = "#" + this.plotName
    //   const svg = d3.select(plotSelectorID);  //this.$refs.scatterplot);

    //   // Update scatterplot using D3 functions
    //   svg.selectAll('circle')
    //     .exit().remove()

    //   svg.selectAll('circle')
    //     .data(this.data)
    //     .enter()
    //     .append('circle')
    //     .attr('cx', d => xScale(d[this.x])) //, (d) => d.x))
    //     .attr('cy', d => yScale(d[this.y]))
    //     .attr('r', this.r)
    //     .attr('fill','#794c89')
    // },
  },
  watch: {
    // data: {
    //   deep: true,
    //   handler() {
    //     this.updateScatterplot();
    //   },
    // },
    selectedSessionIndex: {
      immediate: true,
      deep: true,
      handler() {
        this.checkDotColors();
      }
    }
  },
};
</script>

<style lang="scss" scoped>
/* Can not seem to access circles from here... so just going to select the whole plot.*/
.theSelectedMiniPlot{
  background-color:rgb(243, 114, 234);
}

.miniScatterplot:hover{
  background-color: rgb(238, 184, 234);
}
</style>
