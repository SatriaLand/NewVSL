<template>
  <section id="daftar" class="py-16 px-4 sm:px-8 lg:px-16 bg-gray-900">
    <div class="max-w-screen-xl mx-auto">
      <h2 class="text-4xl font-bold text-center mb-12 text-white">
        Daftar Perumahan
      </h2>

      <!-- Carousel Container -->
      <div class="relative overflow-hidden" ref="carousel">
        <div
          class="flex transition-transform duration-700 ease-in-out"
          :style="{ transform: `translateX(${calculateTranslateX()}px)` }"
        >
          <!-- Property Card -->
          <div
            v-for="(property, index) in properties"
            :key="index"
            :class="{
              'opacity-100 scale-100 z-10': currentIndex === index,
              'opacity-50 scale-95': currentIndex !== index,
            }"
            class="bg-gray-800 rounded-xl p-6 mx-2 flex-shrink-0 transition-all duration-500 hover:shadow-lg hover:shadow-amber-light/20"
            :style="{ width: `${slideWidth - 16}px` }"
          >
            <img
              :src="property.image"
              :alt="property.title"
              class="w-full h-64 object-cover rounded-md mb-4"
            />
            <h3 class="text-2xl font-semibold mb-2 text-white">
              {{ property.title }}
            </h3>
            <p class="text-gray-400 mb-4">{{ property.location }}</p>
            <div class="flex justify-between items-center">
              <span class="text-amber-rich font-bold">{{ property.price }}</span>
              <button
                @click="openModal(property)"
                class="bg-amber-rich text-white py-2 px-4 rounded-lg hover:bg-amber-dark transition-colors flex items-center"
              >
                <EyeIcon class="w-5 h-5 mr-1" />
                Detail
              </button>
            </div>
          </div>
        </div>

        <!-- Navigasi Carousel -->
        <button
          @click="prevSlide"
          class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-amber-rich p-2 rounded-full hover:bg-amber-rich hover:text-white z-20 transition-colors shadow-lg"
          aria-label="Slide Sebelumnya"
        >
          <ChevronLeftIcon class="w-6 h-6" />
        </button>
        <button
          @click="nextSlide"
          class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-amber-rich p-2 rounded-full hover:bg-amber-rich hover:text-white z-20 transition-colors shadow-lg"
          aria-label="Slide Berikutnya"
        >
          <ChevronRightIcon class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Modal Detail -->
    <ModalDetailPerumahan 
      v-if="isModalOpen"
      :property="selectedProperty"
      @close="closeModal"
    />
  </section>
</template>

<script>
import { ChevronLeft, ChevronRight, Eye } from "lucide-vue-next";
import { properties } from "./propertiesData.js";
import ModalDetailPerumahan from "./ModalDetailPerumahan.vue";

export default {
  name: "DaftarPerumahan",
  components: {
    ChevronLeftIcon: ChevronLeft,
    ChevronRightIcon: ChevronRight,
    EyeIcon: Eye,
    ModalDetailPerumahan
  },
  data() {
    return {
      currentIndex: 3, // Mulai dari slide ke-4
      slideWidth: 0,
      visibleSlides: 1,
      containerWidth: 0,
      isModalOpen: false,
      selectedProperty: null,
      properties
    };
  },
  mounted() {
    this.updateSlideWidth();
    window.addEventListener("resize", this.updateSlideWidth);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateSlideWidth);
  },
  methods: {
    updateSlideWidth() {
      this.containerWidth = this.$refs.carousel?.offsetWidth || 0;

      if (this.containerWidth >= 1024) {
        this.visibleSlides = 3;
      } else if (this.containerWidth >= 768) {
        this.visibleSlides = 2;
      } else {
        this.visibleSlides = 1;
      }

      this.slideWidth = this.containerWidth / Math.max(this.visibleSlides, 1);
    },
    calculateTranslateX() {
      const centerOffset = (this.containerWidth - this.slideWidth) / 2;
      return -(this.currentIndex * this.slideWidth - centerOffset);
    },
    nextSlide() {
      if (this.currentIndex < this.properties.length - 1) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0;
      }
    },
    prevSlide() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        this.currentIndex = this.properties.length - 1;
      }
    },
    openModal(property) {
      this.selectedProperty = property;
      this.isModalOpen = true;
      document.body.style.overflow = "hidden";
    },
    closeModal() {
      this.isModalOpen = false;
      document.body.style.overflow = "auto";
    }
  }
};
</script>

<style scoped>
/* Efek untuk slide tidak aktif */
.opacity-50 {
  filter: blur(2px);
}

/* Pastikan container carousel memiliki overflow yang tepat */
.relative {
  overflow: hidden;
}

/* Transisi halus untuk transformasi */
.transition-transform {
  transition: transform 0.5s ease-in-out;
}
</style>