<template>
  <div>
    <BaseGlobalInfo />
    <BaseHeader />
    <slot />
    <BaseFooter />
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from '~/store/product-store'

const productStore = useProductStore()

onBeforeMount(async () => {
  productStore.getProductCategories()
})
</script>

<style scoped></style>
