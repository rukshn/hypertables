<template>
  <div>
    <div class="grid_column flex">
      <div class="w-1/6" v-for="(column, index) in columns" :key="index">
        <div class="bg-gray-200 text-center py-1 px-2 w-full">Heading</div>
        <div class="w-full">
          <input type="text" class="focus:outline-none focus:bg-green-100 focus:border-gray-200 py-1 px-1 border border-gray-100 min-w-full">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Grid',
  data() {
    const columns: number = 35
    const rows: number = 50
    return {
      columns,
      rows,
    }
  }
})
</script>