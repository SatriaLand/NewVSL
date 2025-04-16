<template>
  <footer class="bg-gray-900 text-white py-8" id="kontak">
    <div class="container mx-auto px-4">
      <!-- Centered Grid Layout -->
      <div
        class="grid grid-cols-1 md:grid-cols-3 gap-1 mb-8 items-center justify-items-center"
      >
        <!-- Column 1: Logo & Social Media -->
        <div class="flex flex-col items-center">
          <img
            src="@/assets/logo/logo.png"
            alt="Logo Promo Perumahan"
            class="w-[120px] h-auto md:w-[120px] object-contain mb-4"
          />
          <div class="flex space-x-4">
            <a
              href="https://facebook.com/namaperusahaan"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              class="hover:text-blue-400 transition"
            >
              <FacebookIcon class="w-6 h-6" />
            </a>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              class="hover:text-green-400 transition"
            >
              <PhoneIcon class="w-6 h-6" />
            </a>
            <a
              href="https://instagram.com/namaperusahaan"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              class="hover:text-pink-400 transition"
            >
              <InstagramIcon class="w-6 h-6" />
            </a>
          </div>
        </div>

        <!-- Column 2: Contact Info -->
        <div class="text-center">
          <h3 class="font-semibold text-lg mb-4">Hubungi Kami</h3>

          <!-- Email -->
          <p class="mb-2">
            <a
              href="mailto:satrialandpalembang@gmail.com"
              class="hover:text-gray-300 transition"
            >
              satrialandpalembang@gmail.com
            </a>
          </p>

          <!-- Whatsapp -->
          <p class="mb-2">
            <a
              href="https://wa.me/62811710890"
              class="hover:text-gray-300 transition"
              target="_blank"
            >
              +62 811-710-890
            </a>
          </p>

          <p class="mb-2 hover:text-gray-300 transition">
            <a
              href="https://www.google.com/maps/dir/-2.9865657,104.7170958/pt+permata+tri+mandiri/@-2.9187609,104.7093639,19z/data=!4m9!4m8!1m1!4e1!1m5!1m1!1s0x2e3b73d64f052bc3:0xbe93d72929b9d26c!2m2!1d104.7098972!2d-2.9185808?entry=ttu"
              target="_blank"
              rel="noopener noreferrer"
              class="block"
            >
              Jl. Kol H Burlian No.104 Rt.24 Rw.09<br />
              Palembang, Sumatera Selatan
            </a>
          </p>
        </div>

        <!-- Column 3: Hours & Back to Top -->
        <div class="text-center">
          <h3 class="font-semibold text-lg mb-4">Jam Operasional</h3>
          <p class="text-gray-400 mb-2">Senin-Jumat: 08:30 - 16:00 WIB</p>
          <p class="text-gray-400">Sabtu: 09:00 - 14:00 WIB</p>

          <button
            @click="scrollToTop"
            class="mt-6 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition flex items-center mx-auto"
          >
            <ArrowUpIcon class="w-4 h-4 mr-2" /> Kembali ke Atas
          </button>
        </div>
      </div>

      <!-- Centered Divider -->
      <div class="border-t border-gray-700 mx-auto w-full max-w-2xl mb-6"></div>

      <!-- Centered Copyright -->
      <div class="text-center">
        <p class="text-sm mb-2">
          &copy; {{ currentYear }} Satria Land. All rights reserved.
        </p>
        <p class="text-xs text-gray-500 max-w-2xl mx-auto">
          *Harga dan spesifikasi dapat berubah sewaktu-waktu.
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
import {
  FacebookIcon,
  InstagramIcon,
  PhoneIcon,
  ArrowUpIcon,
} from "lucide-vue-next";

export default {
  components: {
    FacebookIcon,
    InstagramIcon,
    PhoneIcon,
    ArrowUpIcon,
  },
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style scoped>
a:hover svg {
  transform: translateY(-2px);
  transition: transform 0.2s ease;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .grid {
    gap: 2rem;
  }

  /* Stack columns vertically on mobile */
  .grid-cols-1 > * {
    margin-bottom: 2rem;
  }

  .grid-cols-1 > *:last-child {
    margin-bottom: 0;
  }
}
</style>
