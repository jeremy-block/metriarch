<template>

  <div class="scatterplot row"
        :class="computedClasses"
        :id="rowIDname" >
    <h6 class="splomTitle">
      {{ this.yValue }}
    </h6>
      <mini-Scatterplot
      v-for="xValue in this.numericVariables" :key="xValue"
      :data="data"
      :x="xValue"
      :y="yValue"
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
    yValue:""
  },
  data() {
    return {
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
    }
  },
  methods: {
        // ...mapMutations(['updateSelectedFacet']),
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

<style lang="scss">

.splomTitle{
  text-align: right;
}
.row.scatterplot{
  display: grid;
  grid-template-columns: 80px auto auto auto auto auto auto;
  grid-auto-flow: dense; /* fill all the space */
  gap: 5px;
}
.scatterplot{
  width: 100%; /* temporary value*/
}
.selectedRow{
  background-color: thistle;
}
</style>
