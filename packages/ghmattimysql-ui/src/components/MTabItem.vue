<template>
  <div v-if="isActive">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'm-tab-item',
  data() {
    return {
      isActive: false,
    };
  },
  props: {
    label: String,
    icon: String,
  },
  created() {
    if (this.$parent.parseNodes) this.$parent.parseNodes();
  },
  beforeDestroy() {
    if (this.$parent.parseNodes) this.$parent.parseNodes();
  },
  methods: {
    setActive(active = true) {
      this.isActive = active;
    },
  },
};
</script>
