<template>
  <div class="tooltip-container" @mouseover="showTooltip($event)" @mouseleave="hideTooltip" ref="targetElement">
    <slot></slot>
    <transition name="fade">
      <div v-if="isTooltipVisible" class="tooltip" :class="{ 'tooltip-left': isTooltipLeft }">
        {{ text }}
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name:"fadeTooltip",
  data() {
    return {
      isTooltipVisible: false,
      isTooltipLeft: false,
      willDisplayIn: null,
      willHideIn: null,
    };
  },
  props: {
    text: String,
    functional: {
      type: Boolean,
      default: true,
    }
  },
  methods: {
    showTooltip(event) {
      if (this.functional) { 
        this.willDisplayIn = setTimeout(() => {
          this.isTooltipVisible = true;
          this.isTooltipLeft = this.shouldTooltipBeOnLeft(event);
        }, 700);
      }
    },
    hideTooltip() {
      clearTimeout(this.willDisplayIn);
      this.willHideIn = setTimeout(() => {
        this.isTooltipVisible = false;
      }, 200);
    },
    shouldTooltipBeOnLeft(event) {
      const boundingRect = this.$refs.targetElement.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const cursorX = event.clientX;

      // Calculate the position based on cursor position
      return cursorX < windowWidth / 2;
    },
  },
};
</script>

<style scoped>

.tooltip {
  position: absolute;
  top: 25%;
  left: 10%;    
  width: max-content;
  max-width: 400px;
  transform: translateX(100%);
  padding: 8px;
  background-color: #444;
  color: #fff;
  border-radius: 4px;
  opacity: 0.9;
  transition: opacity 0.3s, transform 0.3s;
}

.tooltip-left {
  left: auto;
  right: 50%;
  /* transform: translateX(50%); */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: translateY(5px);
}
</style>
