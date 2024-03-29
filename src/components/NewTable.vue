<template>
  <div
    class="min-w-screen bg-gray-400 bg-opacity-60 h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none">
    <div class="w-1/2 mx-auto bg-white rounded-md py-4 px-6">
      <h1 class="title font-bold text-xl">Create A New Table</h1>

      <form class="space-y-2" @submit.prevent="createTable">
        <p class="text-sm text-red-600" v-if="showError">
          {{message}}
        </p>
        <p class="text-sm text-green-600" v-if="showSuccess">
          {{message}}
        </p>
        <div class="field space-y-1">
          <label class="font-bold">Table Name</label>
          <div class="control">
            <input required v-model="tableName" placeholder="New Table Name" type="text" class="px-2 py-2 rounded-md border-2 border-gray-400 focus:outline-none focus:border-indigo-500 w-full" />
          </div>
        </div>
        <div class="field space-y-1">
          <label class="font-bold">Primary Key Column</label>
          <div class="control">
            <input required v-model="primaryKey" placeholder="Primary Key Column Name" type="text" class="px-2 py-2 rounded-md border-2 border-gray-400 focus:outline-none focus:border-indigo-500 w-full" />
          </div>
        </div>
        <div class="field space-y-1">
          <label class="font-bold">Auto Increment</label>
          <div class="control">
            <input v-model="autoIncrement" type="checkbox"> <span>Make primary key auto increment</span>
          </div>
        </div>
        <div class="buttons py-3 space-x-2">
          <button class="rounded-md py-2 px-3 bg-indigo-600 hover:bg-indigo-700 focus:outline-none font-bold text-white">Create Table</button>
          <button @click="closePopup" type="button" class="rounded-md py-2 px-3 border-3 bg-gray-200 hover:bg-gray-300 focus:outline-none font-bold">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
const host = import.meta.env.VITE_DB_HOST

export default defineComponent({
  data() {
    const tableName: string = ""
    const primaryKey: string = ""
    const autoIncrement: boolean = false
    const showError: boolean = false
    const showSuccess: boolean = false
    const message: string = ""

    return {
      tableName,
      primaryKey,
      autoIncrement,
      showError,
      showSuccess,
      message
    }
  },
  methods: {
    closePopup() {
      this.$emit('close')
    },
    createTable() {
      if (this.tableName.length === 0 || this.primaryKey.length === 0) {
        this.showError = true
      } else {
        const vm = this
        fetch(`${host}/_ht/create-table`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            tableName: vm.tableName,
            primaryKey: vm.primaryKey,
            autoIncrement: vm.autoIncrement
          })
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            vm.tableName = ""
            vm.primaryKey = ""

            vm.showSuccess = true
            vm.showSuccess = false
            vm.message = `Table ${vm.tableName} successfully created`
          } else {
            vm.showError = true
            vm.showSuccess = false
            vm.message = data.error
          }
        })
        .catch((e) => {
          vm.showError = true
          vm.showSuccess = false
          vm.message = e
        })
      }
    }
  }
})
</script>
