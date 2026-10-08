<template>
  <div class="flex flex-col my-10 gap-20">
    <div class="overflow-hidden mx-auto">
      <NuxtImg
        :src="activeImage"
        :alt="alt"
        class="aspect-auto h-60 max-h-100 object-cover"
        fetchpriority="high"
      />
    </div>
    <div
      v-if="images.length > 1"
      class="flex mx-auto max-w-full overflow-x-auto justify-center sm:justify-center gap-3 py-2 scroll-smooth"
    >
      <div
        v-for="(image, index) in images"
        :key="image"
        type="button"
        class="aspect-square w-16 sm:w-20 shrink-0 overflow-hidden border-2 transition-colors cursor-pointer"
        :class="activeIndex === index ? 'border-neutral-500' : 'border-transparent'"
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
