<script>
import { mapState } from "vuex";
import * as d3 from "d3";

export default {
    name: "SPLOM",
    components: {},
    props: {},
    data() {
        return {
            // Specify the chart’s mainChartProps.
            width: 928,
            height: this.width,
            padding: 28,
            columns:[],
            size: 0, //(this.width - (this.columns.length + 1) * this.padding) / this.columns.length + this.padding,

        };
    },
    computed: {
        ...mapState({
        data: (state) => state.data,
        }),
    },
    mounted() {
        
        let canvas = d3.select("#selectionPlot").attr("width", this.width).attr("height", this.height);
        const g = canvas.append("g");

        // Define the horizontal scales (one for each row).
        const x = this.columns.map(c => d3.scaleLinear()
            .domain(d3.extent(data, d => d[c]))
            .rangeRound([padding / 2, size - padding / 2]))

        // Define the companion vertical scales (one for each column).
        const y = x.map(x => x.copy().range([size - padding / 2, padding / 2]));

        // Define the color scale.
        const color = d3.scaleOrdinal()
            .domain(this.data.map(d => d.section))
            .range(d3.schemeCategory10);

        // Define the horizontal axis (it will be applied separately for each column).
        const axisx = d3.axisBottom()
            .ticks(6)
            .tickSize(this.size * this.columns.length);
        const xAxis = g => g.selectAll("g").data(x).join("g")
            .attr("transform", (d, i) => `translate(${i * size},0)`)
            .each(function (d) { return d3.select(this).call(axisx.scale(d)); })
            .call(g => g.select(".domain").remove())
            .call(g => g.selectAll(".tick line").attr("stroke", "#ddd"));

        // Define the vertical axis (it will be applied separately for each row).
        const axisy = d3.axisLeft()
            .ticks(6)
            .tickSize(-this.size * this.columns.length);
        const yAxis = g => g.selectAll("g").data(y).join("g")
            .attr("transform", (d, i) => `translate(0,${i * size})`)
            .each(function (d) { return d3.select(this).call(axisy.scale(d)); })
            .call(g => g.select(".domain").remove())
            .call(g => g.selectAll(".tick line").attr("stroke", "#ddd"));

        const svg = d3.create("svg")
            .attr("width", this.width)
            .attr("height", this.height)
            .attr("viewBox", [-this.padding, 0, this.width, this.height]);

        svg.append("style")
            .text(`circle.hidden { fill: #000; fill- opacity: 1; r: 1px;`);

        svg.append("g")
            .call(xAxis);

        svg.append("g")
            .call(yAxis);

        const cell = svg.append("g")
            .selectAll("g")
            .data(d3.cross(d3.range(this.columns.length), d3.range(this.columns.length)))
            .join("g")
            .attr("transform", ([i, j]) => `translate(${i * this.size},${j * this.size})`);

        cell.append("rect")
            .attr("fill", "none")
            .attr("stroke", "#aaa")
            .attr("x", this.padding / 2 + 0.5)
            .attr("y", this.padding / 2 + 0.5)
            .attr("width", this.size - this.padding)
            .attr("height", this.size - this.padding);

        cell.each(function ([i, j]) {
            d3.select(this).selectAll("circle")
                .data(data.filter(d => !isNaN(d[columns[i]]) && !isNaN(d[columns[j]])))
                .join("circle")
                .attr("cx", d => x[i](d[columns[i]]))
                .attr("cy", d => y[j](d[columns[j]]));
        });

        const circle = cell.selectAll("circle")
            .attr("r", 3.5)
            .attr("fill-opacity", 0.7)
            .attr("fill", d => color(d.section));

        svg.append("g")
            .style("font", "bold 10px sans-serif")
            .style("pointer-events", "none")
            .selectAll("text")
            .data(this.columns)
            .join("text")
            .attr("transform", (d, i) => `translate(${i * size},${i * size})`)
            .attr("x", this.padding)
            .attr("y", this.padding)
            .attr("dy", ".71em")
            .text(d => d);

        return Object.assign(svg.node(), { scales: { color } });
    }
}
</script>
<template>
    <div class="Scatterplot" ref="container">
        <div v-if="!isLoaded">Loading...</div>
        <div class="chart-header">
            <h2>Selections</h2>
        </div>
        <svg id="selectionPlot"></svg>
    </div>
</template>
<style>
</style>