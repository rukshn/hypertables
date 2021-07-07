<template>
  <div>
    <Navbar />
    <NewTable v-if="showNewTable" @close="showNewTable = false" />
    <div class="flex">
      <TableList :tables="tables" @switchTable="openTable" @newTable="newTable" />
      <div class="w-full">
        <TableControl @switchTable="switchTable" :activeTab="0" @newTable="showNewTable = true" :tables="selectedTables" />
        <Grid :activeTable="activeTable" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Grid from './components/Grid.vue'
import Navbar from './components/Navbar.vue'
import TableControl from './components/TableControl.vue'
import NewTable from './components/NewTable.vue'
import TableList from './components/TableList.vue'

export default defineComponent({
  name: 'App',
  components: {
    Grid,
    Navbar,
    TableControl,
    NewTable,
    TableList
  },
  data() {
    const host = import.meta.env.VITE_DB_HOST
    const tables:string[] = []
    const showNewTable: boolean = false
    const activeTable: string = ""
    const selectedTables:string[] = []

    return {
      host,
      tables,
      showNewTable,
      activeTable,
      selectedTables
    }
  },

  mounted() {
    const vm = this
    fetch(`${this.host}/_ht/get-tables`)
    .then((response) => response.json())
    .then((data) => {
      vm.tables = data
    })
  },

  methods: {
    switchTable(index:string) {
      this.activeTable = index
    },
    newTable() {
      this.showNewTable = true
    },
    openTable(index:string) {
      if (!this.selectedTables.includes(index)) {
        this.selectedTables.push(index)
      }
    }
  }
})
</script>

<style>

</style>
