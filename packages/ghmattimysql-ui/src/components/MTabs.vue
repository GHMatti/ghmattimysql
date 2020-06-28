<template>
  <div>
    <ul
      class="
        bg-gray-400
        border-b-2 border-black border-opacity-25
        flex flex-grow flex-shrink-0 justify-start
      "
    >
      <li
        v-for="(tab, index) in tabs"
        :key="`${tab}-${index}`"
        class="block"
      >
        <a
          @click="setActiveTab(index)"
          class="px-4 py-2 -m-b-2px border-b-2 font-medium flex items-center cursor-pointer"
          :class="calculateClasses(tab.isActive)"
        >
          <m-icon
            v-if="tab.icon"
            class="mr-2"
          >{{ tab.icon }}</m-icon>
          <span class="uppercase">{{ tab.label }}</span>
        </a>
      </li>
    </ul>
    <div>
      <slot/>
    </div>
  </div>
</template>

<script>
import MIcon from './MIcon.vue';

export default {
  name: 'm-tabs',
  components: {
    MIcon,
  },
  data() {
    return {
      activeItem: 0,
      tabItems: [],
    };
  },
  computed: {
    tabs() {
      return this.tabItems.map((node) => node.componentInstance);
    },
  },
  mounted() {
    this.parseNodes();
    this.showChild();
  },
  methods: {
    calculateClasses(isActive) {
      return {
        'border-blue-600': isActive,
        'text-blue-600': isActive,
        'text-black': !isActive,
        'border-black': !isActive,
        'text-opacity-50': !isActive,
        'border-opacity-0': !isActive,
        'hover:text-opacity-75': !isActive,
        'hover:border-opacity-50': !isActive,
      };
    },
    parseNodes() {
      const slots = this.$slots.default || [];
      this.tabItems = slots.filter((node) => node.componentOptions && node.componentOptions.Ctor.options.name === 'm-tab-item');
    },
    showChild() {
      this.tabs[this.activeItem].setActive();
    },
    hideChild() {
      this.tabs[this.activeItem].setActive(false);
    },
    setActiveTab(index) {
      if (this.activeItem === index) return;
      this.hideChild();
      this.activeItem = index;
      this.showChild();
    },
  },
};
</script>

<style lang="scss">
.-m-b-2px {
  margin-bottom: -2px;
}
</style>
