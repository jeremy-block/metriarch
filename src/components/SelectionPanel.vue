<script>
import Accordion from "./global/Accordion.vue";
import facetedScatterplot from "./facetedScatterplot.vue";
export default {
  name: "SelectionPanel",
  components: {
    Accordion,
    facetedScatterplot
  },
  props: {},
  data() {
    return {
      shouldShowControls: true,
    };
  },
  mounted() {
    },
};
</script>

<template>
  <accordion id="mainSelector" class="mb-4">
        <template v-slot:title>
          <span class="font-semibold text-xl no-wrap">DataTable</span>
        </template>
        <template v-slot:content>
          <faceted-scatterplot />
        </template>
      </accordion>
</template>

<style>

</style>