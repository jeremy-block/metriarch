<script>
import Accordion from "./global/Accordion.vue";
import ControlContent from './ControlContent.vue';
export default {
  name: "SelectionPanel",
  components: {
    Accordion,
    ControlContent
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
          <ControlContent />
        </template>
      </accordion>
</template>

<style>

</style>