<template>
  <div class="min-h-screen flex flex-col bg-gray-950 text-white overflow-x-hidden">
    <Navbar />
    <main>
      <HeroSlider />
      <FiturUnggulan />
      <DaftarPerumahan />
<!--       <Testimonials/>
      <SalesAgentList /> -->
      <MitraBank/>
      <ChatBubble />
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import HeroSlider from './components/HeroSlider.vue';
import FiturUnggulan from './components/FiturUnggulan.vue';
import DaftarPerumahan from './components/DaftarPerumahan.vue';
import Testimonials from './components/Testimonials.vue';
import MitraBank from './components/MitraBank.vue';
import SalesAgentList from './components/SalesAgentList.vue';
import ChatBubble from './components/ChatBubble.vue';

export default {
  components: {
    Navbar,
    Footer,
    HeroSlider,
    FiturUnggulan,
    DaftarPerumahan,
    Testimonials,
    MitraBank,
    SalesAgentList,
    ChatBubble,
  },
};
</script>

<style>
/* Ensure no horizontal overflow */
body {
  overflow-x: hidden;
}
</style>
