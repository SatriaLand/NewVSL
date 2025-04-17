<template>
  <section
    id="testimoni"
    class="py-16 px-4 sm:px-8 lg:px-16 bg-gray-850"
    aria-labelledby="testimonials-heading"
  >
    <div class="max-w-screen-xl mx-auto">
      <div class="text-center mb-12">
        <h2
          id="testimonials-heading"
          class="text-3xl sm:text-4xl font-bold text-white mb-4"
        >
          Apa Kata Mereka?
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Testimoni jujur dari pelanggan yang sudah merasakan kualitas pelayanan
          dan produk kami
        </p>
      </div>

      <!-- Testimoni Carousel -->
      <div class="relative" role="region" aria-label="Testimoni Carousel">
        <div
          class="flex overflow-x-auto snap-x snap-mandatory scroll-smooth py-4 hide-scrollbar px-8 gap-8"
          ref="testimonialContainer"
          @scroll="handleScroll"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
          role="list"
        >
          <!-- Clone item terakhir di awal -->
          <div
            v-if="testimonials.length > 1"
            class="slide-item"
            role="listitem"
            :class="{
              adjacent: activeTestimonial === 0,
              inactive:
                activeTestimonial !== 0 &&
                activeTestimonial !== testimonials.length - 1,
            }"
          >
            <TestimonialCard
              :testimonial="testimonials[testimonials.length - 1]"
            />
          </div>

          <!-- Item asli -->
          <div
            v-for="(testimonial, index) in testimonials"
            :key="index"
            class="slide-item"
            role="listitem"
            :class="{
              active: activeTestimonial === index,
              adjacent: isAdjacent(index),
              inactive: !isAdjacent(index) && activeTestimonial !== index,
            }"
          >
            <TestimonialCard :testimonial="testimonial" />
          </div>

          <!-- Clone item pertama di akhir -->
          <div
            v-if="testimonials.length > 1"
            class="slide-item"
            role="listitem"
            :class="{
              adjacent: activeTestimonial === testimonials.length - 1,
              inactive:
                activeTestimonial !== 0 &&
                activeTestimonial !== testimonials.length - 1,
            }"
          >
            <TestimonialCard :testimonial="testimonials[0]" />
          </div>
        </div>

        <!-- Navigation Buttons -->
        <button
          @click="scrollTestimonials(-1)"
          class="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-gray-800 dark:bg-gray-800 text-amber-rich p-2 rounded-full shadow-md hover:bg-amber-rich hover:text-white transition-colors z-20"
          aria-label="Testimoni sebelumnya"
        >
          <ChevronLeftIcon class="w-6 h-6" />
        </button>
        <button
          @click="scrollTestimonials(1)"
          class="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-gray-800 dark:bg-gray-800 text-amber-rich p-2 rounded-full shadow-md hover:bg-amber-rich hover:text-white transition-colors z-20"
          aria-label="Testimoni berikutnya"
        >
          <ChevronRightIcon class="w-6 h-6" />
        </button>
      </div>

      <!-- Dots Indicator -->
      <div
        class="flex justify-center mt-8 gap-2"
        role="navigation"
        aria-label="Navigasi Testimoni"
      >
        <button
          v-for="(_, index) in testimonials"
          :key="index"
          @click="goToTestimonial(index)"
          class="w-3 h-3 rounded-full transition-all duration-300"
          :class="
            activeTestimonial === index
              ? 'bg-amber-rich w-6'
              : 'bg-gray-300 dark:bg-gray-600'
          "
          :aria-label="'Ke testimoni ' + (index + 1)"
          :aria-current="activeTestimonial === index ? 'true' : null"
        ></button>
      </div>
    </div>
  </section>
</template>

<script>
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import TestimonialCard from "./TestimonialCard.vue";
import avatar1 from "@/assets/avatars/avatar1.jpg";
import avatar2 from "@/assets/avatars/avatar2.jpg";
import avatar3 from "@/assets/avatars/avatar3.jpg";
import avatar4 from "@/assets/avatars/avatar4.jpg";
import avatar5 from "@/assets/avatars/avatar5.jpg";

