<template>
  <div>
    <div class="grid_column flex">
      <div class="w-1/6" v-for="(column, colIndex) in columns" :key="colIndex" :ref="bindCol(colIndex)">
        <div class="bg-gray-200 text-center py-1 px-2 w-full">{{colIndex}}</div>
        <div class="w-full" v-for="(row, rowIndex) in rows" :key="rowIndex">
          <input @keydown.enter="enterCell" :data-col="colIndex" :data-row="rowIndex" @keydown.tab="tabCell" :ref="bindRow(rowIndex, colIndex)" type="text" class="focus:outline-none focus:bg-green-100 focus:border-gray-200 py-1 px-1 border border-gray-100 min-w-full">
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
  },
  methods: {
    bindCol(n:number) {
      return `col${n}`
    },
    bindRow(n:number, col:number) {
      return `col-${col}-row-${n}`
    },
    enterCell(e:any) {
      e.preventDefault()
      const col:number = e.target.getAttribute('data-col')
      const row:number = e.target.getAttribute('data-row')

      const newRow:number = +row + 1
      const newCol:number = 0
      const ref:string = `col-${newCol}-row-${newRow}`
      if(this.$refs[ref]) this.$refs[ref].focus()
    },
    tabCell(e:any) {
      e.preventDefault()
      const col:number = e.target.getAttribute('data-col')
      const row:number = e.target.getAttribute('data-row')

      const newRow:number = row
      const newCol:number = +col + 1

      const ref:string = `col-${newCol}-row-${newRow}`
      if(this.$refs[ref]) this.$refs[ref].focus()
    }
  }
})
</script>