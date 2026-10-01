<template>
  <UContainer class="mx-auto px-5 py-10 sm:px-8 lg:py-14">
    <div
      class="flex flex-col justify-between gap-6 border-b border-neutral-200 pb-7 sm:flex-row sm:items-end"
    >
      <div>
        <p class="text-xs font-bold tracking-[0.18em] text-primary-500 uppercase">Products</p>
        <h1 class="mt-2 font-oswald text-4xl font-medium text-neutral-950 sm:text-5xl">
          {{ subCategories?.parentCategory.name }}
        </h1>

        <p
          class="mt-2 text-sm text-neutral-500"
          v-html="subCategories?.parentCategory.description"
        ></p>
      </div>
      <p
        v-if="categoryProducts.length > 0"
        class="text-sm text-neutral-500 flex items-center font-semibold"
        aria-live="polite"
      >
        ({{ categoryProducts.length }}) Products available
      </p>
    </div>

    <div
      class="sticky top-0 z-10 -mx-5 mt-5 border-b border-neutral-200 bg-white/95 px-5 py-3 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:py-5"
    >
      <nav class="flex gap-2 overflow-x-auto pb-1" aria-label="Filter products by category">
        <UButton
          v-for="category in subCategories?.subCategories"
          :key="category.category_id"
          type="button"
          class="px-4 py-2"
          :variant="selectedSubCategory?.category_id === category.category_id ? 'solid' : 'outline'"
          :aria-pressed="selectedSubCategory?.category_id === category.category_id"
          @click="productStore.selectSubCategory(category)"
        >
          {{ category.name }}
        </UButton>
      </nav>
    </div>

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <BaseProductCard
        v-for="product in categoryProducts"
        :key="product.item_id"
        :product="product"
      />
    </div>

    <!-- <div
      v-if="pending"
      class="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6"
    >
      <div v-for="index in 8" :key="index" class="animate-pulse">
        <div class="aspect-4/3 bg-neutral-100" />
        <div class="mt-4 h-3 w-1/3 bg-neutral-100" />
        <div class="mt-2 h-5 w-4/5 bg-neutral-100" />
      </div>
    </div>
    <UAlert v-else-if="error" color="error" title="Products are unavailable right now." />
    <div v-else-if="!filteredProducts.length" class="border-y border-neutral-200 py-16 text-center">
      <p class="font-oswald text-2xl text-neutral-900">No products in this category yet</p>
      <button
        class="mt-3 text-sm font-semibold text-primary-600 underline"
        @click="selectedCategory = 'all'"
      >
        View the full collection
      </button>
    </div> -->
    <!-- <div
      v-else
      class="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12"
    >
      <BaseProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        :category-name="categoryName(product.categoryId)"
      />
    </div> -->
  </UContainer>
</template>

<script setup lang="ts">
import { RouteName } from '~/constants/route-names'
import { useProductStore } from '~/store/product-store'

useSeoMeta({ title: 'Products', description: 'Browse the Elite Wholesalers product collection.' })
definePageMeta({
  name: RouteName.Categories
})

const route = useRoute()
const productStore = useProductStore()
const { categories, subCategories, selectedCategory, selectedSubCategory, categoryProducts } =
  storeToRefs(productStore)

onBeforeMount(async () => {
  if (route.params.categoryId) {
    await productStore.getProductSubCategories(route.params.categoryId as string)
  }
})
</script>
