<template>
  <!-- Floating Glass Navbar -->
  <nav
    class="fixed top-4 left-4 right-4 z-50 backdrop-blur-md bg-gray-900/70 text-white py-3 px-6 rounded-xl border border-gray-700/50 shadow-xl transition-all duration-300 hover:bg-gray-900/80 hover:backdrop-blur-lg max-w-screen-xl mx-auto"
  >
    <div class="flex justify-between items-center">
      <!-- Logo -->
      <a
        href="#home"
        class="inline-block transition-all duration-300 hover:scale-105"
        @click.prevent="scrollToSection('home')"
      >
        <img
          src="@/assets/logo/logonav.png"
          alt="Satria Land"
          class="h-10 sm:h-12"
        />
      </a>

      <!-- Desktop Menu -->
      <ul class="hidden md:flex space-x-6 lg:space-x-8">
        <li v-for="item in menuItems" :key="item.id">
          <a
            :href="item.href"
            class="relative px-2 py-1 font-medium text-sm lg:text-base transition-colors duration-300 group"
            :class="{
              'text-amber-300': activeSection === item.id,
              'hover:text-amber-300': activeSection !== item.id,
            }"
            @click.prevent="scrollToSection(item.id)"
          >
            {{ item.label }}
            <span
              class="absolute bottom-0 left-0 h-0.5 bg-amber-400 transition-all duration-300"
              :class="
                activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
              "
            ></span>
          </a>
        </li>
      </ul>

      <!-- Mobile Menu Button -->
      <button
        class="md:hidden p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
        @click="toggleMenu"
      >
        <MenuIcon
          class="w-6 h-6 transition-transform duration-300"
          :class="{ 'rotate-90': isOpen }"
        />
      </button>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="isOpen"
      class="md:hidden mt-4 py-4 px-4 rounded-xl backdrop-blur-lg bg-gray-800/80 border border-gray-700/50 shadow-lg animate-slide-down"
      style="position: absolute; top: calc(100% + 0.5rem); left: 0; right: 0; z-index: 40;"
    >
      <div class="space-y-3">
        <a
          v-for="item in menuItems"
          :key="item.id"
          :href="item.href"
          class="block px-4 py-3 rounded-lg transition-colors duration-300"
          :class="{
            'bg-gray-700/50 text-amber-300': activeSection === item.id,
            'hover:bg-gray-700/50': activeSection !== item.id,
          }"
          @click.prevent="handleMobileClick(item.id)"
        >
          {{ item.label }}
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { Menu as MenuIcon } from "lucide-vue-next";
import { ref, onMounted, onUnmounted } from "vue";

const isOpen = ref(false);
const activeSection = ref("home");

const menuItems = [
  { id: "home", label: "Beranda", href: "#home" },
  { id: "fitur", label: "Fitur Unggulan", href: "#fitur" },
  { id: "daftar", label: "Perumahan", href: "#daftar" },
//  { id: "testimoni", label: "Testimoni", href: "#testimoni" },
//  { id: "agen", label: "Agen Kami", href: "#agen" },
  { id: "mitra", label: "Mitra", href: "#mitra" },
  { id: "kontak", label: "Kontak", href: "#kontak" },
];

// Handle scroll to section
const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (!section) {
    console.error(`Section ${sectionId} tidak ditemukan`);
    return;
  }

  // Update URL hash tanpa trigger scroll
  history.replaceState(null, null, `#${sectionId}`);

  // Hitung offset navbar secara dinamis
  const navbar = document.querySelector("nav");
  const navbarHeight = navbar ? navbar.offsetHeight : 100;

  // Hitung posisi target dengan offset
  const targetPosition =
    section.getBoundingClientRect().top + window.scrollY - navbarHeight;

  window.scrollTo({
    top: targetPosition,
    behavior: "smooth",
  });

  activeSection.value = sectionId;
  isOpen.value = false;
};

// Handle mobile menu click
const handleMobileClick = (id) => {
  scrollToSection(id);
};

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

// Setup Intersection Observer untuk deteksi section aktif
let observer;

const setupObserver = () => {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id;
      }
    });
  }, options);

  // Observe semua section
  menuItems.forEach((item) => {
    const section = document.getElementById(item.id);
    if (section) observer.observe(section);
  });
};

// Handle hash change saat page load
const handleHashChange = () => {
  const hash = window.location.hash.substring(1);
  if (hash && menuItems.some((item) => item.id === hash)) {
    scrollToSection(hash);
  }
};

onMounted(() => {
  setupObserver();
  handleHashChange();
  window.addEventListener("hashchange", handleHashChange);
});

onUnmounted(() => {
  if (observer) observer.disconnect();
  window.removeEventListener("hashchange", handleHashChange);
});
</script>

<style scoped>
/* Animasi dropdown */
@keyframes slide-down {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-slide-down {
  animation: slide-down 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
  scroll-padding-top: 100px;
}

/* Tambahkan shadow dan jarak untuk memisahkan mobile menu */
.md\\:hidden + div {
  margin-top: 1rem; /* Jarak antara navbar dan menu */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Tambahkan shadow */
}
</style>
