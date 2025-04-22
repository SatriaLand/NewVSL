<template>
  <section
    id="fitur"
    class="py-16 px-6 md:px-12 lg:px-24 bg-gray-850 text-white"
    aria-labelledby="fitur-heading"
  >
    <div class="max-w-7xl mx-auto">
      <h2
        id="fitur-heading"
        class="text-4xl font-serif font-semibold mb-12 text-center"
      >
        Fitur Unggulan
      </h2>

      <!-- Daftar Fitur -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        role="list"
        aria-live="polite"
        aria-label="Daftar fitur unggulan"
      >
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="p-6 bg-gray-900 rounded-xl shadow-lg focus-within:scale-105 hover:scale-105 transition-transform duration-300"
          role="listitem"
          tabindex="0"
          :aria-label="`Fitur ${index + 1}: ${feature.title}`"
          @keydown.enter="focusFeature(index)"
        >
          <component
            :is="feature.icon"
            class="w-12 h-12 mb-4 text-amber-rich"
            aria-hidden="true"
            loading="lazy"
          />
          <h3 class="text-xl font-medium mb-2">{{ feature.title }}</h3>
          <p class="text-gray-400">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ShieldCheck, MapPin, Home, Wallet } from "lucide-vue-next";

export default {
  name: "FiturUnggulan",
  components: { ShieldCheck, MapPin, Home, Wallet },
  data() {
    return {
      features: [
        {
          title: "Keamanan 24 Jam",
          description:
            "Lingkungan aman dengan sistem keamanan modern dan patroli rutin.",
          icon: ShieldCheck,
        },
        {
          title: "Lokasi Strategis",
          description: "Dekat akses tol, pusat perbelanjaan, dan fasilitas umum.",
          icon: MapPin,
        },
        {
          title: "Desain Modern",
          description:
            "Hunian bergaya modern dengan material berkualitas tinggi.",
          icon: Home,
        },
        {
          title: "Cicilan Mudah",
          description:
            "Tersedia skema pembayaran fleksibel sesuai kebutuhan Anda.",
          icon: Wallet,
        },
      ],
    };
  },
  methods: {
    focusFeature(index) {
      const featureElement = this.$el.querySelectorAll("[role='listitem']")[index];
      if (featureElement) featureElement.focus();
    },
  },
};
</script>

<style scoped>
/* Responsif untuk layar besar */
@media (min-width: 1024px) {
  #features {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }
}

/* Optimize hover and focus effects */
.focus-within\:scale-105:focus-within {
  transform: scale(1.05);
}
</style>
