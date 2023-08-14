<template>
  <div id="splom">
    <scatterplot-row v-for="yValue in numericVariables" :key="yValue" :yValue="yValue" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import scatterplotRow from './scatterplotRow.vue';

export default {
  data() {
    return {
    };
  },
  components: {
    scatterplotRow,
  },
  computed: {
    ...mapState({
      numericVariables: (state) => state.numericColumnNames,  
        // selectedFacet: (state) = state.selectedFacet,
    }    
    )
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
</style>
