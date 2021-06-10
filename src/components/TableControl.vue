<template>
  <div class="bg-blue-500">
  	<ul class='flex space-x-0'>
      <li
        v-for="(table, index) in tables"
        :key="index"
        :data-tab="index"
        :ref="bindRef(index)"
        @click="changeTab(index)"
        class='py-1 px-2 rounded-t-md bg-blue-700 select-none text-white cursor-pointer'>{{table}}</li>
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
    const tab:HTMLElement = this.$refs[`tab-${this.tab}`] as HTMLElement
    tab.classList.remove('bg-blue-700', 'text-white')
    tab.classList.add('bg-white')
  },
  methods: {
    bindRef(tab:number) {
      return `tab-${tab}`
    },
    changeTab(tab:number) {
      const oldTab:HTMLElement = this.$refs[`tab-${this.tab}`] as HTMLElement
      oldTab.classList.remove('bg-white')
      oldTab.classList.add('bg-blue-700', 'text-white')
      this.tab = tab
      const newTab:HTMLElement = this.$refs[`tab-${this.tab}`] as HTMLElement
      newTab.classList.remove('bg-blue-700', 'text-white')
      newTab.classList.add('bg-white')
    }
  }
})
</script>
