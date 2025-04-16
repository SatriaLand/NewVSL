<template>
  <div>
    <!-- Grid untuk menampilkan agent -->
    <div
      class="grid grid-cols-3 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 md:gap-6 lg:grid-cols-5 lg:gap-8"
    >
      <div
        v-for="agent in visibleAgents"
        :key="agent.id"
        class="relative flex flex-col items-center"
      >
        <!-- Konten agent -->
        <div
          class="relative group cursor-pointer"
          @click="handleClick(agent)"
          @touchstart.passive="handleTouchStart(agent)"
        >
          <img
            :src="agent.avatar"
            :alt="agent.name"
            class="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full object-cover border-[3px] border-white hover:border-amber-rich shadow-md transition-all duration-300 group-hover:scale-105 group-hover:border-amber-rich"
          />

          <div
            class="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full transition-opacity duration-300 delay-100"
            :class="{
              'opacity-100': visibleTooltips[agent.id],
              'opacity-0 sm:group-hover:opacity-100':
                !visibleTooltips[agent.id],
            }"
          >
            <div
              class="bg-black bg-opacity-70 text-white text-xs sm:text-sm rounded-full px-2 py-1 whitespace-nowrap"
            >
              Klik Saya
            </div>
          </div>
        </div>

        <div class="mt-2 text-center">
          <h3 class="text-xs sm:text-sm font-medium text-white">
            {{ agent.name }}
          </h3>
          <p class="text-[10px] sm:text-xs text-gray-400">
            {{ agent.position }}
          </p>
        </div>
      </div>
    </div>

    <!-- Tombol Aksi -->
    <div v-if="showLoadButtons" class="mt-6 text-center">
      <button
        @click="handleLoadAction"
        class="px-4 py-1.5 sm:px-6 sm:py-2 border border-amber-rich text-amber-rich hover:bg-amber-rich/10 rounded-full font-medium transition-all duration-300 text-xs sm:text-sm"
        :class="{
          'text-white border-white hover:bg-white/10': isShowingLess,
        }"
      >
        {{
          isShowingLess ? "Tampilkan Lebih Banyak" : "Tampilkan Lebih Sedikit"
        }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from "vue";

const props = defineProps({
  agents: Array,
  initialItems: {
    type: Number,
    default: 10,
  },
  itemsPerLoad: {
    type: Number,
    default: 10,
  },
});

const emit = defineEmits(["open-modal"]);

// Variabel untuk pagination
const visibleCount = ref(props.initialItems);
const isShowingLess = ref(true);

// Local variable for responsive initial items
const responsiveInitialItems = ref(props.initialItems);

// Computed properties
const visibleAgents = computed(() => {
  return props.agents.slice(0, visibleCount.value);
});

const showLoadButtons = computed(() => {
  return props.agents.length > responsiveInitialItems.value;
});

const hasMoreAgents = computed(() => {
  return visibleCount.value < props.agents.length;
});

// Fungsi untuk handle tombol
const handleLoadAction = () => {
  if (hasMoreAgents.value) {
    // Tampilkan lebih banyak
    visibleCount.value += props.itemsPerLoad;
    if (visibleCount.value >= props.agents.length) {
      isShowingLess.value = false;
    }
  } else {
    // Kembali ke jumlah awal
    visibleCount.value = responsiveInitialItems.value;
    isShowingLess.value = true;
  }
};

// Kode tooltip yang sudah ada
const visibleTooltips = reactive({});
const lastTooltipTime = reactive({});
const hasPointerFine = ref(false);

onMounted(() => {
  hasPointerFine.value = window.matchMedia("(pointer: fine)").matches;

  // Responsive initial items count
  const updateInitialItems = () => {
    if (window.innerWidth < 640) {
      responsiveInitialItems.value = 6;
    } else if (window.innerWidth < 768) {
      responsiveInitialItems.value = 9;
    } else if (window.innerWidth < 1024) {
      responsiveInitialItems.value = 8;
    } else {
      responsiveInitialItems.value = 10;
    }
    visibleCount.value = responsiveInitialItems.value;
  };

  window.addEventListener("resize", updateInitialItems);
  updateInitialItems();
});

const handleClick = (agent) => {
  emit("open-modal", agent);

  if (!hasPointerFine.value) {
    visibleTooltips[agent.id] = true;
    setTimeout(() => {
      visibleTooltips[agent.id] = false;
    }, 1000);
  }
};

const handleTouchStart = (agent) => {
  if (!hasPointerFine.value) {
    const now = Date.now();
    const lastShown = lastTooltipTime[agent.id] || 0;

    if (now - lastShown < 1000) {
      emit("open-modal", agent);
    }
  }
};
</script>
