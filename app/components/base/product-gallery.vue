<template>
  <div class="flex flex-col gap-3">
    <div class="aspect-square overflow-hidden">
      <NuxtImg
        :src="activeImage"
        :alt="alt"
        class="size-full object-cover aspect-square scale-70 lg:scale-100"
        fetchpriority="high"
      />
    </div>
    <div v-if="images.length > 1" class="grid grid-cols-4 gap-3 sm:grid-cols-5">
      <div
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
      </div>
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
