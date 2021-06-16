<template>
  <div
    class="min-w-screen bg-gray-400 bg-opacity-60 h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none">
    <div class="flex flex-col p-8 bg-white shadow-md hover:shodow-lg rounded-2xl">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg"
            class="w-16 h-16 rounded-2xl p-3 border border-blue-100 text-blue-400 bg-blue-50" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div class="flex flex-col ml-3">
            <div class="font-medium leading-none">{{title}}</div>
            <p class="text-sm text-gray-600 leading-none mt-1"> {{message}}
            </p>
          </div>
        </div>
        <button mat-icon-button="" @click="emitConfirm"
          class="flex-no-shrink bg-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full focus:outline-none">Confirm</button>
          <button mat-icon-button="" @click="emitCacnel"
          class="flex-no-shrink bg-white px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-gray-400 rounded-full focus:outline-none">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['title', 'message'],

  methods: {
    emitConfirm() {
      this.$emit("confirm", 'renameColumn')
    },
    emitCancel() {
      this.$emit('cancel')
    }
  }
})
</script>
