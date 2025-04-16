<template>
  <transition name="fade">
    <div
      v-if="agent"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div class="bg-gray-800 rounded-xl max-w-md w-full p-6 relative">
        <button
          @click="$emit('close')"
          class="absolute top-4 right-4 text-gray-500 hover:text-amber-600"
        >
          <XIcon class="w-6 h-6" />
        </button>

        <div class="text-center">
          <img
            :src="agent.avatar"
            :alt="agent.name"
            class="w-24 h-24 rounded-full mx-auto object-cover border-4 border-amber-600 mb-4"
          />
          <h3 class="text-2xl font-bold text-white">{{ agent.name }}</h3>
          <p class="text-amber-600">{{ agent.position }}</p>
        </div>

        <div class="mt-6 space-y-4 text-gray-200">
          <div class="flex items-center">
            <PhoneIcon class="w-5 h-5 text-amber-600 mr-3" />
            <a :href="`tel:${agent.phone}`" class="hover:underline">
              {{ formatPhoneNumber(agent.phone) }}
            </a>
          </div>
          <div class="flex items-center">
            <MailIcon class="w-5 h-5 text-amber-600 mr-3" />
            <a :href="`mailto:${agent.email}`" class="hover:underline">
              {{ agent.email }}
            </a>
          </div>
          <div class="flex items-center">
            <MapPinIcon class="w-5 h-5 text-amber-600 mr-3" />
            <span>{{ agent.area }}</span>
          </div>
          <div class="flex items-center">
            <HomeIcon class="w-5 h-5 text-amber-600 mr-3" />
            <span>Spesialis: {{ agent.specialization }}</span>
          </div>
        </div>

        <div class="mt-6 pt-4 border-t border-gray-700">
          <h4 class="font-semibold text-white mb-2">
            Perumahan yang Ditangani:
          </h4>
          <ul class="list-disc list-inside space-y-1 text-sm text-gray-300">
            <li v-for="(project, index) in agent.projects" :key="index">
              {{ project }}
            </li>
          </ul>
        </div>

        <div class="mt-6 flex justify-center space-x-4">
          <a
            :href="`https://wa.me/${agent.phone.replace(/^\+?62|^0/, '62')}`"
            class="bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-300 shadow-md hover:shadow-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
              />
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue"; // Added computed here
import {
  XIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  HomeIcon,
} from "lucide-vue-next";

const props = defineProps({
  agent: {
    type: Object,
    required: true,
  },
});

defineEmits(["close"]);

const isValidWhatsappNumber = computed(() => {
  return /^(\+62|62|0)8[1-9][0-9]{6,9}$/.test(props.agent.phone); // Added props.
});

const formatPhoneNumber = (phone) => {
  if (!phone) return "";
  return phone
    .toString()
    .replace(/(\d{2})(\d{3})(\d{4})(\d{4})/, "+$1 $2-$3-$4");
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