export default {
  name: "TestimonialsSection",
  components: {
    ChevronLeftIcon: ChevronLeft,
    ChevronRightIcon: ChevronRight,
    TestimonialCard,
  },
  data() {
    return {
      activeTestimonial: 2, // Default ke slide ke-3 (indeks 2)
      autoScrollInterval: null,
      isHovering: false,
      isScrolling: false,
      scrollDelay: 350,
      testimonials: [
        {
          name: "Budi Santoso",
          position: "Pemilik Rumah di Griya Harmoni",
          comment: "Sangat puas dengan pelayanan dan kualitas bangunannya...",
          rating: 5,
          date: "15 Januari 2023",
          avatar: avatar1,
        },
        {
          name: "Anita Wijaya",
          position: "Ibu Rumah Tangga",
          comment: "Lingkungan perumahan yang nyaman dan asri...",
          rating: 4,
          date: "2 Maret 2023",
          avatar: avatar2,
        },
        {
          name: "Dewi Kurnia",
          position: "Karyawan Swasta",
          comment: "Harga kompetitif dengan kualitas yang bagus...",
          rating: 5,
          date: "22 April 2023",
          avatar: avatar3,
        },
        {
          name: "Rudi Hermawan",
          position: "Pengusaha",
          comment:
            "Pelayanan sangat memuaskan, proses cepat dan hasilnya rapi.",
          rating: 5,
          date: "10 Mei 2023",
          avatar: avatar4,
        },
        {
          name: "Siti Rahayu",
          position: "Guru",
          comment:
            "Perumahan yang nyaman untuk keluarga, harga sesuai kualitas.",
          rating: 4,
          date: "25 Juni 2023",
          avatar: avatar5,
        },
      ],
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initCarousel();
      // Scroll ke testimonial ke-3 (indeks 2) saat pertama load
      setTimeout(() => {
        this.scrollTestimonials(1); // Geser sedikit setelah load
        setTimeout(() => this.scrollTestimonials(-1), 300); // Balik ke posisi
      }, 1000);
    });
    this.$refs.testimonialContainer.addEventListener("touchstart", () => {
      this.isHovering = true;
    });
    this.$refs.testimonialContainer.addEventListener("touchend", () => {
      this.isHovering = false;
    });
  },
  beforeUnmount() {
    this.destroyCarousel();
  },
  methods: {
    initCarousel() {
      if (this.testimonials.length > 1) {
        this.setupAutoScroll();
        this.$refs.testimonialContainer.addEventListener(
          "scroll",
          this.updateActiveTestimonial
        );
      }
    },
    destroyCarousel() {
      clearInterval(this.autoScrollInterval);
      this.$refs.testimonialContainer?.removeEventListener(
        "scroll",
        this.updateActiveTestimonial
      );
    },
    scrollTestimonials(direction) {
      if (this.isScrolling) return;

      // Hitung index berikutnya dengan mempertimbangkan boundary
      let nextIndex = this.activeTestimonial + direction;

      // Handle boundary cases
      if (nextIndex < 0) {
        nextIndex = this.testimonials.length - 1;
      } else if (nextIndex >= this.testimonials.length) {
        nextIndex = 0;
      }

      this.goToTestimonial(nextIndex);
    },
    isAdjacent(index) {
      const prev =
        (this.activeTestimonial - 1 + this.testimonials.length) %
        this.testimonials.length;
      const next = (this.activeTestimonial + 1) % this.testimonials.length;
      return index === prev || index === next;
    },
    smoothGoToTestimonial(index, direction) {
      if (this.isScrolling) return;
      this.isScrolling = true;

      const container = this.$refs.testimonialContainer;
      if (!container || this.testimonials.length <= 1) return;

      const items = container.children;
      const isLoopingForward =
        this.activeTestimonial === this.testimonials.length - 1 && index === 0;
      const isLoopingBackward =
        this.activeTestimonial === 0 && index === this.testimonials.length - 1;

      // 1. Hitung posisi target scroll
      let targetScroll;
      if (isLoopingForward) {
        targetScroll = items[items.length - 1].offsetLeft; // Clone pertama di akhir
      } else if (isLoopingBackward) {
        targetScroll = 0; // Clone terakhir di awal
      } else {
        targetScroll =
          items[index + 1].offsetLeft -
          (container.clientWidth - items[index + 1].offsetWidth) / 2;
      }

      // 2. Lakukan scroll dengan animasi
      container.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });

      // 3. Setelah animasi selesai, lakukan teleportasi diam-diam
      setTimeout(() => {
        if (isLoopingForward) {
          container.scrollLeft = items[1].offsetLeft; // Teleport ke item pertama asli
        } else if (isLoopingBackward) {
          container.scrollLeft = items[items.length - 2].offsetLeft; // Teleport ke item terakhir asli
        }

        this.activeTestimonial = index;
        this.isScrolling = false;
      }, this.scrollDelay);
    },
    getNextIndex(direction) {
      let nextIndex = this.activeTestimonial + direction;

      if (nextIndex < 0) {
        nextIndex = this.testimonials.length - 1;
      } else if (nextIndex >= this.testimonials.length) {
        nextIndex = 0;
      }

      return nextIndex;
    },
    handleScroll() {
      if (this.isScrolling) return;

      const container = this.$refs.testimonialContainer;
      if (!container) return;

      const scrollPos = container.scrollLeft;
      const containerWidth = container.clientWidth;
      const scrollWidth = container.scrollWidth;
      const tolerance = 5; // Pixel tolerance

      // Deteksi jika mencapai clone awal (scroll paling kiri)
      if (scrollPos <= tolerance) {
        this.isScrolling = true;
        // Teleport ke clone terakhir (diam-diam)
        container.scrollLeft = scrollWidth - containerWidth * 2;
        this.activeTestimonial = this.testimonials.length - 1;
        this.isScrolling = false;
      }
      // Deteksi jika mencapai clone akhir (scroll paling kanan)
      else if (scrollPos >= scrollWidth - containerWidth - tolerance) {
        this.isScrolling = true;
        // Teleport ke clone awal (diam-diam)
        container.scrollLeft = containerWidth;
        this.activeTestimonial = 0;
        this.isScrolling = false;
      }
    },
    updateActiveTestimonial() {
      const container = this.$refs.testimonialContainer;
      if (!container || this.testimonials.length <= 1) return;

      const items = Array.from(container.children).slice(1, -1); // Abaikan clone pertama & terakhir
      const containerCenter = container.scrollLeft + container.clientWidth / 2;

      const activeIndex = items.findIndex((item) => {
        const itemStart = item.offsetLeft;
        const itemEnd = itemStart + item.offsetWidth;
        return containerCenter >= itemStart && containerCenter <= itemEnd;
      });

      if (activeIndex !== -1) {
        this.activeTestimonial = activeIndex;
      }
    },
    goToTestimonial(index) {
      if (this.isScrolling || !this.$refs.testimonialContainer) return;

      this.isScrolling = true;
      const container = this.$refs.testimonialContainer;
      const items = container.children;

      // Kasus khusus: looping dari akhir ke awal
      if (
        this.activeTestimonial === this.testimonials.length - 1 &&
        index === 0
      ) {
        // Scroll ke clone pertama di akhir
        container.scrollTo({
          left: items[items.length - 1].offsetLeft,
          behavior: "smooth",
        });

        setTimeout(() => {
          // Teleportasi diam-diam ke item pertama asli
          container.scrollLeft = items[1].offsetLeft;
          this.activeTestimonial = index;
          this.isScrolling = false;
        }, this.scrollDelay);
      }
      // Kasus khusus: looping dari awal ke akhir
      else if (
        this.activeTestimonial === 0 &&
        index === this.testimonials.length - 1
      ) {
        // Scroll ke clone terakhir di awal
        container.scrollTo({
          left: 0,
          behavior: "smooth",
        });

        setTimeout(() => {
          // Teleportasi diam-diam ke item terakhir asli
          container.scrollLeft = items[items.length - 2].offsetLeft;
          this.activeTestimonial = index;
          this.isScrolling = false;
        }, this.scrollDelay);
      }
      // Navigasi normal
      else {
        // +1 karena ada clone di awal
        const targetItem = items[index + 1];
        const targetPosition =
          targetItem.offsetLeft -
          (container.clientWidth - targetItem.offsetWidth) / 2;

        container.scrollTo({
          left: targetPosition,
          behavior: "smooth",
        });

        setTimeout(() => {
          this.activeTestimonial = index;
          this.isScrolling = false;
        }, this.scrollDelay);
      }
    },

    setupAutoScroll() {
      clearInterval(this.autoScrollInterval);
      this.autoScrollInterval = setInterval(() => {
        if (
          !this.isHovering &&
          !this.isScrolling &&
          document.visibilityState === "visible"
        ) {
          this.scrollTestimonials(1);
        }
      }, 7000);
    },
    handleMouseEnter() {
      this.isHovering = true;
      clearInterval(this.autoScrollInterval);
    },
    handleMouseLeave() {
      this.isHovering = false;
      this.setupAutoScroll();
    },
  },
};
</script>

