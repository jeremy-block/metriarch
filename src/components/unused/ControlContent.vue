<script>
import { mapState } from "vuex";
import * as d3 from "d3";
export default {
    name: "ControlContent",
    components: {},
    props: {},
    data() {
        return {
            shouldShowControls: true,
        };
    },
     computed: {
        ...mapState({
            // lockedData: state => state.lockedData,
            // sessions: state => state.sessions,
            data: state => state.data,
            // selection: state => state.selection,
            // mainChartProps: state => state.mainChartProps,
            // chapterColors: state => state.chapterColors,
        }),
        
    },
    methods: {
        changeRoute(session) { return session }
    },
    mounted() {
        // function mountUpdate(qwer) {
            
            const width = 800;
            const height = 300;
            const margin = { top: 20, right: 20, bottom: 20, left: 40 };
            const data = this.data; //qwer
            const svg = d3.select("#selectionPlot")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom) // add 25 to accommodate the x axis labels
            .attr("stroke", "pink"); // set current color to pink
            const g = svg.append("g");
            const xAxisValue = 8
            const yAxisValue = 7
            const xPropName = Object.keys(data[0])[xAxisValue]
            const yPropName = Object.keys(data[0])[yAxisValue]
            console.log(d3.max(data, d => Object.keys(d)))
            
            
            // 3. Creating the Chart Axes
            const xScale = d3
            .scaleLinear()
            .domain(
                [d3.min(data, d=>d[xPropName]),d3.max(data, d => d[xPropName])]//d3.extent(data, function (d) {
                    // return d[xPropName];
                // })
                )
                .range([margin.left, width-margin.right]);
                
            const yScale = d3
            .scaleLinear()
                .domain([0, (d3.max(data, d => {
                    // console.log("difficult");
                    return d[yPropName]
                }))])
                // d3.extent(data, function (d) {
                    //     return d.page;
                    // })
                    // )
                .range([height-margin.bottom, margin.top]);
                
                
           
                    // 6. Appending scatter plot circles to the Chart
            g.selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("cx", d => xScale(d[xPropName])+20+margin.left+margin.left)
            .attr("cy", d => yScale(d[yPropName]))
            .attr("r", 2) // radius of the circle
            .style("fill", "pink") // color of the circle
            // .append("text")
            // .attr("fill","black")   
            // .text(d=>d.session)
            
            // 5. Appending the Axes to the Chart
            svg.append("g")
            .attr("transform", "translate("+margin.left+"," + (height-margin.bottom) + ")")
            .call(d3.axisBottom(xScale))
            // .append("text")
            .attr("fill", "pink")
            // .attr("font-size", 10)
            // .attr("x", "11em")
            // .attr("y", -6)
            .attr("text-anchor", "start")
            // .text("Time (t)");
            
            svg.append("g")
            .attr("transform","translate("+(margin.left+margin.left)+",0)")
            .call(d3.axisLeft(yScale))
            // .append("text")
            .attr("fill", "pink")
            // .attr("transform", "rotate(-90)")
            // .attr("y", 6)
            // .attr("dy", "0.71em")
            // .attr("text-anchor", "end")
            // .text("Price ($)");

            svg.append("text")
            .attr("x", width / 2)
            .attr("y", height+20 )
                .attr("text-anchor", "middle")
            .style("fill", "black")
            .text(Object.keys(data[0])[xAxisValue]);
            
            svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2)
            .attr("y", margin.left )
            .attr("text-anchor", "middle")
            .text(Object.keys(data[0])[yAxisValue]);
            
        // }
    // mountUpdate(this.data)
    },
};
</script>
<template>
  <svg id="selectionPlot"></svg>
</template>
<style scoped>
  .font-semibold{
    font-weight: 600;
  }
  .text-xl{
    font-size: 1.25rem; /* 20px */
    line-height: 1.75rem; /* 28px */
  }
  .no-wrap{
    white-space: nowrap;
  }
</style>