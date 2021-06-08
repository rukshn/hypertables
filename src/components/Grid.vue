<template>
  <div>
    <div class="grid_column flex">
      <div class="w-1/6" v-for="(column, colIndex) in structure.columns" :key="colIndex" :ref="bindCol(colIndex)">
        <div class="bg-gray-200 border-b border-r border-gray-300 text-center select-none py-1 px-2 w-full">
          {{column.title}}
        </div>
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

          <div v-if="column.type === 'date'" class="flex">
            <input readonly
                @keydown.down.exact="cellDown"
                @keydown.up.exact="cellUp"
                @keydown.left.exact="cellLeft"
                @keydown.right.exact="cellRight"
                @keydown.enter.exact="enterCell"
                @keydown.tab.exact="tabCell"
                @focus="changeActiveCell(colIndex, rowIndex)"
                :data-cell-type="column.type"
                :ref="bindRow(rowIndex, colIndex)"
                :data-col="colIndex"
                :data-row="rowIndex"
                type="text"
                class="focus:outline-none focus:bg-blue-100 focus:border-gray-200 py-1 px-1 border border-gray-100 w-5/6" />

            <DatePicker is-fill color="indigo" class="bg-green-50 border border-gray-100 text-gray-700 focus:outline-none w-1/6" ref="gridCalander" v-model="date" @dayclick="setDate(colIndex, rowIndex)">
            <template v-slot="{ togglePopover }">
            <button @click="togglePopover()" class="focus:outline-none flex flex-col items-center justify-center align-middle item-center w-full h-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                class="w-4 h-4 fill-current"
              >
                <path
                  d="M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z"
                ></path>
              </svg>
            </button>
            </template>
            </DatePicker>

            <div :ref="bindPopup(rowIndex, colIndex)"
              class="space-x-2 w-1/6 space-y-2 select hidden absolute bg-gray-50 py-2 px-2">
              <DatePicker ref="gridCalander" v-model="date" @dayclick="setDate" />
            </div>
          </div>

          <div v-if="column.type === 'number'">
            <input
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
            type="number"
            class="focus:outline-none text-right focus:bg-blue-100 focus:border-gray-200 py-1 px-1 border border-gray-100 min-w-full" />
          </div>

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

            <div :ref="bindPopup(rowIndex, colIndex)"
              class="space-x-2 w-1/6 space-y-2 select hidden absolute bg-gray-50 py-2 px-2">
              <button
                v-for="(value, index) in column.value"
                :key="index"
                @click="setValue"
                :data-value="value"
                class="rounded-2xl text-sm select-none focus:outline-none bg-green-200 py-1 px-2">{{value}}</button>
            </div>
          </div>
        </div>
      </div>
      <div class="w-1/12">
        <div class="bg-gray-200 hover:bg-gray-300 border-b border-r border-gray-300 text-center select-none py-1 px-2 w-full">
          <button @click="toggleCreateTabPopover" ref="btnNewColumn" class="w-full focus:outline-none">+</button>
        </div>

        <div ref="newColumnRef" v-bind:class="{'hidden': !showCreateTabPopover, 'block': showCreateTabPopover}"
            class="w-80 bg-white border border-gray-200 border-0 block z-50 leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg">
          <div>
            <div class="bg-blue-100 py-2 px-3 opacity-75 font-semibold border-b border-solid uppercase rounded-t-lg">
              select a column type
            </div>
            <div class="py-2 px-2 space-y-2">
              <div class="field">
                <div class="control">
                  <input type="text" placeholder="Column title" class="py-2 px-2 rounded-md w-full border-2 border-gray-400 outline-none focus:border-indigo-500 focus:bg-gray-100" v-model="newColumnName">
                </div>
              </div>

              <div class="dropdown flex">
                <input v-model="columnType" type="text" disabled class="rounded-l-md flex-grow py-2 px-2 border border-gray-300">
                <button @click="showColumnTypeDropdown = true" class="bg-gray-200 focus:outline-none hover:bg-gray-300 w-1/6 px-2 py-2 rounded-r-md">
                  <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
              <div v-if="showColumnTypeDropdown === true" class="border border-gray-300 rounded-md">
                <button @click="showColumnCreator('string')" class="px-3 text-left py-2 w-full hover:bg-blue-200 text-gray-700">Signe line text</button>
                <button @click="showColumnCreator('multiline')" class="px-3 text-left py-2 w-full hover:bg-blue-200 text-gray-700">Multiline text</button>
                <button @click="showColumnCreator('date')" class="px-3 text-left py-2 w-full hover:bg-blue-200 text-gray-700">Date</button>
                <button @click="showColumnCreator('enum')" class="px-3 text-left py-2 w-full hover:bg-blue-200 text-gray-700">Select</button>
              </div>

              <div v-if="showNSLC" class="py-2 space-y-2">
                <p class="text-gray-500">
                  Single line of text.
                </p>

                <div class="space-x-2">
                  <button @click="createColumn('string')" class="bg-blue-500 rounded-md text-white px-3 py-2 hover:bg-blue-600 focus:outline-none">Create Column</button>
                  <button class="focus:outline-none">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { DatePicker } from 'v-calendar';
  import { createPopper } from "@popperjs/core";

  export default defineComponent({
    name: 'Grid',
    components: {
      DatePicker
    },
    data() {
      const activeCell: {col: number, row:number } = {
        row: 0,
        col: 0
      }

      // popover related values
      const showCreateTabPopover:boolean = false
      const showNSLC:boolean = false
      const newColumnName:string = ""
      const showColumnTypeDropdown:boolean = false
      const columnType:string = ""

      const date:Date = new Date()

      const structure: {
        rows: number,
        columns: Array < {
          title: string,
          type: string,
          value: String[]
        } >
      } = {
        rows: 5,
        columns: [{
          title: "Name",
          type: "string",
          value: []
        }, {
          title: "Gender",
          type: "enum",
          value: ['Male', 'Female', 'Trans', 'Other']
        }, {
          title: "Date",
          type: "date",
          value: []
        }, {
          title: "Number",
          type: "number",
          value: []
        }]
      }

      const disabled: boolean = true
      return {
        structure,
        disabled,
        activeCell,
        date,
        showCreateTabPopover,
        showNSLC,
        newColumnName,
        showColumnTypeDropdown,
        columnType
      }
    },

    mounted() {
      const activeCell = this.activeCell
      if(this.$refs[`col-${activeCell.col}-row-${activeCell.row}`]) (this.$refs[`col-${activeCell.col}-row-${activeCell.row}`] as HTMLElement).focus()
    },
    methods: {
      createColumn(type:string) {
        if (type === 'string') {
          const newColumn: {title: string, type: string, value: String[]} = {
            title: this.newColumnName || 'Column' + this.structure.columns.length + 1,
            type: 'string',
            value: []
          }
          this.structure.columns.push(newColumn)
          this.newColumnName = ''
          this.showCreateTabPopover = false
        }
      },
      showColumnCreator(type:string) {
        this.showNSLC = true
        if (type === 'string') {
          this.showColumnTypeDropdown = false
          this.columnType = "Single text"
        }
      },
      toggleCreateTabPopover() {
        if (this.showCreateTabPopover) {
          this.showCreateTabPopover = false
        } else {
          this.showCreateTabPopover = true
          const newColumnButton:HTMLButtonElement = this.$refs['btnNewColumn'] as HTMLButtonElement
          const newColumnPopover:HTMLElement = this.$refs['newColumnRef'] as HTMLElement
          createPopper(newColumnButton, newColumnPopover, {placement: 'bottom',
          modifiers: [
              {
                name: 'offset',
                options: {
                  offset: () => [40]
                }
              }
            ]
          })
        }
      },
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
        if (this.disabled === false && (cell.getAttribute('data-cell-type') === 'enum')) {
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
      setDate(colIndex:number, rowIndex:number) {
        // this.hidePopup(col,row)
        const cell:HTMLInputElement = this.$refs[`col-${colIndex}-row-${rowIndex}`] as HTMLInputElement
        cell.value = this.date.toDateString()
        cell.setAttribute('data-value', this.date.toJSON().slice(0, 19).replace('T', ' '))
      },
      changeActiveCell(colIndex:number, rowIndex:number) {
        const oldActiveCell = this.activeCell
        const cell:HTMLElement = this.$refs[`col-${oldActiveCell.col}-row-${oldActiveCell.row}`] as HTMLElement
        if (this.disabled === false && cell.getAttribute('data-cell-type') === 'enum') {
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