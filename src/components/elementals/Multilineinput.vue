<template>
  <div>
    <div class="w-1/3 absolute left-1/4 top-1/6 bg-gray-50 border rounded-md px-4 py-3 border-gray-400">
      <h1 class="text-lg text-gray-500">Multiline input</h1>
      <textarea ref="textbox" v-model="text" class="px-3 py-3 h-32 focus:outline-none w-full rounded-md border-2 border-gray-400 focus:border-indigo-500"></textarea>

      <div class="buttons py-2 space-x-3">
        <button @click="save" class="bg-blue-500 rounded-md text-white px-3 py-2 hover:bg-blue-600 focus:outline-none">Save Data</button>
        <button @click="close" class="focus:outline-none">Close</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['currentValue'],
  data() {
    const text:string = ""
    return {
      text
    }
  },
  watch: {
   currentValue(text) {
     this.text = text
   }
  }
  ,
  mounted() {
    this.text = this.currentValue
    const textbox:HTMLTextAreaElement = this.$refs['textbox'] as HTMLTextAreaElement
    textbox.focus()
  },
  methods: {
    save() {
      this.$emit('save-multiline', this.text)
    },
    close() {
      this.$emit('close-multiline-popup')
    }
  }
})
</script>
