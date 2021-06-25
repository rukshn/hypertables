<template>
  <div class="px-2 border-r-2 border-gray-300 sticky w-52">
    <h2>Database Name</h2>
    <button v-for="(table, index) in tables" :key="index" class="bg-transparent text-gray-500 hover:text-gray-600 focus:outline-none max-w-full overflow-hidden">
      {{table}}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['tables'],

  methods: {
    swtichTable(table:string) {
      this.$emit('switchTable', table)
    }
  }
})
</script>
