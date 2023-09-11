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
      {{ config[yValue].name }}
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
      @click="handleFacetClick([xValue,yValue])"
      />
  </div>
</template>

<script>
import {mapState, mapMutations } from "vuex";
import miniScatterplot from "./miniScatterplot.vue";

export default {
  name: "ScatterplotRow",
  components: {
    miniScatterplot
  },
  emits: ['metricChange'],
  props: {
    isSelected: false,
    yValue: "",
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
    /* 
    //Alternative Facet select function that maintains other URL Parameters.
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
*/
    handleFacetClick(selectedFacet) {
      // console.log(selectedFacet)
      let xDomain = selectedFacet[0]
      let yRange = selectedFacet[1]
      // this.updateSelectedFacet(selectedFacet);
      //todo: may need to keep other elements of the query selected before pushing new things or changing. Not sure if this feature is better or not
      this.$router.push({ query: { xDomain, yRange } });
      this.$emit("metricChange", [xDomain, yRange])
    },
  },
  watch: {
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
  overflow: hidden; /* Hide the overflowing text */
  text-overflow: ellipsis; /* Display an ellipsis (...) for overflow */
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
</style>
