<template>
  <section
    id="mitra"
    class="py-16 px-4 sm:px-8 lg:px-16 bg-gray-850"
    aria-labelledby="mitra-heading"
  >
    <div class="max-w-screen-xl mx-auto">
      <div class="text-center mb-12">
        <h2
          id="mitra-heading"
          class="text-3xl sm:text-4xl font-bold text-white mb-4"
        >
          Mitra Bank Kami
        </h2>
        <p class="text-lg text-gray-300 max-w-2xl mx-auto">
          Bekerja sama dengan bank-bank terkemuka di Indonesia untuk memudahkan
          pembiayaan Anda
        </p>
      </div>

      <!-- Smooth Infinite Carousel -->
      <div
        class="relative overflow-hidden py-4"
        role="region"
        aria-label="Carousel Mitra Bank"
      >
        <div class="relative h-24">
          <div
            ref="carouselTrack"
            class="flex items-center absolute left-0 top-0 gap-8"
            :style="{ transform: `translateX(-${offset}px)` }"
            role="list"
          >
            <!-- Duplicate banks 3x for seamless looping -->
            <template v-for="n in 3" :key="n">
              <div
                v-for="(bank, index) in banks"
                :key="`${n}-${index}`"
                class="flex-shrink-0 w-40 h-20 flex items-center justify-center px-2"
                role="listitem"
                tabindex="0"
                :aria-label="`Bank ${bank.name}`"
              >
                <img
                  :src="bank.logo"
                  :alt="`Logo ${bank.name}`"
                  class="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// Direct imports for better reliability
import mandiriLogo from "@/assets/banklogo/mandiri.png";
//import bcaLogo from "@/assets/banklogo/bca.png";
import briLogo from "@/assets/banklogo/bri.png";
import bniLogo from "@/assets/banklogo/bni.png";
import cimbLogo from "@/assets/banklogo/cimb.png";
import btnsLogo from "@/assets/banklogo/btns.png";
import bsiLogo from "@/assets/banklogo/bsi.png";

const banks = [
  { id: 1, name: "Bank Mandiri", logo: mandiriLogo },
  { id: 2, name: "Bank BRI", logo: briLogo },
  { id: 3, name: "Bank BNI", logo: bniLogo },
  { id: 4, name: "Bank CIMB Niaga", logo: cimbLogo },
  { id: 5, name: "Bank BTN Syariah", logo: btnsLogo },
  { id: 6, name: "Bank Syariah Indonesia", logo: bsiLogo },
  ];

const carouselTrack = ref(null);
const offset = ref(0);
let animationId = null;
let lastTimestamp = 0;
const scrollSpeed = 30; // pixels per second
let itemWidth = 0;
let totalWidth = 0;

const calculateDimensions = () => {
  if (banks.length > 0 && carouselTrack.value) {
    // Calculate width of one bank item (including gap)
    const firstItem = carouselTrack.value.children[0];
    if (firstItem) {
      const style = window.getComputedStyle(firstItem);
      itemWidth = firstItem.offsetWidth + parseInt(style.marginRight);
      totalWidth = itemWidth * banks.length;
    }
  }
};

const animate = (timestamp) => {
  if (!lastTimestamp) lastTimestamp = timestamp;
  const deltaTime = (timestamp - lastTimestamp) / 1000; // convert to seconds
  lastTimestamp = timestamp;

  offset.value += scrollSpeed * deltaTime;

  // Reset to create infinite loop effect when we've scrolled one full set
  if (totalWidth > 0 && offset.value >= totalWidth) {
    offset.value = 0;
  }

  animationId = requestAnimationFrame(animate);
};

onMounted(() => {
  calculateDimensions();
  window.addEventListener("resize", calculateDimensions);

  // Start animation
  animationId = requestAnimationFrame(animate);
});

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId);
  window.removeEventListener("resize", calculateDimensions);
});
</script>

<style scoped>
/* Additional smoothness for the animation */
.transition-transform {
  will-change: transform;
  transition: transform 0.1s linear;
}
#mitra {
  padding-bottom: 20px; /* Hanya untuk memastikan scroll melewati section */
}
</style>
