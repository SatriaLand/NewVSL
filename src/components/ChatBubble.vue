<template>
  <div>
    <!-- Floating Chat Button -->
    <button
      @click.stop="toggleChat"
      class="fixed bottom-6 right-6 bg-amber-rich text-white p-4 rounded-full shadow-xl hover:bg-amber-dark transition-all duration-200 z-30 flex items-center justify-center"
      :class="{ 'animate-bounce': hasUnreadMessages }"
      aria-label="Buka chat"
    >
      <span class="relative">
        💬
        <span
          v-if="hasUnreadMessages"
          class="absolute -top-2 -right-2 h-4 w-4 bg-red-500 rounded-full animate-pulse"
        ></span>
      </span>
    </button>

    <!-- Backdrop (for outside click/touch) -->
    <transition
      enter-active-class="transition-opacity duration-200 ease-out"
      leave-active-class="transition-opacity duration-150 ease-in"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        @click="closeChat"
        class="fixed inset-0 bg-black bg-opacity-30 z-40"
      ></div>
    </transition>

    <!-- Chat Window -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      leave-active-class="transition duration-150 ease-in"
      enter-from-class="opacity-0 translate-y-2"
      leave-to-class="opacity-0 translate-y-2"
    >
      <div
        v-if="isOpen"
        class="chat-window fixed bottom-24 right-6 w-80 bg-gray-900 border border-amber-light/30 rounded-xl shadow-2xl overflow-hidden z-50 flex flex-col"
        style="height: 480px; max-height: 80vh"
        aria-modal="true"
        @click.stop
        role="dialog"
        aria-labelledby="chat-header"
      >
        <!-- Chat Header -->
        <div
          class="bg-amber-rich text-white p-4 flex justify-between items-center"
          id="chat-header"
        >
          <div class="flex items-center space-x-2">
            <img
              src="@/assets/maskot/satria-icon.png"
              alt="Ikon S.A.T.R.I.A."
              class="w-8 h-8 bg-white rounded-full p-1"
              loading="lazy"
            />
            <h3 class="font-semibold text-sm md:text-base lg:text-lg">
              S.A.T.R.I.A.
            </h3>
          </div>
          <button
            @click="closeChat"
            class="text-white hover:text-amber-dark transition"
            aria-label="Tutup chat"
          >
            ✕
          </button>
        </div>

        <!-- Messages Container -->
        <div
          ref="messagesContainer"
          class="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar"
          role="log"
          aria-live="polite"
        >
          <!-- Initial loading state -->
          <div
            v-if="isLoading && showInitialGreeting"
            class="text-center text-gray-400 py-8 h-full flex flex-col items-center justify-center"
            role="status"
            aria-label="Memuat pesan..."
          >
            <img
              src="@/assets/maskot/satria-greeting.png"
              alt="S.A.T.R.I.A. Greeting"
              class="mx-auto mb-4 w-16 h-16 md:w-24 md:h-24 animate-fade-in"
              loading="lazy"
            />
            <p
              class="text-amber-rich animate-fade-in-delay text-sm md:text-base"
            >
              Loading...
            </p>
          </div>

          <!-- Message history (shown after loading completes) -->
          <template v-if="!isLoading || !showInitialGreeting">
            <div
              v-for="(message, index) in messages"
              :key="index"
              class="flex"
              :class="{ 'justify-end': message.sender === 'user' }"
            >
              <div
                v-if="message.sender === 'bot'"
                class="flex items-start gap-2"
              >
                <img
                  v-if="!hideBotAvatar"
                  src="@/assets/maskot/satria-icon.png"
                  alt="S.A.T.R.I.A."
                  class="w-6 h-6 rounded-full flex-shrink-0"
                />
                <div
                  class="bot-bubble"
                  v-if="message.isHtml"
                  v-html="message.text"
                ></div>
                <div class="bot-bubble" v-else>{{ message.text }}</div>
              </div>
              <div v-else class="user-bubble">
                {{ message.text }}
              </div>
            </div>

            <!-- Quick Reply Buttons -->
            <div
              v-if="showQuickReplies && !isTyping"
              class="flex flex-wrap gap-2 mt-2"
            >
              <button
                v-for="(reply, index) in quickReplies"
                :key="index"
                @click="sendQuickReply(reply)"
                class="quick-reply"
              >
                {{ reply }}
              </button>
            </div>

            <!-- Typing indicator -->
            <div v-if="isTyping" class="flex">
              <div class="typing-indicator">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
              </div>
            </div>
          </template>
        </div>

        <!-- Input Area -->
        <div class="border-t border-gray-800 p-3 bg-gray-800">
          <form @submit.prevent="sendMessage" class="flex space-x-2">
            <input
              v-model="userInput"
              type="text"
              placeholder="Ketik pesan Anda..."
              class="flex-1 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-rich bg-gray-700 text-white"
              :disabled="isTyping"
              @keyup.enter="sendMessage"
            />
            <button
              type="submit"
              class="bg-amber-rich text-white rounded-lg px-4 py-2 hover:bg-amber-dark transition disabled:opacity-50"
              :disabled="!userInput.trim() || isTyping"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, onUnmounted } from "vue";
