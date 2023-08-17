<template>

  <div class="scatterplot row" :id="rowIDname" >
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
  emits: ['handleFacetClick'],
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
      numericVariables: state => state.numericColumnNames
    }),
  },
  methods: {
    ...mapMutations(['updateSelectedFacet']),
    handleFacetClick(selectedFacet) {
      console.log(selectedFacet)
      let home = selectedFacet[0]
      let compare = selectedFacet[1]
      this.updateSelectedFacet(selectedFacet);
      this.$router.push({ query: { home } });
      this.$router.push({ query: { compare } });
        
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
</style>
