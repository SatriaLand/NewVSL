<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-xl p-6 h-full shadow-lg hover:shadow-xl transition-all duration-300"
    :class="{ 'ring-2 ring-amber-rich': isActive }"
    role="article"
    aria-labelledby="'testimonial-title-' + testimonialIndex"
  >
    <div class="flex items-start gap-4 mb-4">
      <div class="relative flex-shrink-0">
        <div
          v-if="!testimonial.avatar"
          class="w-14 h-14 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse"
          aria-hidden="true"
        ></div>
        <img
          :src="testimonial.avatar || 'https://via.placeholder.com/56'"
          :alt="`Foto ${testimonial.name}`"
          width="56"
          height="56"
          class="w-14 h-14 rounded-full object-cover border-2 border-amber-rich"
          loading="lazy"
        />
        <div class="absolute -bottom-1 -right-1 bg-amber-rich rounded-full p-1">
          <QuoteIcon class="w-4 h-4 text-white" aria-hidden="true" />
        </div>
      </div>

      <div>
        <h4
          :id="'testimonial-title-' + testimonialIndex"
          class="font-semibold text-gray-900 dark:text-white line-clamp-1"
        >
          {{ testimonial.name }}
        </h4>
        <p class="text-sm text-amber-dark mt-1">
          {{ testimonial.position }}
        </p>
      </div>
    </div>

    <div class="flex gap-0.5 mb-3" role="img" aria-label="Rating: {{ testimonial.rating }} dari 5">
      <template v-for="(star, i) in stars" :key="i">
        <StarIcon
          class="w-5 h-5"
          :class="{
            'text-amber-star fill-amber-star': star === 'full',
            'text-amber-star fill-amber-star half-star': star === 'half',
            'text-gray-300 dark:text-gray-600': star === 'empty',
          }"
          aria-hidden="true"
        />
      </template>
    </div>

    <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
      {{ testimonial.comment }}
    </p>

    <p class="text-sm text-gray-500 dark:text-gray-400">
      {{ formattedDate }}
    </p>
  </div>
</template>


<script>
import { Star, Quote } from "lucide-vue-next";

export default {
  name: "TestimonialCard",
  props: {
    testimonial: {
      type: Object,
      required: true,
      validator: (value) => {
        return [
          "name",
          "position",
          "comment",
          "rating",
          "date",
          "avatar",
        ].every((prop) => prop in value);
      },
    },
    testimonialIndex: {
      type: Number,
      default: -1,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    StarIcon: Star,
    QuoteIcon: Quote,
  },
  computed: {
    formattedDate() {
      try {
        return new Date(this.testimonial.date).toLocaleDateString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      } catch {
        return "Tanggal tidak valid";
      }
    },
    stars() {
      const fullStars = Math.floor(this.testimonial.rating);
      const hasHalfStar = this.testimonial.rating % 1 !== 0;
      return Array.from({ length: 5 }, (_, i) => {
        if (i < fullStars) return "full";
        if (i === fullStars && hasHalfStar) return "half";
        return "empty";
      });
    },
  },
};
</script>

<style scoped>
/* Animasi hover untuk card */
.bg-white:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* Skeleton loading untuk avatar */
.animate-pulse {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Efek untuk bintang setengah */
.half-star {
  position: relative;
  overflow: hidden;
}

.half-star::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background: currentColor;
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'%3E%3Cpath d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'/%3E%3C/svg%3E");
  mask-repeat: no-repeat;
  mask-size: contain;
}
</style>
