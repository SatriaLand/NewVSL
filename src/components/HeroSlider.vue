<template>
  <div class="relative w-full h-screen overflow-hidden" id="home">
    <!-- Slide Gambar -->
    <div
      class="flex transition-transform duration-1000 ease-in-out h-full"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="w-full h-full flex-none relative"
      >
        <!-- Gambar -->
        <img
          :src="slide.image"
          :alt="slide.alt"
          class="w-full h-full object-cover blur-sm md:blur-none"
        />
        <!-- Teks di atas gambar (hanya untuk mobile) -->
        <div
          class="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-center px-4 md:hidden"
        >
          <h2 class="text-lg font-bold">{{ slide.alt }}</h2>
        </div>
      </div>
    </div>

    <!-- Indikator (Dots) -->
    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
      <span
        v-for="(_, index) in slides"
        :key="index"
        @click="goToSlide(index)"
        class="w-3 h-3 rounded-full cursor-pointer"
        :class="index === currentIndex ? 'bg-amber-rich' : 'bg-gray-400'"
      />
    </div>
  </div>
</template>

<script>
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import slide1 from "@/assets/images/BGHERO1.jpg";
import slide2 from "@/assets/images/BGHERO2.jpg";
import slide3 from "@/assets/images/BGHERO3.jpg";

export default {
  name: "HeroSlider",
  components: {
    ChevronLeftIcon: ChevronLeft,
    ChevronRightIcon: ChevronRight,
  },
  data() {
    return {
      currentIndex: 0,
      slides: [
        { image: slide1, alt: "Perumahan Modern" },
        { image: slide2, alt: "Pemandangan Asri" },
        { image: slide3, alt: "Rumah Mewah" },
      ],
      autoSlideInterval: null,
    };
  },
  mounted() {
    this.startAutoSlide();
  },
  methods: {
    nextSlide() {
      window.requestAnimationFrame(() => {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
      });
    },
    prevSlide() {
      window.requestAnimationFrame(() => {
        this.currentIndex =
          (this.currentIndex - 1 + this.slides.length) % this.slides.length;
      });
    },
    goToSlide(index) {
      this.currentIndex = index;
    },
    startAutoSlide() {
      this.autoSlideInterval = setInterval(this.nextSlide, 7000); // 7 detik
    },
  },
  beforeUnmount() {
    clearInterval(this.autoSlideInterval);
  },
};
</script>

<style scoped>
/* Pastikan gambar memenuhi layar penuh */
img {
  object-fit: cover;
  height: 100%;
  width: 100%;
}

/* Tambahkan optimasi untuk transisi */
.flex {
  will-change: transform;
}

/* Responsif untuk mobile */
@media (max-width: 768px) {
  img {
    object-fit: cover;
    filter: blur(1px); /* Blur tipis untuk gambar di mobile */
  }
}
</style>
