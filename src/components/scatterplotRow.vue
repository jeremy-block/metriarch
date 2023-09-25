<template>

  <div class="scatterplot row cell"
        :class="computedClasses"
        :id="rowIDname" 
        :style="dynamicGridCSSRule">
    <span class="description">
      {{ getDescription }}
    </span>
    <p class="splomTitle"
    :class="isSelected? 'selectedRow': 'notSelectedRow'"
    @click="handleFacetClick([lockedDimension.x,yValue])">
      <mini-tooltip :text="getDescription" :functional="showDescriptionIcon" >
          <span :class="{ 'hideMe': !showDescriptionIcon }" ref="infoIcon">
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 16 16" width="10px" height="10px"><path d="M 7.5 1 C 3.917969 1 1 3.917969 1 7.5 C 1 11.082031 3.917969 14 7.5 14 C 11.082031 14 14 11.082031 14 7.5 C 14 3.917969 11.082031 1 7.5 1 Z M 7.5 2 C 10.542969 2 13 4.457031 13 7.5 C 13 10.542969 10.542969 13 7.5 13 C 4.457031 13 2 10.542969 2 7.5 C 2 4.457031 4.457031 2 7.5 2 Z M 7 4 L 7 5 L 8 5 L 8 4 Z M 7 6 L 7 11 L 8 11 L 8 6 Z"/></svg>
          </span>
          {{ config[yValue].name }}
      </mini-tooltip>
    </p>
      <mini-Scatterplot
      v-for="xValue in this.numericVariables" :key="xValue"
      class="cell"
      :class="xValue == lockedDimension.x ? 'selectedCol' : yValue == lockedDimension.y ? 'selectedRow': ''" 
      :data="data"
      :x="xValue"
      :y="yValue"
      :width="miniSize"
      :height="miniSize"
      :edge="miniPadding"
      :selectedSessionIndex="selectedIndex"
      @click="handleFacetClick([xValue,yValue])"
      />
  </div>
</template>

<script>
import {mapState, mapMutations } from "vuex";
import miniTooltip from "./fadeTooltip.vue";
import miniScatterplot from "./miniScatterplot.vue";

export default {
  name: "ScatterplotRow",
  components: {
    miniTooltip,
    miniScatterplot,
  },
  emits: ['metricChange'],
  props: {
    isSelected: false,
    yValue: "",
    showDescriptionIcon: Boolean,
  },
  data() {
    return {
      miniPadding: 12,
      miniSize: 70,
      rowIDname: this.yValue + "-row",
    };
  },
  computed: {
    ...mapState({
      data: state => state.data,
      config: state => state.config,
      numericVariables: state => state.numericColumnNames,
      lockedDimension: state => state.lockedDimension,
      selectedIndex: state => state.lockedData.selectedIndex,
    }),
    computedClasses() {
      return {
        "selectedRow": this.yValue === this.lockedDimension.y
      }
    },
    getNumericLength() {
      return this.numericVariables.length
    },
    dynamicGridCSSRule() {
      return `grid-template-columns: 8% 6% repeat(${this.getNumericLength}, 70px)`;
    },
    getDescription() {
      try {
        if (this.config == undefined) {
          return "undefined config file"
        } else {
          // console.log(this.yValue)
          return this.config[this.yValue]?.description || "nothing"
        }
      } catch (e) {
        console.log("no config", e)
        return "broken"
      }
    }
  },
  methods: {
        // ...mapMutations(['updateSelectedFacet']),
    // Facet select function that maintains URL Parameters instead of replaces all of them.
    handleFacetClick(selectedFacet) {
  // console.log(selectedFacet)
  let xDomain = selectedFacet[0]
  let yRange = selectedFacet[1]
  let query = { ...this.$route.query };
  //if already selected, then deselect
  if (
    query["xDomain"] == xDomain &&
    query["yRange"] == yRange
  ) {
    query["xDomain"] = undefined;
    query["yRange"] = undefined;
    this.$router.push({ query });        
    //otherwise, select new axies.
  } else {
    query["xDomain"] = xDomain
    query["yRange"] = yRange
    this.$router.push({ query });
  }
  this.$emit("metricChange", [xDomain, yRange])

},
  },
};
</script>

<style lang="scss" scoped>

.splomTitle{
  text-align: right;
  align-self: center;
  padding: 17% 4% 6% 0.6em;
  // padding-right: 3px;
  font-size: x-small;
    position: sticky;
    left: 0;
    z-index: 2;
    height: 100%;
    border-right: 3px var(--grey-600) solid;
    font-weight: 700;
    // white-space: nowrap; /* Prevent text from wrapping */
  // overflow: hidden; /* Hide the overflowing text */
  // text-overflow: ellipsis; /* Display an ellipsis (...) for overflow */
    // grid-row: span 1; /* Sticky header cell spans 1 column */
  }
  .notSelectedRow{
  background-color: #f2f2f2;
  font-weight: 400;

}
  .description {
    position: sticky;
    left: 0;
      font-size: x-small;
      font-weight: 300;
      text-align:left;
    padding: 0.3em;
    z-index: 0;
    text-overflow: ellipsis;
    grid-row: span 1;
  }
.row.scatterplot {
  display: grid;
  // transform: translate(4px,-4px); /*This centers the grid... not sure where the extranious gap rule is coming from... */
}

.miniScatterplot {
  padding: 2px;
  align-self: center;
  border-radius: 6px;
  border: 2px solid var(--dusty-rose-200)
}
.hideMe{
  // display: none !important;
    visibility: hidden; /* Preserve the space */

}
</style>
