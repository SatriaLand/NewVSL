<template>
  <!-- Backdrop -->
  <div
    class="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 transition-opacity duration-300"
    @click.self="$emit('close')"
    role="dialog"
    aria-modal="true"
    aria-labelledby="promo-modal-title"
  >
    <!-- Modal Container -->
    <div
      class="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden"
    >
      <!-- Modal Header -->
      <div
        class="sticky top-0 bg-gray-800 p-4 flex justify-between items-center border-b border-gray-700 z-10"
      >
        <h3 id="promo-modal-title" class="text-xl font-bold text-white">
          Promo Spesial {{ currentProperty.title }}
        </h3>
        <button
          @click="$emit('close')"
          class="text-gray-400 hover:text-white transition-colors"
          aria-label="Tutup modal"
        >
          <XIcon class="w-6 h-6" />
        </button>
      </div>

      <!-- Modal Content -->
      <div class="overflow-y-auto flex-1 p-6">
        <!-- Promo Banner -->
        <div class="mb-6 rounded-lg overflow-hidden relative">
          <img
            :src="currentProperty.image"
            :alt="'Banner Promo ' + currentProperty.title"
            class="w-full h-auto object-cover"
          />
          <div
            class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4"
          >
            <span class="text-xs bg-red-600 text-white px-2 py-1 rounded"
              >BERLAKU SAMPAI
              {{ promos[0]?.validUntil || "31 DESEMBER 2024" }}</span
            >
          </div>
        </div>

        <!-- Promo Content -->
        <div class="space-y-4">
          <div
            v-for="(promo, index) in promos"
            :key="index"
            class="bg-gray-700 p-4 rounded-lg border-l-4 border-green-500"
          >
            <h4 class="font-bold text-lg text-white mb-2">{{ promo.title }}</h4>
            <p class="text-gray-300 mb-3">{{ promo.description }}</p>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-400"
                >Berlaku sampai: {{ promo.validUntil }}</span
              >
              <span
                class="bg-green-900 text-green-300 px-3 py-1 rounded-full text-sm"
              >
                {{ promo.discount }}
              </span>
            </div>
          </div>
        </div>

        <!-- Property Info -->
        <div class="mt-6 bg-gray-700 p-4 rounded-lg">
          <h4 class="font-bold text-white mb-2">Info Properti:</h4>
          <div class="grid grid-cols-2 gap-2 text-gray-300 text-sm">
            <div>
              <span class="font-medium">Tipe:</span> {{ currentProperty.type }}
            </div>
            <div>
              <span class="font-medium">Luas Tanah:</span>
              {{ currentProperty.landSize }}
            </div>
            <div>
              <span class="font-medium">Kamar Tidur:</span>
              {{ currentProperty.bedrooms }}
            </div>
            <div>
              <span class="font-medium">Kamar Mandi:</span>
              {{ currentProperty.bathrooms }}
            </div>
            <div>
              <span class="font-medium">Harga:</span>
              {{ currentProperty.price }}
            </div>
            <div>
              <span class="font-medium">Status:</span>
              {{ currentProperty.status }}
            </div>
          </div>
        </div>

        <!-- Terms and Conditions -->
        <div class="mt-6 bg-gray-700 p-4 rounded-lg">
          <h4 class="font-bold text-white mb-2">Syarat & Ketentuan:</h4>
          <ul class="list-disc list-inside text-gray-300 text-sm space-y-1">
            <li>Promo tidak dapat digabungkan dengan promo lainnya</li>
            <li>Minimal pembelian {{ currentProperty.price }}</li>
            <li>
              Berlaku untuk pembelian sampai
              {{ promos[0]?.validUntil || "31 Desember 2024" }}
            </li>
            <li>Promo bisa berubah sewaktu-waktu tanpa pemberitahuan</li>
            <li v-if="currentProperty.status === 'Pre Order'">
              Hanya berlaku untuk pemesanan awal
            </li>
          </ul>
        </div>
      </div>

      <!-- Modal Footer -->
      <div
        class="sticky bottom-0 bg-gray-800 p-4 border-t border-gray-700 flex justify-center"
      >
        <a
          :href="
            'https://wa.me/' +
            currentProperty.contact +
            '?text=' +
            encodeURIComponent(
              'Halo, saya tertarik dengan promo berikut untuk properti ' +
              currentProperty.title +
              ': ' +
              promos.map(promo => promo.title).join(', ') +
              '. Apakah masih tersedia?'
            )
          "
          target="_blank"
          class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg flex items-center justify-center transition-colors w-full max-w-md"
        >
          <PhoneIcon class="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Hubungi Via WhatsApp
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { X, Gift, Phone } from "lucide-vue-next";

// Data promo untuk setiap properti
const propertyPromos = {
  "Carissma Mansion - Emerald": [
    {
      title: "DP 5% Cicilan Ringan",
      description:
        "DP mulai 5% dengan cicilan tetap selama 36 bulan untuk tipe 70/105.",
      validUntil: "31 Desember 2024",
      discount: "DP 5%",
    },
    {
      title: "Cashback 10 Juta",
      description: "Dapatkan cashback 10 juta untuk pembelian bulan ini.",
      validUntil: "30 November 2024",
      discount: "Cashback 10jt",
    },
  ],
  "Carissma Mansion - Ruby": [
    {
      title: "Bonus Perabotan",
      description:
        "Dapatkan paket perabotan senilai 15 juta untuk 5 pembeli pertama.",
      validUntil: "15 Desember 2024",
      discount: "Free Furnitur",
    },
  ],
  "Bukit Indah Lestari": [
    {
      title: "Diskon 5% Cash",
      description: "Diskon khusus 5% untuk pembelian secara tunai.",
      validUntil: "31 Januari 2025",
      discount: "Diskon 5%",
    },
    {
      title: "Free Biaya Notaris",
      description: "Gratis biaya notaris dan balik nama.",
      validUntil: "28 Februari 2025",
      discount: "Free Notaris",
    },
  ],
  // Default promo untuk properti lainnya
  default: [
    {
      title: "DP 10% Cicilan Fleksibel",
      description: "DP mulai 10% dengan cicilan fleksibel sampai 60 bulan.",
      validUntil: "31 Desember 2024",
      discount: "DP 10%",
    },
  ],
};

export default {
  name: "ModalPromo",
  components: {
    XIcon: X,
    GiftIcon: Gift,
    PhoneIcon: Phone,
  },
  props: {
    property: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      currentProperty: this.property,
      promos: propertyPromos[this.property.title] || propertyPromos.default,
    };
  },
  watch: {
    property(newVal) {
      this.currentProperty = newVal;
      this.promos = propertyPromos[newVal.title] || propertyPromos.default;
    },
  },
};
</script>

<style scoped>
/* Animasi untuk modal */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
