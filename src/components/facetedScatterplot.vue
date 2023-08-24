<template>
  <div id="splom"
  :style="dynamicGridCSSRule">
      <div class="scatterplot row" id="splomTopTitles"
      :style="dynamicGridCSSRulePlus">
      <h6></h6>
      <!-- :class="this.computedClasses[xValue]" -->
      <h6 v-for="xValue in this.numericVariables" 
      class="Axis__tick"
       :class="xValue == this.$route.query.xDomain ? 'selectedCol' : ''" 
       :key="xValue">
        {{xValue}}
      </h6>
    </div>
    <scatterplot-row v-for="yValue in numericVariables" :key="yValue" :yValue="yValue" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ScatterplotRow from './ScatterplotRow.vue';

export default {
  data() {
    return {
    };
  },
  components: {
    ScatterplotRow,
  },
  computed: {
    ...mapState({
      numericVariables: (state) => state.numericColumnNames,  
      // selColName: (state) => state.lockedDimension.x,
    }),
    getNumericLength() {
      return this.numericVariables.length
    },
    dynamicGridCSSRulePlus() {
      return `grid-template-columns:repeat(${this.getNumericLength + 1}, 1fr)`;
    },
    dynamicGridCSSRule() {
      return `grid-template-rows: 45px repeat(${this.getNumericLength}, 1fr)`;
    },
  },
  methods: {
  },
};
</script>

<style lang="scss">
#splom {
    border-radius: var(--border-radius);
    background-color: var(--background-color);
    max-height: 550px;
    max-width: 550px;
    overflow: auto;
    display:grid;
}
#splomTopTitles{
  height: 25px;
  text-align: center;
  display: grid;
}
.selectedRow{
  background-color: thistle;
}
.selectedCol {
  background-color: rgb(231, 189, 231); /* Highlight color */
}

</style>
