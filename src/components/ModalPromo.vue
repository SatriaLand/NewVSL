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
      role="document"
    >
      <!-- Modal Header -->
      <div
        class="sticky top-0 bg-gray-800 p-4 flex justify-between items-center border-b border-gray-700 z-10"
      >
        <h3 id="promo-modal-title" class="text-xl font-bold text-white">
          Promo Special {{ currentProperty.title }}
        </h3>
        <button
          @click="$emit('close')"
          class="text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-amber-rich"
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
            loading="lazy"
            decoding="async"
          />
          <div
            class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4"
          >
            <span class="text-xs bg-red-600 text-white px-2 py-1 rounded"
              >BERLAKU SAMPAI
              {{ promos[0]?.validUntil || "-" }}</span
            >
          </div>
        </div>

        <!-- Promo Content -->
        <div class="space-y-4" role="list" aria-label="Daftar promo">
          <div
            v-for="(promo, index) in promos"
            :key="index"
            class="bg-gray-700 p-4 rounded-lg border-l-4 border-green-500"
            role="listitem"
          >
            <h4 class="font-bold text-lg text-white mb-2">{{ promo.title }}</h4>
            <p class="text-gray-300 mb-3">{{ promo.description }}</p>
            <div class="flex flex-wrap justify-between items-center gap-2">
              <span class="text-sm text-gray-400 whitespace-nowrap">
                Berlaku sampai: {{ promo.validUntil }}
              </span>
              <span
                class="bg-green-900/80 text-green-300 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap"
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
              {{
                currentProperty.price > 0
                  ? formatPrice(currentProperty.price)
                  : "Harga tidak tersedia"
              }}
            </div>
            <div>
              <span class="font-medium">DP:</span>
              {{
                currentProperty.dp
                  ? formatPrice(
                      Number(currentProperty.dp.replace(/[^\d]/g, ""))
                    )
                  : "DP tidak tersedia"
              }}
            </div>
          </div>
        </div>

        <!-- Terms and Conditions -->
        <div
          class="mt-6 bg-gray-700 p-4 rounded-lg"
          role="region"
          aria-labelledby="terms-title"
        >
          <h4 id="terms-title" class="font-bold text-white mb-2">
            Syarat & Ketentuan:
          </h4>
          <ul class="list-disc list-inside text-gray-300 text-sm space-y-1">
            <li>Promo tidak dapat digabungkan dengan promo lainnya</li>
            <li>
              Minimal pembelian
              {{
                currentProperty.price > 0
                  ? formatPrice(currentProperty.price)
                  : "Harga tidak tersedia"
              }}
            </li>
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
        role="contentinfo"
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
                promos.map((promo) => promo.title).join(', ') +
                '. Apakah masih tersedia?'
            )
          "
          target="_blank"
          class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg flex items-center justify-center transition-colors w-full max-w-md"
          aria-label="Hubungi via WhatsApp untuk promo properti"
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
          Hubungi Via WhatsApp
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { X, Gift, Phone } from "lucide-vue-next";
import { properties } from "./propertiesData";
import { propertyPromos } from "./propertyPromos";

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
      currentProperty: this.getPropertyData(this.property.title),
      promos: propertyPromos[this.property.title] || propertyPromos.default,
    };
  },
  watch: {
    property(newVal) {
      this.currentProperty = this.getPropertyData(newVal.title);
      this.promos = propertyPromos[newVal.title] || propertyPromos.default;
    },
  },
  methods: {
    getPropertyData(title) {
      const property = properties.find((p) => p.title === title);
      if (property) {
        return {
          ...property,
          price: Number(property.price.replace(/[^\d]/g, "")) || 0,
        };
      }
      return { price: 0 };
    },
    formatPrice(price) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(price);
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
