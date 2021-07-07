<template>
  <div class="bg-blue-600">
  	<ul class='flex space-x-0.5'>
      <li
        v-for="(table, index) in tables"
        :key="index"
        :data-tab="index"
        :data-table="table"
        :ref="bindRef(index)"
        class='rounded-t-md bg-blue-500 select-none text-white cursor-pointer flex'>
          <button @click="switchTable(index, table)" class="py-2 flex space-x-2 fillGray font-semibold items-center capitalize px-2 text-sm focus:outline-none">
            <svg height="16" viewBox="0 0 1792 1792" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M576 1376v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm0-384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm-512-768v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm-512-768v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm0-384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm128-320v1088q0 66-47 113t-113 47h-1344q-66 0-113-47t-47-113v-1088q0-66 47-113t113-47h1344q66 0 113 47t47 113z"/></svg>
            <span>{{table}}</span>
          </button>
          <button @click="removeTable(index)" class="focus:outline-none px-2 fillGray">
            <svg height="16" viewBox="0 0 48 48" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z"/><path d="M0 0h48v48h-48z" fill="none"/></svg>
          </button>
        </li>
        <li class='rounded-t-md bg-blue-500 select-none text-white cursor-pointer flex'>
          <button @click="newTable" class="py-2 flex space-x-2 fillGray font-semibold items-center capitalize px-2 text-sm focus:outline-none">
            <svg height="16" width="16" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg"><title/><g><path d="M66,42H54V30a6,6,0,0,0-12,0V42H30a6,6,0,0,0,0,12H42V66a6,6,0,0,0,12,0V54H66a6,6,0,0,0,0-12Z"/><path d="M48,0A48,48,0,1,0,96,48,48.0512,48.0512,0,0,0,48,0Zm0,84A36,36,0,1,1,84,48,36.0393,36.0393,0,0,1,48,84Z"/></g></svg>
            <span>New Table</span>
          </button>
        </li>
	  </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, HMRRuntime } from 'vue'
export default defineComponent({
  name: 'TableControl',
  props: ['activeTab', 'tables'],
  data() {
    const tab:number = this.activeTab
    return {
      tab
    }
  },
  mounted() {
    if (this.tables.length > 0) {
      const tab:HTMLElement = this.$refs[`tab-${this.tab}`] as HTMLElement
      tab.classList.remove('bg-blue-600', 'text-white')
      tab.classList.add('bg-white')
    }
  },
  computed: {

  },
  methods: {
    newTable() {
      this.$emit('newTable')
    },
    removeTable(index:number) {
      if (this.tables.length === 1) {
        return this.tables.pop()
      } else {
        this.tables.splice(index,1)
      }
    },
    bindRef(tab:number) {
      return `tab-${tab}`
    },
    switchTable(tab:number, table:string) {
      const oldTab:HTMLElement = this.$refs[`tab-${this.tab}`] as HTMLElement
      oldTab.classList.remove('bg-white')
      oldTab.classList.add('bg-blue-500', 'text-white')
      let tableIcon = oldTab.firstChild as HTMLElement
      let closeButton = oldTab.lastChild as HTMLElement
      tableIcon.classList.add('fillGray')
      closeButton.classList.add('fillGray')
      this.tab = tab
      const newTab:HTMLElement = this.$refs[`tab-${this.tab}`] as HTMLElement
      newTab.classList.remove('bg-blue-500', 'text-white')
      newTab.classList.add('bg-white')
      tableIcon = newTab.firstChild as HTMLElement
      closeButton = newTab.lastChild as HTMLElement
      tableIcon.classList.remove('fillGray')
      closeButton.classList.remove('fillGray')
      this.$emit('switchTable', table)
    }
  }
})
</script>

<style>
  .fillGray {
    fill: #b5d9ff;
  }
</style>
