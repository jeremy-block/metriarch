<template>
  <div v-if="visible" class="tooltip" :style="tooltipStyle">
    {{ text }}
  </div>
  <span
    ref="target"
    class="icon"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
    @mousemove="updateTooltipPosition"
  >
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: "miniToolTip",
  props: {
    text: String,
  },
  data() {
    return {
      visible: false,
      tooltipStyle: {
        top: 0,
        left: 0,
      },
    };
  },
  methods: {
    showTooltip() {
      this.visible = true;
      this.updateTooltipPosition();
      this.hideAfterDelay();
    },
    hideTooltip() {
      this.visible = false;
    },
    updateTooltipPosition(event) {
      if (this.visible) {
        const target = this.$refs.target;
        const tooltip = this.$refs.tooltip;
        
        if (target && tooltip) {
          const rect = target.getBoundingClientRect();
          const tooltipRect = tooltip.getBoundingClientRect();

          const top = rect.top - tooltipRect.height - 10;
          const left = rect.left + rect.width / 2 - tooltipRect.width / 2;

          this.tooltipStyle = {
            top: `${top}px`,
            left: `${left}px`,
          };
        }
      }
    },
    hideAfterDelay() {
      setTimeout(() => {
        this.visible = false;
      }, 4000); // 4 seconds
    },
  },
};
</script>

<style scoped>
.tooltip {
  position: absolute;
  background-color: #333;
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  pointer-events: none;
  z-index: 999;
}
.icon {
  cursor: pointer;
  position: relative;
  display: inline-block;
}
</style>
