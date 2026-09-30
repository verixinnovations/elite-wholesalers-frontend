<template>
  <div class="grid gap-3">
    <div class="aspect-square overflow-hidden bg-surface-container-low">
      <NuxtImg
        :src="activeImage"
        :alt="alt"
        class="size-full object-cover"
        width="900"
        height="900"
        fetchpriority="high"
      />
    </div>
    <div v-if="images.length > 1" class="grid grid-cols-4 gap-3 sm:grid-cols-5">
      <button
        v-for="(image, index) in images"
        :key="image"
        type="button"
        class="aspect-square overflow-hidden border-2 transition-colors"
        :class="activeIndex === index ? 'border-primary-500' : 'border-transparent'"
        :aria-label="`Show product image ${index + 1}`"
        :aria-pressed="activeIndex === index"
        @click="activeIndex = index"
      >
        <NuxtImg :src="image" :alt="`${alt}, image ${index + 1}`" class="size-full object-cover" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  images: string[]
  alt: string
}>()

const activeIndex = ref(0)
const activeImage = computed(
  () => props.images[activeIndex.value] || '/images/product-placeholder.png'
)
</script>
