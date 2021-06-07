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
    const tables:string[] = ['Patients', 'Investigations']
    return {
      tables
    }
  }
})
</script>

<style>

</style>
