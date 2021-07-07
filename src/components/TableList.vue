<template>
  <div class="w-60 px-3 py-2 min-h-full sticky border-r-2 border-gray-300 h-">
    <div class="flex space-x-3">
      <h2 class="font-bold text-gray-700">Database Name</h2>
      <button class="rounded-full bg-transparent focus:outline-none fill-gray-300">
        <svg height="16" width="16" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg"><title/><g><path d="M66,42H54V30a6,6,0,0,0-12,0V42H30a6,6,0,0,0,0,12H42V66a6,6,0,0,0,12,0V54H66a6,6,0,0,0,0-12Z"/><path d="M48,0A48,48,0,1,0,96,48,48.0512,48.0512,0,0,0,48,0Zm0,84A36,36,0,1,1,84,48,36.0393,36.0393,0,0,1,48,84Z"/></g></svg>
      </button>
    </div>
    <ul class="px-2">
      <li v-for="(table, index) in tables" :key="index">
        <button @click="switchTable(index, table)" class="py-2 flex space-x-2 text-gray-600 font-semibold items-center capitalize px-2 text-sm focus:outline-none">
          <svg height="16" viewBox="0 0 1792 1792" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M576 1376v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm0-384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm-512-768v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm-512-768v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm0-384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm128-320v1088q0 66-47 113t-113 47h-1344q-66 0-113-47t-47-113v-1088q0-66 47-113t113-47h1344q66 0 113 47t47 113z"/></svg>
          <span class="text-gray-600">{{table}}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['tables'],

  methods: {
    switchTable(index: number, table:string) {
      this.$emit('switchTable', table)
    }
  }
})
</script>

<style>
  .fill-gray-300 {
    fill: rgba(75, 85, 99, 0.6);
  }

  .fillAvailable {
    height: fill-available;
  }
</style>