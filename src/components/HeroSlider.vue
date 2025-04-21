<template>
  <div
    class="relative w-full h-screen overflow-hidden"
    id="home"
    aria-labelledby="hero-slider-heading"
    role="region"
  >
    <!-- Slide Gambar -->
    <div
      class="flex transition-transform duration-1000 ease-in-out h-full"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      role="list"
      aria-live="polite"
    >
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="w-full h-full flex-none relative"
        role="listitem"
        :aria-label="`Slide ${index + 1} dari ${slides.length}: ${slide.alt}`"
      >
        <!-- Gambar untuk layar besar (HD) -->
        <img
          :src="slide.image"
          :alt="slide.alt"
          class="w-full h-full object-cover"
          :class="{ hidden: isSmallScreen }"
          loading="lazy"
          decoding="async"
        />

        <!-- Gambar untuk layar kecil (blur) -->
        <img
          :src="slide.image"
          :alt="slide.alt"
          class="w-full h-full object-cover blur-md"
          :class="{ hidden: !isSmallScreen }"
          loading="lazy"
          decoding="async"
        />

        <!-- Teks dan tombol hanya untuk layar <400px -->
        <div
          v-if="isSmallScreen"
          class="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white text-center px-4"
        >
          <h2 id="hero-slider-heading" class="text-lg font-bold mb-4">
            {{ slide.alt }}
          </h2>
          <button
            class="flex items-center justify-center gap-2 bg-amber-rich/90 text-white px-8 py-3 rounded-full hover:bg-amber-rich transition-all duration-300 group"
            @click="scrollToDaftar"
          >
            <span>Lihat Perumahan</span>
            <svg
              class="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Indikator (Dots) -->
    <div
      class="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2"
      role="navigation"
      aria-label="Navigasi slide"
    >
      <span
        v-for="(_, index) in slides"
        :key="index"
        @click="goToSlide(index)"
        class="w-3 h-3 rounded-full cursor-pointer"
        :class="index === currentIndex ? 'bg-amber-rich' : 'bg-gray-400'"
        :aria-label="`Ke slide ${index + 1}`"
        :aria-current="index === currentIndex ? 'true' : null"
        tabindex="0"
      />
    </div>
  </div>
</template>

<script>
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import slide1 from "@/assets/images/BGHERO.jpg";

export default {
  name: "HeroSlider",
  components: {
    ChevronLeftIcon: ChevronLeft,
    ChevronRightIcon: ChevronRight,
  },
  data() {
    return {
      currentIndex: 0,
      slides: [{ image: slide1, alt: "Building Dreams Creating Futures" }],
      autoSlideInterval: null,
      isSmallScreen: false,
    };
  },
  mounted() {
    this.startAutoSlide();
    this.checkScreenSize();
    window.addEventListener("resize", this.checkScreenSize);
  },
  beforeUnmount() {
    clearInterval(this.autoSlideInterval);
    window.removeEventListener("resize", this.checkScreenSize);
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
    checkScreenSize() {
      this.isSmallScreen = window.innerWidth < 400;
    },
    scrollToDaftar() {
      const daftarSection = document.getElementById("daftar");
      if (daftarSection) {
        daftarSection.scrollIntoView({ behavior: "smooth" });
      }
    },
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

/* Blur untuk gambar */
.blur-md {
  filter: blur(1px);
}

/* Responsif untuk mobile */
@media (max-width: 400px) {
  .hidden-mobile {
    display: none;
  }
}
</style>
