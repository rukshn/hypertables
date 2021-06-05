<template>
  <div>
    <div class="grid_column flex">
      <div class="w-1/6" v-for="(column, colIndex) in structure.columns" :key="colIndex" :ref="bindCol(colIndex)">
        <div class="bg-gray-200 border-b border-r border-gray-300 text-center select-none py-1 px-2 w-full">
          {{column.title}}</div>
        <div class="w-full" :class="{'flex': colIndex === 0}" v-for="(row, rowIndex) in structure.rows" :key="rowIndex">
          <input
            v-if="column.type === 'string'"
            :readonly="disabled"
            @keydown="enable"
            @keydown.down.exact="cellDown"
            @keydown.up.exact="cellUp"
            @keydown.left.exact="cellLeft"
            @keydown.right.exact="cellRight"
            @keydown.enter.exact="enterCell"
            @keydown.tab.exact="tabCell"
            @click="enable"
            @focus="changeActiveCell(colIndex, rowIndex)"
            :data-cell-type="column.type"
            :ref="bindRow(rowIndex, colIndex)"
            :data-col="colIndex"
            :data-row="rowIndex"
            type="text"
            class="focus:outline-none focus:bg-blue-100 focus:border-gray-200 py-1 px-1 border border-gray-100 min-w-full" />

          <div v-if="column.type ==='enum'">
            <input :readonly="disabled"
            @keydown="enable"
            @keydown.down.exact="cellDown"
            @keydown.up.exact="cellUp"
            @keydown.left.exact="cellLeft"
            @keydown.right.exact="cellRight"
            @keydown.enter.exact="enterCell"
            @keydown.tab.exact="tabCell"
            @click="enable"
            @focus="changeActiveCell(colIndex, rowIndex)"
            :data-cell-type="column.type"
            :ref="bindRow(rowIndex, colIndex)"
            :data-col="colIndex"
            :data-row="rowIndex"
            type="text"
            class="focus:outline-none focus:bg-blue-100 focus:border-gray-200 py-1 px-1 border border-gray-100 min-w-full" />

            <div :ref="bindPopup(rowIndex, colIndex)" class="space-x-2 w-1/5 space-y-2 select hidden absolute bg-gray-50 py-2 px-2">
              <button v-for="(value, index) in column.value" :key="index" @click="setValue" :data-value="value" class="rounded-2xl text-sm select-none focus:outline-none bg-green-200 py-1 px-2">{{value}}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent
  } from 'vue'
  export default defineComponent({
    name: 'Grid',
    data() {
      const activeCell: {col: number, row:number } = {
        row: 0,
        col: 0
      }

      const structure: {
        rows: number,
        columns: Array < {
          title: string,
          type: string,
          value: String[]
        } >
      } = {
        rows: 50,
        columns: [{
          title: "Name",
          type: "string",
          value: []
        }, {
          title: "Gender",
          type: "enum",
          value: ['Male', 'Female', 'Other']
        }]
      }

      const disabled: boolean = true
      return {
        structure,
        disabled,
        activeCell
      }
    },

    mounted() {
      const activeCell = this.activeCell
      if(this.$refs[`col-${activeCell.col}-row-${activeCell.row}`]) (this.$refs[`col-${activeCell.col}-row-${activeCell.row}`] as HTMLElement).focus()
    },
    methods: {
      bindCol(n: number) {
        return `col${n}`
      },
      bindRow(n: number, col: number) {
        return `col-${col}-row-${n}`
      },
      bindPopup(rowIndex: number, colIndex: number) {
        return `popup-col-${colIndex}-row-${rowIndex}`
      },
      enterCell(e: any) {
        e.preventDefault()
        this.disabled = true
        const col: number = e.target.getAttribute('data-col')
        const row: number = e.target.getAttribute('data-row')

        const newRow: number = +row + 1
        const newCol: number = 0
        const ref: string = `col-${newCol}-row-${newRow}`
        if (this.$refs[ref]) {
          (this.$refs[ref] as HTMLInputElement).focus()
        }
      },
      tabCell(e: any) {
        this.disabled = true
        e.preventDefault()
        const col: number = e.target.getAttribute('data-col')
        const row: number = e.target.getAttribute('data-row')

        const newRow: number = row
        const newCol: number = +col + 1

        const ref: string = `col-${newCol}-row-${newRow}`
        if (this.$refs[ref]) {
          (this.$refs[ref] as HTMLInputElement).focus()
          this.changeActiveCell(newCol, newRow)
        }
      },
      cellDown(e: any) {
        e.preventDefault()
        this.disabled = true
        const col: number = e.target.getAttribute('data-col')
        const row: number = e.target.getAttribute('data-row')

        const newRow: number = +row + 1
        const newCol: number = col
        const ref: string = `col-${newCol}-row-${newRow}`
        if (this.$refs[ref])(this.$refs[ref] as HTMLInputElement).focus()
      },
      cellUp(e: any) {
        e.preventDefault()
        this.disabled = true
        const col: number = e.target.getAttribute('data-col')
        const row: number = e.target.getAttribute('data-row')

        const newRow: number = +row - 1
        const newCol: number = col
        const ref: string = `col-${newCol}-row-${newRow}`
        if (this.$refs[ref]) {
          (this.$refs[ref] as HTMLInputElement).focus()
        }
      },
      cellLeft(e: any) {
        if (!this.disabled) return
        e.preventDefault()
        this.disabled = true
        const col: number = e.target.getAttribute('data-col')
        const row: number = e.target.getAttribute('data-row')

        const newRow: number = row
        const newCol: number = +col - 1
        const ref: string = `col-${newCol}-row-${newRow}`
        if (this.$refs[ref]) {
          (this.$refs[ref] as HTMLInputElement).focus()
        }

      },
      cellRight(e: any) {
        if (!this.disabled) return
        e.preventDefault()
        this.disabled = true
        const col: number = e.target.getAttribute('data-col')
        const row: number = e.target.getAttribute('data-row')

        const newRow: number = row
        const newCol: number = +col + 1
        const ref: string = `col-${newCol}-row-${newRow}`
        if (this.$refs[ref]) {
          (this.$refs[ref] as HTMLInputElement).focus()
          this.changeActiveCell(newCol, newRow)
        }

      },
      enable(e:any) {
        this.showPopup(this.activeCell.col, this.activeCell.row)
        return this.disabled = false
      },
      showPopup(colIndex:number, rowIndex:number) {
        const cell:HTMLElement = this.$refs[`col-${colIndex}-row-${rowIndex}`] as HTMLElement
        if (this.disabled === false && cell.getAttribute('data-cell-type') === 'enum') {
          const popup:HTMLElement = this.$refs[`popup-col-${colIndex}-row-${rowIndex}`] as HTMLElement
          if(popup.classList.contains('hidden')) popup.classList.remove('hidden')
        }
      },
      hidePopup(colIndex:number, rowIndex:number) {
        const popup:HTMLElement = this.$refs[`popup-col-${colIndex}-row-${rowIndex}`] as HTMLElement
        if(!popup.classList.contains('hidden')) popup.classList.add('hidden')
      },
      setValue(e:any) {
        const row:number = this.activeCell.row
        const col:number = this.activeCell.col
        const cell:HTMLInputElement = this.$refs[`col-${col}-row-${row}`] as HTMLInputElement
        cell.value = e.target.getAttribute('data-value')
        this.hidePopup(col, row)
      },
      changeActiveCell(colIndex:number, rowIndex:number) {
        const oldActiveCell = this.activeCell
        const cell:HTMLElement = this.$refs[`col-${oldActiveCell.col}-row-${oldActiveCell.row}`] as HTMLElement
        if(cell.getAttribute('data-cell-type') === 'enum') {
          this.hidePopup(oldActiveCell.col, oldActiveCell.row)
        }
        this.activeCell = {col: colIndex, row: rowIndex}
        this.showPopup(colIndex, rowIndex)
      }
    }
  })
</script>

<style>
  .top-100 {
    top: 100%
  }

  .bottom-100 {
    bottom: 100%
  }

  .max-h-select {
    max-height: 300px;
  }
</style>