<template>
  <div>
    <button
      @click="toggleAccordion()"
      class="flex items-center space-x-3"
      :aria-expanded="isOpen"
      :aria-controls="`collapse${_uid}`"
    >

      <slot name="title" />
      <svg
      width="24px"
      height="24px"
      class="duration-200"
      :class="{
        'rotate-180': isOpen,
        'rotate-0': !isOpen,
      }"
        fill="none"
        stroke="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        aria-hidden="true"
        >
        <path
        d="M17 9.5L12 14.5L7 9.5"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
        />
      </svg>
    </button>

    <div v-show="isOpen" :id="`collapse${_uid}`">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },

  methods: {
    toggleAccordion() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style>
  .duration-200 {
    transition: 0.2s;
  }
  .rotate-0 {
    transform: rotate(0deg);
  }
  .rotate-180 {
    transform: rotate(180deg);
  }

</style>