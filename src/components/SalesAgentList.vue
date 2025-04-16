<template>
  <section id="agen" class="py-16 px-4 sm:px-8 lg:px-16 bg-gray-900">
    <div class="max-w-screen-xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">
          Tim Sales Profesional Kami
        </h2>
        <p class="text-lg text-gray-300 max-w-2xl mx-auto">
          Hubungi langsung sales kami untuk informasi lebih lanjut
        </p>
      </div>

      <AgentList :agents="agents" @open-modal="openModal" />

      <AgentModal 
        v-if="isModalOpen" 
        :agent="selectedAgent" 
        @close="closeModal" 
      />
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import AgentList from './AgentList.vue'
import AgentModal from './AgentModal.vue'
import agentsData from './agentsData.js'

const agents = ref(agentsData)
const isModalOpen = ref(false)
const selectedAgent = ref(null)

const openModal = (agent) => {
  selectedAgent.value = agent
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  isModalOpen.value = false
  document.body.style.overflow = 'auto'
}
</script>
