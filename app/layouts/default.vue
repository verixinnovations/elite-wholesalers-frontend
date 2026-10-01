<template>
  <div class="min-h-dvh w-full flex flex-col">
    <BaseGlobalInfo />
    <BaseHeader class="w-full" />
    <div class="flex-1">
      <slot />
    </div>
    <BaseFooter />
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from '~/store/product-store'

const productStore = useProductStore()

onBeforeMount(async () => {
  productStore.getProductCategories()
  productStore.getFeaturedProducts()
})
</script>

<style scoped></style>
