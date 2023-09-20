<template>
  <div id="splom"
  :style="dynamicGridCSSRule"
  @scroll="showDescIcon()"
  ref="splomComponent">
    <div class="scatterplot row cell" id="splomTopTitles"
      :style="dynamicGridCSSRulePlus">
      <h6 class="Axis__tick">Description</h6>
      <h6 class="Axis__tick splomTitle">Metric</h6>
      <!-- :class="this.computedClasses[xValue]" -->
      <h6 v-for="xValue in this.numericVariables" 
        class="Axis__tick"
       :class="xValue == this.$route.query.xDomain ? 'selectedCol' : ''" 
       :key="xValue"
       @click="handleFacetClick([xValue, lockedDimension.y])"
       >
        {{config[xValue].name}}
      </h6>
    </div>
    <scatterplot-row v-for="yValue in numericVariables" :key="yValue" :yValue="yValue" :isSelected="lockedDimension.y === yValue" :showDescriptionIcon="miniTooltipVisable"/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ScatterplotRow from './ScatterplotRow.vue';

export default {
  data() {
    return {
      miniTooltipVisable:false
    };
  },
  components: {
    ScatterplotRow,
  },
  computed: {
    ...mapState({
      numericVariables: (state) => state.numericColumnNames,  
      lockedDimension: state => state.lockedDimension,
      config: state => state.config
    }),
    getNumericLength() {
      return this.numericVariables.length
    },
    dynamicGridCSSRulePlus() {
      return `grid-template-columns: 8% 6% repeat(${this.getNumericLength+3 }, 70px)`;
    },
    dynamicGridCSSRule() {
      return `grid-template-rows: 12% repeat(${this.getNumericLength}, 1fr)`;
    },
  },
  methods: {
        handleFacetClick(selectedFacet) {
      // console.log(selectedFacet)
      let xDomain = selectedFacet[0]
      let yRange = selectedFacet[1]
      // this.updateSelectedFacet(selectedFacet);
      //todo: may need to keep other elements of the query selected before pushing new things or changing. Not sure if this feature is better or not
      this.$router.push({ query: { xDomain, yRange } });
      this.$emit("metricChange", [xDomain, yRange])
    },
    showDescIcon() {
      // Define the threshold for showing the element
      const threshold = 200; // Adjust this value as needed
      const elem = this.$refs.splomComponent
      // Check the scroll position
      if (elem.scrollLeft > threshold) {
        this.miniTooltipVisable = true;
      } else {
        this.miniTooltipVisable = false;
      }
    },
  },
};
</script>

<style lang="scss">
#splom {
  position: relative;
    overflow: auto;
    display: grid;
    // grid-template-columns: auto repeat(4, 1fr); /* Adjust the number of columns as needed */
    // grid-gap: 1px;
    background-color: var(--dusty-rose-200);
    padding: 0em 0.6em 0.6em 0em;
    // border-radius: var(--border-radius);
    // background-color: var(--background-color);
    max-height: 50vh;
    overflow: auto;
    border-radius: var(--border-radius);
    // display:grid;
}
.cell {
      // padding: 10px;
    // width: 50px;
    // height: 50px;
    text-align: center;
    z-index: 1;
    border: 1px solid var(--grey-400);
    background-color: #f2f2f2;
}

#splomTopTitles{
  display: grid;
  position: sticky;
  top: 0;
  z-index: 3;
  // grid-column: span 1; /* Sticky header cell spans 1 column */
  text-align: center;
  align-content: center;
  //  overflow: hidden; /* Hide the overflowing text */
  // text-overflow: ellipsis; /* Display an ellipsis (...) for overflow */
}
#splomTopTitles h6{
  // transform: rotate(20deg);
  // max-width: 100px;
  // text-overflow: clip;
  align-self: baseline;
  height: 60%;
  padding: 1.6em 0em 0em 0em;
  position: relative;
  transform: translate(0px, -14%);
}
.selectedRow{
  background-color: thistle;
}
.selectedCol {
  background-color: rgb(231, 189, 231); /* Highlight color */
}

</style>
