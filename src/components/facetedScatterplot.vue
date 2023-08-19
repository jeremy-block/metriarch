<template>
  <div id="splom">
      <div class="scatterplot row" id="splomTopTitles">
      <h6></h6>
      <!-- :class="this.computedClasses[xValue]" -->
      <h6 v-for="xValue in this.numericVariables" 
      
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
    // computedClasses() {
    //   const output = []
    //   for (const colName in this.numericVariables) {
    //     // console.log(this.numericVariables[colName])
    //     if (this.numericVariables[colName] === this.selColName) {
    //       output.push("selectedCol")
    //     } else {
    //       output.push("not")
    //     }
    //   }
    //   return output
      // return {
        // "selectedCol": colName === this.selColName
      // }
    // }
  },
  methods: {
    
  },
};
</script>

<style lang="scss">
#splom {
    border-radius: var(--border-radius);
    background-color: var(--background-color);
    width: 26%; /* temporary value*/
}
.selectedCol{
  background-color: thistle;
}
</style>
