<template>
  <table class="table-auto w-full">
    <thead><tr>
      <th
        v-for="head in headers"
        :key="head.value"
        :class="(head.align) ? `text-${head.align}` : 'text-center'"
      >
        {{ head.text }}
      </th>
    </tr></thead>
    <tbody>
      <tr
        v-for="(row, rowIndex) in tableItems"
        :key="`row-${rowIndex}`"
      >
        <slot name="row" v-bind:item="row">
          <td
            v-for="head in headers"
            :class="(head.align) ? `text-${head.align}` : 'text-center'"
            :key="`${rowIndex}-${head.value}`"
          >
            {{ row[value] }}
          </td>
        </slot>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'm-data-table',
  props: {
    items: {
      type: Array,
      required: true,
    },
    headers: {
      type: Array,
      required: true,
    },
  },
  computed: {
    tableItems() {
      return this.items;
    },
  },
};
</script>