import {
  propertyResponses,
  quickReplies as quickReplyOptions,
  infoSubMenu,
} from "./propertyResponses.js";

const isOpen = ref(false);
const userInput = ref("");
const messages = ref([]);
const isTyping = ref(false);
const hasUnreadMessages = ref(false);
const messagesContainer = ref(null);
const showQuickReplies = ref(false);
const hideBotAvatar = ref(true);
const quickReplies = ref(quickReplyOptions);
const currentMenu = ref("main");
const isLoading = ref(true);
const showInitialGreeting = ref(true);
const TYPING_DURATION = 1500;
const TYPING_DELAY = 800;

const toggleChat = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    document.body.style.overflow = "hidden";
    hasUnreadMessages.value = false;

    // Reset loading state when opening chat
    isLoading.value = true;
    showInitialGreeting.value = true;

    if (messages.value.length === 0) {
      // Show loading for 2 seconds before showing content
      setTimeout(() => {
        isLoading.value = false;
        addBotMessage(
          "Halo! Saya S.A.T.R.I.A. (Sistem Asisten Temani Rumah Impian Anda). Ada yang bisa saya bantu?"
        );
        showQuickReplies.value = true;
      }, 2000);
    } else {
      // If there are existing messages, skip loading
      isLoading.value = false;
      showInitialGreeting.value = false;
    }
  } else {
    document.body.style.overflow = "";
  }
};

const closeChat = () => {
  isOpen.value = false;
  document.body.style.overflow = "";
};

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

const sendMessage = () => {
  if (!userInput.value.trim()) return;
  addMessage({
    text: userInput.value,
    sender: "user",
    timestamp: new Date(),
  });
  const userMessage = userInput.value.toLowerCase();
  userInput.value = "";
  showQuickReplies.value = false;
  isTyping.value = true;
  scrollToBottom();

  setTimeout(() => {
    const response = getBotResponse(userMessage);
    addBotMessage(response);
    if (response.includes("tidak mengerti")) {
      setTimeout(() => {
        if (currentMenu.value === "main") {
          showMainMenu();
        } else {
          showInfoSubMenu();
        }
      }, 300);
    }
    isTyping.value = false;
    showQuickReplies.value = true;
  }, TYPING_DURATION);
};

const sendQuickReply = (reply) => {
  addMessage({
    text: reply,
    sender: "user",
    timestamp: new Date(),
  });
  scrollToBottom();
  showQuickReplies.value = false;
  isTyping.value = true;

  setTimeout(() => {
    if (currentMenu.value === "main") {
      handleMainMenuReply(reply);
    } else {
      handleInfoSubMenuReply(reply);
    }
    isTyping.value = false;
    scrollToBottom();
    showQuickReplies.value = true;
  }, TYPING_DURATION);
};

const handleMainMenuReply = (reply) => {
  let responseKey = "";
  if (reply.includes("Info")) {
    responseKey = "info";
    addBotMessage(propertyResponses[responseKey].main);
    showInfoSubMenu();
  } else if (reply.includes("Harga")) {
    responseKey = "harga";
    addBotMessage(propertyResponses[responseKey]);
    showMainMenu();
  } else if (reply.includes("Lokasi")) {
    responseKey = "lokasi";
    addBotMessage(propertyResponses[responseKey]);
    showMainMenu();
  } else if (reply.includes("pembayaran")) {
    responseKey = "pembayaran";
    addBotMessage(propertyResponses[responseKey]);
    showMainMenu();
  } else if (reply.includes("admin")) {
    responseKey = "admin";
    addBotMessage(propertyResponses[responseKey]);
    showMainMenu();
  } else if (reply.includes("Booking")) {
    responseKey = "booking";
    addBotMessage(propertyResponses[responseKey]);
    showMainMenu();
  }
};

const handleInfoSubMenuReply = (reply) => {
  if (reply.includes("Kembali")) {
    addBotMessage("Silakan pilih menu utama:");
    showMainMenu();
    return;
  }

  let response = "";
  if (reply.includes("Carissma")) {
    response = propertyResponses.info.carissma;
  } else if (reply.includes("Demang")) {
    response = propertyResponses.info.demang;
  } else if (reply.includes("Green")) {
    response = propertyResponses.info.green;
  }

  addBotMessage(response);
  showInfoSubMenu();
};

