<template>
  <div class="bg-blue-500">
  	<ul class='flex space-x-0.5'>
      <li
        v-for="(table, index) in tables"
        :key="index"
        :data-tab="index"
        :ref="bindRef(index)"
        class='rounded-t-md bg-blue-600 select-none text-white cursor-pointer flex'>
          <button @click="switchTable(index, table)" class="py-2 font-semibold items-center capitalize px-2 text-sm focus:outline-none">{{table}}</button>
          <button @click="removeTable(index)" class="focus:outline-none ml-2 px-1 fillGray">
            <svg height="16" viewBox="0 0 48 48" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z"/><path d="M0 0h48v48h-48z" fill="none"/></svg>
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
    removeTable(index:number) {
      if (this.tables.length === 1) {
        return this.tables.pop()
      } else {
        this.switchTable(index - 1)
      }
      this.tables.splice(index,1)
    },
    bindRef(tab:number) {
      return `tab-${tab}`
    },
    switchTable(tab:number) {
      const oldTab:HTMLElement = this.$refs[`tab-${this.tab}`] as HTMLElement
      oldTab.classList.remove('bg-white')
      oldTab.classList.add('bg-blue-600', 'text-white')
      let closeButton:HTMLButtonElement = oldTab.childNodes[1] as HTMLButtonElement
      closeButton.classList.add('fillGray')
      this.tab = tab
      const newTab:HTMLElement = this.$refs[`tab-${this.tab}`] as HTMLElement
      newTab.classList.remove('bg-blue-600', 'text-white')
      newTab.classList.add('bg-white')
      closeButton = newTab.childNodes[1] as HTMLButtonElement
      closeButton.classList.remove('fillGray')
      this.$emit('switchTable', newTab.getAttribute('data-tab'))
    }
  }
})
</script>

<style>
  .fillWhite {
    fill: white;
  }
  .fillGray {
    fill: rgb(226, 226, 226);
  }
</style>
