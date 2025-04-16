<template>
    <div class="flex flex-col items-center space-y-0.5 sm:space-y-1">
      <div class="relative group">
        <img
          :src="agent.avatar"
          :alt="agent.name"
          class="rounded-full ring-2 ring-amber-600 object-cover cursor-pointer
                 w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20
                 hover:scale-105 transition-transform duration-200"
          @click="modalOpen = true"
        />
        <!-- Overlay teks hover yang lebih sederhana -->
        <div
          class="absolute inset-0 rounded-full flex items-center justify-center 
                 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 
                 transition-opacity duration-150 pointer-events-none"
        >
        </div>
      </div>
      <p class="text-[10px] xs:text-xs text-center font-medium text-white truncate max-w-[60px] xs:max-w-[80px] sm:max-w-[100px]">
        {{ agent.name.split(' ')[0] }}
      </p>
  
      <!-- Modal Agent -->
      <AgentModal
        v-if="modalOpen"
        :agent="agent"
        @close="modalOpen = false"
      />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import AgentModal from './AgentModal.vue'
  
  defineProps({
    agent: {
      type: Object,
      required: true
    }
  })
  
  const modalOpen = ref(false)
  </script>