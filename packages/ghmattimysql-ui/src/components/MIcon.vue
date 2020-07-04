<template>
  <span class="inline-flex" :class="computedClasses">
    <i class="material-icons" :style="`font-size: ${computedFontSize}px;`"><slot /></i>
  </span>
</template>

<script>
export default {
  name: 'm-icon',
  props: {
    small: Boolean,
  },
  computed: {
    computedClasses() {
      return {
        'h-4': this.small,
        'w-4': this.small,
        'h-6': !this.small,
        'w-6': !this.small,
      };
    },
    computedFontSize() {
      if (this.small) return 16;
      return 24;
    },
  },
};
</script>
