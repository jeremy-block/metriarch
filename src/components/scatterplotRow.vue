<template>

  <div class="scatterplot row"
        :class="computedClasses"
        :id="rowIDname" 
        :style="dynamicGridCSSRule">
    <h6 class="splomTitle">
      {{ this.yValue }}
    </h6>
      <mini-Scatterplot
      v-for="xValue in this.numericVariables" :key="xValue"
      :class="xValue == this.$route.query.xDomain ? 'selectedCol' : ''" 
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
    yValue: "",
  },
  data() {
    return {
      miniPadding: 12,
      miniSize: 70,
      rowIDname: this.yValue+"-row"
    };
  },
  computed: {
    ...mapState({
      data: state => state.data,
      numericVariables: state => state.numericColumnNames,
      selRowName: state => state.lockedDimension.y,
    }),
    computedClasses() {
      return {
        "selectedRow": this.yValue === this.selRowName
      }
    },
    getNumericLength() {
      return this.numericVariables.length
    },
    dynamicGridCSSRule() {
      return `grid-template-columns:repeat(${this.getNumericLength+1}, 1fr)`;
    },
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
      console.log(selectedFacet)
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
  padding-right: 3px;
  font-size: x-small;
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
