<template>
  <!-- Backdrop -->
  <div
    class="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 transition-opacity duration-300"
    @click.self="$emit('close')"
    role="dialog"
    aria-modal="true"
    :aria-labelledby="'modal-title-' + property.id"
  >
    <!-- Modal Container -->
    <div
      class="bg-gray-800 rounded-xl max-w-6xl w-full max-h-[90vh] flex flex-col"
      role="document"
    >
      <!-- Modal Header -->
      <div
        class="sticky top-0 bg-gray-800 p-4 flex justify-between items-center border-b border-gray-700 z-10 rounded-t-xl"
      >
        <h3
          :id="'modal-title-' + property.id"
          class="text-lg sm:text-xl md:text-2xl font-bold text-white break-words"
          :title="property.title"
        >
          {{ property.title }}
        </h3>
        <button
          @click="$emit('close')"
          class="text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-amber-rich"
          aria-label="Tutup modal"
        >
          <XIcon class="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      <!-- Modal Content -->
      <div class="overflow-y-auto flex-1 custom-scrollbar" tabindex="0">
        <div class="p-4 sm:p-6 grid md:grid-cols-2 gap-6">
          <!-- Media Section -->
          <div>
            <!-- Main Media with Fullscreen Button -->
            <div
              class="relative mb-4 rounded-lg overflow-hidden bg-gray-700 group"
              @mouseenter="showNavButtons = true"
              @mouseleave="showNavButtons = false"
            >
              <div class="aspect-w-16 aspect-h-9 relative">
                <img
                  v-if="currentMedia.type === 'image'"
                  :src="currentMedia.url"
                  :alt="property.title"
                  class="w-full h-full object-contain"
                  loading="lazy"
                  decoding="async"
                  @load="onImageLoad"
                  ref="mainImage"
                />
                <iframe
                  v-else
                  class="w-full h-full"
                  :src="currentMedia.url + '?autoplay=1'"
                  frameborder="0"
                  allowfullscreen
                  title="Video properti"
                  aria-label="Video properti"
                ></iframe>

                <!-- Fullscreen Button -->
                <button
                  @click="toggleFullscreen"
                  class="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full z-20 hover:bg-amber-rich transition-colors"
                  aria-label="Toggle fullscreen"
                >
                  <MaximizeIcon
                    v-if="!isFullscreen"
                    class="w-4 h-4 sm:w-5 sm:h-5"
                  />
                  <MinimizeIcon v-else class="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              <!-- Navigation Buttons -->
              <button
                @click.stop="prevMedia"
                class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 text-gray-800 p-2 rounded-full hover:bg-amber-rich hover:text-white z-20 transition-all duration-300"
                :class="{
                  'opacity-0 group-hover:opacity-100': !alwaysShowNavButtons,
                }"
                aria-label="Media sebelumnya"
              >
                <ChevronLeftIcon class="w-4 h-4 sm:w-5 sm:w-5" />
              </button>
              <button
                @click.stop="nextMedia"
                class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 text-gray-800 p-2 rounded-full hover:bg-amber-rich hover:text-white z-20 transition-all duration-300"
                :class="{
                  'opacity-0 group-hover:opacity-100': !alwaysShowNavButtons,
                }"
                aria-label="Media berikutnya"
              >
                <ChevronRightIcon class="w-4 h-4 sm:w-5 sm:w-5" />
              </button>

              <!-- Media Indicators -->
              <div
                class="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20"
                role="tablist"
                aria-label="Media navigation"
              >
                <button
                  v-for="(_, index) in mediaItems"
                  :key="index"
                  class="w-2 h-2 rounded-full transition-all"
                  :class="{
                    'bg-amber-rich w-4': currentMediaIndex === index,
                    'bg-white bg-opacity-50': currentMediaIndex !== index,
                  }"
                  @click="setCurrentMedia(index)"
                  :aria-label="'Media ' + (index + 1)"
                  :aria-selected="currentMediaIndex === index"
                  role="tab"
                ></button>
              </div>
            </div>

            <!-- Thumbnails -->
            <div
              class="flex space-x-2 overflow-x-auto py-2 px-1 custom-scrollbar-thin"
              role="list"
              aria-label="Media thumbnails"
            >
              <button
                v-for="(media, index) in mediaItems"
                :key="index"
                @click="setCurrentMedia(index)"
                :class="{
                  'ring-2 ring-amber-rich': currentMediaIndex === index,
                  'opacity-75 hover:opacity-100': currentMediaIndex !== index,
                }"
                class="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded overflow-hidden transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-amber-rich"
                :aria-label="`Tampilkan ${
                  media.type === 'image' ? 'gambar' : 'video'
                } ${index + 1}`"
                role="listitem"
              >
                <img
                  v-if="media.type === 'image'"
                  :src="media.url"
                  :alt="'Thumbnail ' + (index + 1)"
                  class="w-full h-full object-cover"
                  decoding="async"
                  @error="onThumbnailError(index)"
                  :ref="'thumbnail-' + index"
                />
                <div
                  v-else
                  class="w-full h-full bg-gray-700 flex items-center justify-center"
                >
                  <PlayIcon class="w-4 h-4 text-white" />
                </div>
              </button>
            </div>

            <!-- Facilities Section -->
            <div class="mt-6">
              <h4
                class="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-white flex items-center"
              >
                <StarIcon class="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-amber-rich" />
                Fasilitas Perumahan
              </h4>
              <div
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3"
              >
                <div
                  v-for="(facility, index) in property.facilities"
                  :key="index"
                  class="flex items-start bg-gray-700 p-2 sm:p-3 rounded-lg hover:bg-gray-600 transition-colors min-h-[40px]"
                >
                  <CheckIcon
                    class="w-3 h-3 sm:w-4 sm:h-4 mt-1 mr-2 text-amber-rich flex-shrink-0"
                  />
                  <span
                    class="text-xs sm:text-sm text-gray-300 break-words text-left"
                  >
                    {{ facility }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Property Info Section -->
          <div>
            <!-- Description -->
            <div class="mb-6">
              <h4 class="text-lg sm:text-xl font-semibold mb-2 text-white">
                Deskripsi
              </h4>
              <p class="text-sm sm:text-base text-gray-300 whitespace-pre-line">
                {{ property.description }}
              </p>
            </div>

            <!-- Property Details -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
              <div
                v-for="(detail, key) in propertyDetails"
                :key="key"
                class="bg-gray-700 p-3 sm:p-4 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <div class="flex items-center mb-1 sm:mb-2">
                  <component
                    :is="detail.icon"
                    class="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-amber-rich"
                  />
                  <span class="font-medium text-sm sm:text-base text-white">{{
                    detail.label
                  }}</span>
                </div>
                <p class="text-xs sm:text-sm text-gray-300">
                  {{ detail.value }}
                </p>
              </div>
            </div>

            <!-- Price and Documents -->
            <div
              class="bg-gray-700 p-4 rounded-lg mb-6 hover:bg-gray-600 transition-colors"
            >
              <h4
                class="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-white flex items-center"
              >
                <DollarSignIcon
                  class="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-amber-rich"
                />
                Harga dan Dokumen
              </h4>

              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-sm sm:text-base text-gray-300">Harga:</span>
                  <span class="font-bold text-amber-light text-base sm:text-lg">
                    {{ formatPrice(property.price) }}
                  </span>
                </div>

                <div
                  class="flex justify-between items-center py-2 border-t border-gray-600"
                >
                  <span class="text-sm sm:text-base text-gray-300">DP:</span>
                  <span class="font-medium text-sm sm:text-base">
                    {{ formatPrice(property.dp) }}
                  </span>
                </div>

                <div
                  class="flex justify-between items-center py-2 border-t border-gray-600"
                >
                  <span class="text-sm sm:text-base text-gray-300"
                    >Sertifikat:</span
                  >
                  <span class="font-medium text-sm sm:text-base">{{
                    property.certificate
                  }}</span>
                </div>

                <div
                  class="flex justify-between items-center py-2 border-t border-gray-600"
                >
                  <span class="text-sm sm:text-base text-gray-300">PBG:</span>
                  <span class="font-medium text-sm sm:text-base">{{
                    property.pbg
                  }}</span>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <a
                :href="
                  'https://wa.me/' +
                  property.contact +
                  '?text=' +
                  encodeURIComponent(
                    'Halo, saya tertarik dengan properti ini: ' + property.title
                  )
                "
                target="_blank"
                class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500 text-sm sm:text-base"
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
                Hubungi via WhatsApp
              </a>
              <button
                @click="openPromoModal(property)"
                class="border border-green-500 text-green-500 hover:bg-green-500 hover:bg-opacity-30 px-4 py-2 sm:px-6 sm:py-3 rounded-lg flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500 text-sm sm:text-base"
              >
                <GiftIcon class="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Lihat Promo
              </button>

              <!-- Modal Promo -->
              <ModalPromo
                v-if="showPromoModal"
                :property="selectedProperty"
                @close="closePromoModal"
              />
            </div>

            <!-- Map Location -->
            <div class="mt-6">
              <h4
                class="text-lg sm:text-xl font-semibold text-white flex items-center mb-2"
              >
                <MapIcon class="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-amber-rich" />
                Lokasi Peta
              </h4>
              <div
                class="aspect-w-16 aspect-h-9 bg-gray-700 rounded-lg overflow-hidden border border-gray-600"
              >
                <iframe
                  class="w-full h-48 sm:h-64"
                  :src="property.mapUrl"
                  frameborder="0"
                  allowfullscreen
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                  aria-label="Peta lokasi properti"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ChevronLeft,
  ChevronRight,
  X,
  Home,
  MapPin,
  Ruler,
  Bed,
  Bath,
  Layers,
  DollarSign,
  Phone,
  Play,
  Star,
  Check,
  Map,
  Gift,
  ExternalLink,
  Maximize2 as Maximize,
  Minimize2 as Minimize,
} from "lucide-vue-next";
import ModalPromo from "./ModalPromo.vue";
import debounce from "lodash.debounce";

export default {
  name: "ModalDetailPerumahan",
  props: {
    property: {
      type: Object,
      required: true,
      validator(value) {
        return "price" in value;
      },
    },
  },
  components: {
    ChevronLeftIcon: ChevronLeft,
    ChevronRightIcon: ChevronRight,
    XIcon: X,
    HomeIcon: Home,
    MapPinIcon: MapPin,
    RulerIcon: Ruler,
    BedIcon: Bed,
    BathIcon: Bath,
    LayersIcon: Layers,
    DollarSignIcon: DollarSign,
    PhoneIcon: Phone,
    PlayIcon: Play,
    StarIcon: Star,
    CheckIcon: Check,
    MapIcon: Map,
    GiftIcon: Gift,
    ExternalLinkIcon: ExternalLink,
    MaximizeIcon: Maximize,
    MinimizeIcon: Minimize,
    ModalPromo,
  },
  data() {
    return {
      currentMediaIndex: 0,
      showNavButtons: false,
      navButtonTimeout: null,
      isFullscreen: false,
      showPromoModal: false,
      alwaysShowNavButtons: false,
      selectedProperty: null, // Properti untuk modal promo
      zoomScale: 1, // Skala zoom untuk gambar
      isDragging: false, // Status drag
      dragStart: { x: 0, y: 0 }, // Posisi awal drag
      imageOffset: { x: 0, y: 0 }, // Offset gambar saat di-drag
      dragDelta: { x: 0, y: 0 }, // Delta pergerakan drag
    };
  },
  computed: {
    mediaItems() {
      return this.property?.media || [];
    },
    currentMedia() {
      return this.mediaItems[this.currentMediaIndex] || {};
    },
    propertyDetails() {
      return [
        {
          icon: "HomeIcon",
          label: "Tipe Rumah",
          value: this.property.type || "-",
        },
        {
          icon: "MapPinIcon",
          label: "Lokasi",
          value: this.property.location || "-",
        },
        {
          icon: "RulerIcon",
          label: "Luas Tanah",
          value: this.property.landSize || "-",
        },
        {
          icon: "BedIcon",
          label: "Kamar Tidur",
          value: this.property.bedrooms || "-",
        },
        {
          icon: "BathIcon",
          label: "Kamar Mandi",
          value: this.property.bathrooms || "-",
        },
        {
          icon: "LayersIcon",
          label: "Lantai",
          value: this.property.floors || "-",
        },
      ];
    },
  },
  methods: {
    nextMedia() {
      this.currentMediaIndex =
        (this.currentMediaIndex + 1) % this.mediaItems.length;
    },
    prevMedia() {
      this.currentMediaIndex =
        (this.currentMediaIndex - 1 + this.mediaItems.length) %
        this.mediaItems.length;
    },
    setCurrentMedia(index) {
      this.currentMediaIndex = index;
    },
    formatPrice(price) {
      if (!price) return "Harga belum tersedia";

      const numericValue = String(price).replace(/[^0-9]/g, "");
      const number = Number(numericValue);

      if (isNaN(number)) return "Harga tidak valid";

      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      })
        .format(number)
        .replace("IDR", "Rp");
    },
    onImageLoad(event) {
      event.target.classList.add("loaded"); // Tambahkan kelas 'loaded' saat gambar selesai dimuat
    },
    validateMediaUrls() {
      this.mediaItems.forEach((media, index) => {
        if (media.type === "image" && (!media.url || media.url.trim() === "")) {
          console.warn(
            `URL gambar kosong atau tidak valid pada index ${index}.`
          );
          this.mediaItems[index].url = "/assets/images/default-thumbnail.jpg"; // Ganti dengan gambar default
        }
      });
    },
    toggleFullscreen: debounce(function () {
      const elem = this.$refs.mainImage?.parentElement; // Ambil elemen container, bukan gambar langsung
      if (!elem) return;

      if (!this.isFullscreen) {
        // Masuk ke mode fullscreen
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen();
        }
        this.isFullscreen = true;
        this.addZoomListeners(); // Tambahkan event listener untuk zoom
      } else {
        // Keluar dari mode fullscreen
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
        this.isFullscreen = false;
        this.removeZoomListeners(); // Hapus event listener untuk zoom
        this.resetImageTransform(); // Reset transformasi gambar
      }
    }, 300), // Debounce selama 300ms
    addZoomListeners() {
      const image = this.$refs.mainImage;
      if (image) {
        image.addEventListener("wheel", this.handleZoom);
        image.addEventListener("mousedown", this.startDrag);
      }
      document.addEventListener("mouseup", this.stopDrag);
      document.addEventListener("mousemove", this.handleDrag);
    },
    removeZoomListeners() {
      const image = this.$refs.mainImage;
      if (image) {
        image.removeEventListener("wheel", this.handleZoom);
        image.removeEventListener("mousedown", this.startDrag);
      }
      document.removeEventListener("mouseup", this.stopDrag);
      document.removeEventListener("mousemove", this.handleDrag);
    },
    startDrag(event) {
      if (this.zoomScale > 1) {
        this.isDragging = true;
        this.dragStart = { x: event.clientX, y: event.clientY };
        const image = this.$refs.mainImage;
        if (image) {
          image.style.transition = "none"; // Matikan transisi saat drag dimulai
        }
      }
    },
    stopDrag() {
      if (this.isDragging) {
        this.isDragging = false;
        const image = this.$refs.mainImage;
        if (image) {
          image.style.transition = "transform 0.2s ease"; // Hidupkan transisi setelah drag selesai
        }
      }
    },
    handleDrag(event) {
      if (this.isDragging && this.zoomScale > 1) {
        const deltaX = event.clientX - this.dragStart.x;
        const deltaY = event.clientY - this.dragStart.y;
        this.dragStart = { x: event.clientX, y: event.clientY };
        this.imageOffset.x += deltaX;
        this.imageOffset.y += deltaY;

        const image = this.$refs.mainImage;
        if (image) {
          image.style.transform = `scale(${this.zoomScale}) translate(${this.imageOffset.x}px, ${this.imageOffset.y}px)`;
        }
      }
    },
    handleZoom(event) {
      event.preventDefault();
      const zoomStep = 0.1;
      if (event.deltaY < 0) {
        // Zoom in
        this.zoomScale = Math.min(this.zoomScale + zoomStep, 3); // Maksimal zoom 3x
      } else {
        // Zoom out
        this.zoomScale = Math.max(this.zoomScale - zoomStep, 1); // Minimal zoom 1x
      }

      if (this.zoomScale === 1) {
        // Reset offset jika zoom kembali ke 1x
        this.imageOffset = { x: 0, y: 0 };
      }

      const image = this.$refs.mainImage;
      if (image) {
        image.style.transition = "transform 0.2s ease"; // Tambahkan transisi saat zoom
        image.style.transform = `scale(${this.zoomScale}) translate(${this.imageOffset.x}px, ${this.imageOffset.y}px)`;
      }
    },
    handleFullscreenChange() {
      this.isFullscreen = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
      );
    },
    checkDeviceSupport() {
      const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;
      if (isTouchDevice) {
        this.alwaysShowNavButtons = true;
      }
    },
    openPromoModal(property) {
      this.selectedProperty = property; // Atur properti yang dipilih
      this.showPromoModal = true; // Tampilkan modal promo
    },
    closePromoModal() {
      this.showPromoModal = false; // Sembunyikan modal promo
    },
    onThumbnailLoad(index) {
      console.log(
        `Thumbnail ${index} berhasil dimuat: ${this.mediaItems[index].url}`
      );
      const imgElement = this.$refs[`thumbnail-${index}`];
      if (imgElement) {
        imgElement.classList.add("loaded");
      }
    },
    onThumbnailError(index) {
      console.error(
        `Gambar thumbnail pada index ${index} gagal dimuat: ${this.mediaItems[index].url}`
      );
      this.mediaItems[index].url = "/assets/images/default-thumbnail.jpg"; // Ganti dengan gambar default
    },
    resetImageTransform() {
      this.zoomScale = 1;
      this.imageOffset = { x: 0, y: 0 };
      const image = this.$refs.mainImage;
      if (image) {
        image.style.transition = "transform 0.2s ease"; // Tambahkan transisi saat reset
        image.style.transform = `scale(1) translate(0, 0)`;
      }
    },
  },
  mounted() {
    document.addEventListener("fullscreenchange", this.handleFullscreenChange);
    document.addEventListener(
      "webkitfullscreenchange",
      this.handleFullscreenChange
    );
    document.addEventListener(
      "msfullscreenchange",
      this.handleFullscreenChange
    );
    this.checkDeviceSupport();
    this.validateMediaUrls(); // Validasi URL media saat komponen dimuat
  },
  beforeUnmount() {
    document.removeEventListener(
      "fullscreenchange",
      this.handleFullscreenChange
    );
    document.removeEventListener(
      "webkitfullscreenchange",
      this.handleFullscreenChange
    );
    document.removeEventListener(
      "msfullscreenchange",
      this.handleFullscreenChange
    );
    clearTimeout(this.navButtonTimeout);
    this.removeZoomListeners(); // Pastikan listener dihapus saat komponen dilepas
  },
};
</script>

<style scoped>
/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  height: 4px; /* Make scrollbar thinner */
  width: 4px; /* Add width for vertical scrollbars */
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
.custom-scrollbar-thin::-webkit-scrollbar {
  height: 2px; /* Make thin scrollbar even thinner */
  width: 2px; /* Add width for vertical scrollbars */
}
/* Responsive Text Truncation */
@media (max-width: 640px) {
  .responsive-truncate {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

/* Tambahkan gaya untuk memastikan gambar tidak terpotong */
img.object-contain {
  object-fit: contain; /* Pastikan gambar sepenuhnya terlihat */
  object-position: center; /* Posisikan gambar di tengah */
}

/* Optimasi untuk gambar */
img[loading="lazy"] {
  transition: opacity 0.3s ease-in-out;
  opacity: 0;
}
img[loading="lazy"].loaded {
  opacity: 1;
}

/* Focus outline for better accessibility */
button:focus {
  outline: 2px solid #f59e0b; /* Amber color */
  outline-offset: 2px;
}
</style>
