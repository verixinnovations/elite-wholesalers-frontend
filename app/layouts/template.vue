<template>
  <div class="min-h-dvh w-full flex flex-col">
    <BaseGlobalInfo />
    <BaseHeader class="w-full" />
    <div
      class="relative flex h-[20dvh] bg-contain bg-top lg:h-[30dvh] bg-repeat w-full"
      :style="{
        backgroundImage: `url(${$route.meta.backgroundImage ?? '/images/slider/banner.png'})`
      }"
    >
      <div class="absolute size-full z-1 bg-[rgb(0,0,0)] opacity-80"></div>
      <UContainer class="z-20">
        <div class="flex flex-col relative size-full text-white justify-center items-center">
          <h1
            class="mx-auto font-extrabold uppercase tracking-tight lg:leading-15 text-[clamp(1.5rem,4.5vw,2.5rem)]"
          >
            {{ $route.meta.pageTitle }}
          </h1>

          <p class="max-w-sm text-center">{{ $route.meta.pageDescription }}</p>
        </div>
      </UContainer>
    </div>
    <UContainer class="flex-1 px-2">
      <slot />
    </UContainer>
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