<style scoped>
/* Sembunyikan scrollbar */
.hide-scrollbar {
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  overscroll-behavior-x: contain;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Snap alignment */
.snap-x {
  scroll-snap-type: x mandatory;
}
.snap-center {
  scroll-snap-align: center;
}

/* Efek untuk card yang tidak aktif */
.opacity-50 {
  opacity: 0.5;
  filter: blur(2px);
}
.scale-95 {
  transform: scale(0.95);
}

/* Efek untuk card yang aktif */
.opacity-100 {
  opacity: 1;
  filter: none;
}
.scale-100 {
  transform: scale(1);
}

/* Smooth transition for all cards */
.flex-shrink-0 {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  backface-visibility: hidden;
  transform-style: preserve-3d;
  flex: 0 0 auto;
  scroll-snap-align: center;
}
.slide-item {
  flex: 0 0 auto;
  width: 65%;
  transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  backface-visibility: hidden;
  transform-style: preserve-3d;
  scroll-snap-align: center;
}

@media (max-width: 400px) {
  .slide-item {
    width: 100%;
  }
}

.active {
  opacity: 1;
  transform: scale(1);
  filter: none;
  z-index: 10;
}

.adjacent {
  opacity: 0.8;
  transform: scale(0.95);
  filter: blur(2px);
  z-index: 5;
}

.inactive {
  opacity: 0.6;
  transform: scale(0.9);
  filter: none; /* Tidak ada blur untuk slide yang tidak adjacent */
  z-index: 1;
}
</style>
