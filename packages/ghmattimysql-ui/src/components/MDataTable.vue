<template>
  <table class="table-auto w-full">
    <thead><tr>
      <th
        v-for="head in headers"
        :key="head.value"
        :class="computeHeadClasses(head)"
        @click="sortData(head.value)"
      >
        <div class="flex items-center text-opacity-50 text-black hover:text-opacity-100">
          <span class="text-opacity-100 text-black">
            {{ head.text }}
          </span>
          <m-icon
            v-if="head.sortable !== false"
            small
            class="
              rounded-full hover:bg-black hover:bg-opacity-10
              transition duration-300 ease-in-out
            "
          >
            arrow_downward
          </m-icon>
        </div>
      </th>
    </tr></thead>
    <tbody>
      <tr
        v-for="(row, rowIndex) in tableItems"
        :key="`row-${rowIndex}`"
        class="hover:bg-black hover:bg-opacity-10 transition duration-300 ease-in-out"
      >
        <slot name="row" v-bind:item="row">
          <td
            v-for="head in headers"
            :class="(head.align) ? `text-${head.align}` : 'text-center'"
            :key="`${rowIndex}-${head.value}`"
          >
            {{ row[head.value] }}
          </td>
        </slot>
      </tr>
    </tbody>
    <tr>
      <td :colspan="headers.length">
        <div class="flex items-center">
          {{ this.fromIndex + 1 }} - {{ this.toIndex + 1 }}
          of {{ this.items.length }}
          <m-icon
            small
            @click.native="prevPage()"
            class="
              cursor-pointer rounded-full hover:bg-black hover:bg-opacity-10
              transition duration-300 ease-in-out
            "
          >
            arrow_back_ios
          </m-icon>
          <m-icon
            small
            @click.native="nextPage()"
            class="
              cursor-pointer rounded-full hover:bg-black hover:bg-opacity-10
              transition duration-300 ease-in-out
            "
          >
            arrow_forward_ios
          </m-icon>
        </div>
      </td>
    </tr>
  </table>
</template>

<script>
import MIcon from './MIcon.vue';

export default {
  name: 'm-data-table',
  components: {
    MIcon,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    headers: {
      type: Array,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    tableItems() {
      const items = [...this.items];
      if (this.sortColumn !== null) {
        items.sort(this.compareFunction);
      }
      return items.slice(this.fromIndex, this.toIndex + 1);
    },
    pages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    fromIndex() {
      return this.currentPage * this.itemsPerPage;
    },
    toIndex() {
      if (this.hasNextPage) return (this.currentPage + 1) * this.itemsPerPage - 1;
      return this.items.length - 1;
    },
    hasNextPage() {
      return this.pages > this.currentPage + 1;
    },
  },
  data() {
    return {
      currentPage: 0,
      sortColumn: null,
      sortDescending: true,
    };
  },
  methods: {
    computeHeadClasses(head) {
      return {
        'text-center': !head.align || (head.align && head.align) === 'center',
        'text-left': head.align && head.align === 'left',
        'text-right': head.align && head.align === 'right',
        'text-justify': head.align && head.align === 'justify',
        'cursor-default': head.sortable === false,
        'cursor-pointer': head.sortable !== false,
      };
    },
    compareFunction(a, b) {
      if (a[this.sortColumn] > b[this.sortColumn]) return (this.sortDescending) ? -1 : 1;
      if (a[this.sortColumn] < b[this.sortColumn]) return (this.sortDescending) ? 1 : -1;
      return 0;
    },
    nextPage() {
      if (!this.hasNextPage) return;
      this.currentPage += 1;
    },
    prevPage() {
      if (this.currentPage === 0) return;
      this.currentPage -= 1;
    },
    sortData(column) {
      if (this.sortColumn === column) {
        this.sortDescending = !this.sortDescending;
        return;
      }
      this.sortDescending = true;
      this.sortColumn = column;
    },
  },
};
</script>
