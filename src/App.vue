<template>
  <div>
    <Navbar />
    <TableControl :activeTab="0" :tables="tables" />
    <Grid />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Grid from './components/Grid.vue'
import Navbar from './components/Navbar.vue'
import TableControl from './components/TableControl.vue'

export default defineComponent({
  name: 'App',
  components: {
    Grid,
    Navbar,
    TableControl
  },
  data() {
    const host = import.meta.env.VITE_DB_HOST
    const tables:string[] = []
    return {
      host,
      tables
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
})
</script>

<style>

</style>
