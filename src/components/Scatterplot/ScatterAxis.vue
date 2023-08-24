<script>
import { mapState } from "vuex";
import { max, scaleLinear } from "d3";
export default {
    name: "ScatterAxis",
    components: {},
    props: {
        mainChartProps: {
            type: Object,
            required: true,
        },
        orientation: {
            type: String,
            required: true,
            default: "x",
        },
        propertyName: {
            type: String,
            required: true,
            default: "x",
        },
        label: {
            type: String,
            default: "Selected Dimention",
        },
        units: {
            type: Function,
            default: (d) => { 
                if (d == 1) {
                    return "unit"
                } else {
                    return "units"
                }
            }
        },
        numberOfTicks: {
            type: Number,
            default: 10,
        },
        minorsPerTick: {
            type: Number,
            default: 3,
        },
    },
    data() {
        return {
            arrowSize: 10,
            yArrowOffset: 7,
            labelPlateMultiplier: 11,
            xTickOffset: 50,
            xRuleDistance: 12,
            //helper function to select for a particular property in an object.
            //get floats for the value so they are interpreted as numbers and not just strings.
            getObjValue: (obj, property) => parseFloat(obj[property]),
            // function to get a list of values associated with a dataArray's property - "Get a column" function
            accessor: (dataArray, accessorFunction, property) => {
                return dataArray.map(obj => accessorFunction(obj, property));
            },
        };
    },
    computed: {
        ...mapState({
            //Grabbing the main hunk of data to do all the scaling calculations.
            data: state => state.data,
        }),
        valueMax() {
            //get the maximum value for the specified property name.
            const maximumValue = max(this.accessor(this.data, this.getObjValue, this.propertyName))
            return maximumValue
        },
        ticks() {
            //Array of values to represet each major tick mark
            const labelStep = this.valueMax / this.numberOfTicks
            // console.log("amount between ticks", labelStep)
            const output = [];
            for (let index = 1; index < this.numberOfTicks; index++) {
                output.push(labelStep*index)
            }
            return output
        },
        minorTicks() {
            //array of values for each minor tick mark
            const numOfMinorTicks = this.minorsPerTick;
            const typicalStep = this.valueMax / this.numberOfTicks
            const minorStep = typicalStep / numOfMinorTicks
            const totalMinorTicks = this.numberOfTicks*numOfMinorTicks
            const output = [];

            //include a minor tick on the origin
            // also each metric is designed to begin at 0
            output.push(0)
            for (let count = 1; count < totalMinorTicks; count++){
                output.push(count*minorStep)
            }
            return output
        },
        xScale() {
            return scaleLinear()
                .domain([0, this.valueMax])
                .range([0, this.mainChartProps.boundedWidth]);
        },
        yScale() {
            return scaleLinear()
                .domain([0, this.valueMax])
                .range([this.mainChartProps.boundedHeight, 0]);
        },
    },
}
</script>
<template>
    <g class="Axis AxisHorizontal" v-if="orientation == 'x'"
        :style="{ transform: `translate(0, ${mainChartProps.boundedHeight}px)` }">
        <!-- Horizontal Axis line -->
        <g>
            {/* Horiz Arrow Top */}
            <line :x1="`${mainChartProps.boundedWidth}`" :x2="`${mainChartProps.boundedWidth - arrowSize - 3}`" :y1="2"
                :y2="-arrowSize - 2" class="Axis__arrow Axis__line Axis__line--left horiz" />

            {/* Horiz Arrow Bottom */}
            <line :x1="`${mainChartProps.boundedWidth}`" :x2="`${mainChartProps.boundedWidth - arrowSize - 3}`" :y1="-2"
                :y2="arrowSize + 1" class="Axis__arrow Axis__line Axis__line--right horiz" />

            <line class="Axis__line" :x1="-xRuleDistance - 1.5" :x2="mainChartProps.boundedWidth" />
        </g>

        <!--  minor ticks - vertical lines along x axis -->
        <line v-for="tick in minorTicks" :key="tick" class="Grid__rules" :y1="-mainChartProps.boundedHeight"
            :x1="xScale(tick)" :x2="xScale(tick)" />
        <!-- Major ticks - vertical lines along x axis -->
        <line v-for="(tick) in ticks"
            :style="{
                //  opacity: mainChartProps.boundedWidth < 900 && i % 2 == 0 ? 0 : 1 
            }" :key="tick"
            :class="tick == 5 ? `Grid__rules` : `Grid__section-delineator`" :y1="-mainChartProps.boundedHeight"
            :y2="xTickOffset" :x1="xScale(tick)" :x2="xScale(tick)" />

        <!-- Labels for horizontal axis -->
        <g v-for="(tick, i) in ticks" :key="tick" :style="{
            transform: `translate(${xScale(tick)}px, ${xTickOffset}px)`,
            // opacity: mainChartProps.boundedWidth < 900 && i % 2 == 0 ? 0 : 1
        }">
            <text :style="{ transform: `translate(5px, 0)` }" class="Axis__tick x-tick">
                {{ ticks[i].toFixed(3) }}
                {{ units(ticks[i]) }}
                <!-- <template v-if="ticks[i] == 5">
                    {{ ` min` }}
                </template>
                <template v-else>
                    &#8202; hour{{ ticks[i] != 1 ? `s` : "" }}
                </template>

                {{ ticks[i] == 12 ? ` +` : "" }} -->
            </text>
        </g>

        <!-- Hoizontal Axis label -->
        <g class="Axis__label__wrapper" :style="{ transform: `translate(0px, 4px)` }">
            <rect class="label-plate" :width="labelPlateMultiplier * label.length" :height="xRuleDistance + 12" :style="{
                transform: `translate(3px, -13px)`,
            }" />
            <text :style="{
                transform: `translate(5px, 0px)`,
            }" class="Axis__label x-axis">
                {{ label }}
            </text>
        </g>
    </g>
    <g class="Axis AxisVertical" v-if="orientation == 'y'" >
        {/* Y axis Arrow */}
        <g :style="{ transform: `translate(0, ${yArrowOffset})px` }">
            {/* Vert Arrow Left */}
            <line :x1="0-arrowSize * 2.5" :y1="arrowSize*1.5" :x2="0-arrowSize-2.5"
                :y2="0"
                class="Axis__arrow Axis__line Axis__line--left vert" />

            {/* Vert Arrow Right */}
            <line :x1="0 -2.5" :y1="arrowSize * 1.5" :x2="0-xRuleDistance-2.5"
                    :y2="0"
                    class="Axis__arrow Axis__line Axis__line--right vert" />
            <line class="Axis__line" :x1="-xRuleDistance - 2" :y1="0" :x2="-xRuleDistance - 2"
                :y2="mainChartProps.boundedHeight+2.5" />
        </g>
        {/* Horizontal lines */}

        <line v-for="tick in minorTicks" :key="tick" class="Grid__rules" :x1="-xRuleDistance"
            :x2="mainChartProps.boundedWidth" :y1="yScale(tick)" :y2="yScale(tick)" /> 

        <!-- Horizontal background colors -->
        <rect v-for="(tick, i) in ticks" :key="i" class="Grid__stripe" :width="mainChartProps.boundedWidth + xRuleDistance"
            :height="yScale(valueMax - valueMax/numberOfTicks)" :y="yScale(ticks[i+1])" :x="-xRuleDistance" />

        <!-- Hoizontal lines that expand beyond the y axis - major ticks -->
        <template v-for="tick in ticks" :key="tick">
            <line v-if="tick != 1 && tick != 6" class="Grid__section-delineator" :x1="-mainChartProps.marginLeft"
                :x2="mainChartProps.boundedWidth" :y1="yScale(tick)" :y2="yScale(tick)" />
        </template>

        <text v-for="(tick, i) in ticks" :key="i" class="Axis__tick Axis__tick--difficulty" :style="{
            transform: `translate(
                        ${-xRuleDistance - mainChartProps.marginLeft/4*3 }px,
                        ${yScale(tick) + 3 - (yScale(ticks[0]) - yScale(ticks[1])) / 6 }px)`,
        }">
         {{ ticks[i].toFixed(1) }}
         </text>
         
         {*/ units for the axis */}
         <text v-for="(tick, i) in ticks" :key="i" class="Axis__tick Axis__tick--difficulty" :style="{
            transform: `translate(
                        ${-xRuleDistance - mainChartProps.marginLeft / 4 * 3 }px,
                        ${yScale(tick) + 3 -(yScale(ticks[0]) - yScale(ticks[1])) / 11 }px)`,
         }">
         {{ units(ticks[i]) }}
         </text>
            <!-- {{ tick == 1 ? "" : tick - 1 }} -->

        {/* yaxis label */}
        <g class="Axis__label__wrapper" :style="{
            transform: `translate(
                ${-10}px, 
                ${mainChartProps.boundedHeight - xRuleDistance}px) 
                rotate(-90deg)`,
        }">
            <rect class="label-plate" :width="labelPlateMultiplier * label.length" :height="xRuleDistance" :style="{
                transform: `translate(
                    1px, 
                    ${-xRuleDistance / 2 - 4}px)`,
            }" />
            <text :style="{ transform: `translate(7px, 0px)` }" class="Axis__label">
                {{ label }}
            </text>
        </g>
    </g>
</template>

<style lang="scss">
.Axis {
    .label-plate {
        fill: var(--background-color);
    }
}
</style>