const getBotResponse = (userMessage) => {
  if (/halo|hai|hi/.test(userMessage)) {
    return "Halo! Selamat datang di Perumahan Satria. Ada yang bisa saya bantu?";
  } else if (/info|perumahan/.test(userMessage)) {
    const response = propertyResponses.info.main;
    setTimeout(() => showInfoSubMenu(), 500);
    return response;
  } else if (/harga|promo/.test(userMessage)) {
    return propertyResponses["harga"];
  } else if (/lokasi|fasilitas/.test(userMessage)) {
    return propertyResponses["lokasi"];
  } else if (/pembayaran|dp|cicilan/.test(userMessage)) {
    return propertyResponses["pembayaran"];
  } else if (/admin|marketing|hubungi/.test(userMessage)) {
    return propertyResponses["admin"];
  } else if (/booking|beli|unit/.test(userMessage)) {
    return propertyResponses["booking"];
  } else if (/terima kasih|makasih/.test(userMessage)) {
    return "Sama-sama! Jika ada pertanyaan lain, jangan ragu untuk bertanya ya.";
  } else if (/bye|dadah|selamat tinggal/.test(userMessage)) {
    return "Terima kasih telah menghubungi kami. Semoga hari Anda menyenangkan!";
  } else {
    return "Maaf, saya tidak mengerti pertanyaan Anda. Silakan pilih salah satu opsi di bawah.";
  }
};

const addBotMessage = (htmlContent) => {
  isLoading.value = false;
  showInitialGreeting.value = false;
  addMessage({
    text: htmlContent,
    sender: "bot",
    timestamp: new Date(),
    isHtml: true,
  });
};

const addMessage = (message) => {
  messages.value.push(message);
  scrollToBottom();
  if (!isOpen.value && message.sender === "bot") {
    hasUnreadMessages.value = true;
  }
};

const showMainMenu = () => {
  currentMenu.value = "main";
  quickReplies.value = quickReplyOptions;
  showQuickReplies.value = true;
};

const showInfoSubMenu = () => {
  currentMenu.value = "info";
  quickReplies.value = infoSubMenu;
  showQuickReplies.value = true;
};

onMounted(() => {
  if (messages.value.length === 0) {
    setTimeout(() => {
      if (!isOpen.value) {
        hasUnreadMessages.value = true;
      }
    }, 3000);
  }
});

onUnmounted(() => {
  document.body.style.overflow = "";
});
</script>

<style scoped>
/* Typing indicator animation */
.typing-indicator {
  display: flex;
  background-color: rgba(231, 188, 76, 0.1);
  border-radius: 18px;
  border: 1px solid rgba(231, 188, 76, 0.3);
  padding: 10px 16px;
  animation: fadeIn 0.3s ease-out;
}
.typing-indicator .dot {
  width: 8px;
  height: 8px;
  margin: 0 2px;
  background-color: #f7c948;
  border-radius: 50%;
  animation: bounce 1.5s infinite ease-in-out;
}
.typing-indicator .dot:nth-child(1) {
  animation-delay: 0.1s;
}
.typing-indicator .dot:nth-child(2) {
  animation-delay: 0.3s;
}
.typing-indicator .dot:nth-child(3) {
  animation-delay: 0.5s;
}
@keyframes bounce {
  0%,
  60% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-4px);
  }
}

/* Chat bubbles */
.user-bubble {
  background-color: #f7c948;
  color: #1f2937;
  border-radius: 18px 18px 0 18px;
  padding: 10px 14px;
  max-width: 80%;
  margin-left: auto;
}
.bot-bubble {
  background-color: #374151;
  color: #fef3c7;
  border-radius: 18px 18px 18px 0;
  padding: 10px 14px;
  max-width: 80%;
  margin-right: auto;
}
.bot-bubble :deep(ul) {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.bot-bubble :deep(li) {
  margin-bottom: 0.25rem;
}

/* Quick reply buttons */
.quick-reply {
  background-color: rgba(247, 215, 148, 0.1);
  border: 1px solid rgba(231, 188, 76, 0.5);
  color: #fef3c7;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.75rem;
  transition: all 0.15s ease;
  cursor: pointer;
}
.quick-reply:hover {
  background-color: rgba(231, 188, 76, 0.2);
  transform: translateY(-1px);
}

/* Custom scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(247, 215, 148, 0.1);
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(231, 188, 76, 0.4);
  border-radius: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(231, 188, 76, 0.6);
}

/* Initial greeting animation */
.animate-fade-in {
  animation: fadeIn 0.8s ease-in-out forwards;
  opacity: 0;
}
.animate-fade-in-delay {
  animation: fadeIn 0.8s ease-in-out 0.3s forwards;
  opacity: 0;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Chat window transitions */
.chat-window {
  transition: opacity 0.3s ease;
}

/* Responsiveness */
@media (max-width: 640px) {
  .quick-reply {
    font-size: 0.7rem;
    padding: 4px 8px;
  }
  .bot-bubble,
  .user-bubble {
    font-size: 0.8rem;
  }
}
@media (min-width: 768px) {
  .chat-window {
    width: 400px;
  }
}
@media (min-width: 1024px) {
  .chat-window {
    width: 500px;
  }
  .quick-reply {
    font-size: 0.9rem;
    padding: 6px 12px;
  }
  .bot-bubble,
  .user-bubble {
    font-size: 1rem;
  }
}

/* Chat window size */
.chat-window {
  height: 480px;
  max-height: 80vh;
}
</style>
