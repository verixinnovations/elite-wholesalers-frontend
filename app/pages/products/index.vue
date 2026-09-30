<template>
  <main class="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-14">
    <div
      class="flex flex-col justify-between gap-6 border-b border-neutral-200 pb-7 sm:flex-row sm:items-end"
    >
      <div>
        <p class="text-xs font-bold uppercase tracking-[0.18em] text-primary-500">The collection</p>
        <h1 class="mt-2 font-oswald text-4xl font-medium text-neutral-950 sm:text-5xl">Products</h1>
        <p class="mt-2 text-sm text-neutral-500">Wholesale essentials, ready to move.</p>
      </div>
      <p class="text-sm text-neutral-500" aria-live="polite">
        {{ filteredProducts.length }} products
      </p>
    </div>

    <div
      class="sticky top-0 z-10 -mx-5 mt-5 border-b border-neutral-200 bg-white/95 px-5 py-3 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:py-5"
    >
      <nav class="flex gap-2 overflow-x-auto pb-1" aria-label="Filter products by category">
        <UButton
          v-for="category in categoryOptions"
          :key="category.id"
          type="button"
          class="shrink-0 border px-4 py-2 text-sm font-semibold transition-colors"
          :class="
            selectedCategory === category.id
              ? 'border-primary-600 bg-primary-600 text-white'
              : 'border-neutral-200 bg-white text-neutral-700 hover:border-primary-400'
          "
          :aria-pressed="selectedCategory === category.id"
          @click="selectedCategory = category.id"
        >
          {{ category.name }}
        </UButton>
      </nav>
    </div>

    <div
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
    </div>
    <div
      v-else
      class="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12"
    >
      <StorefrontProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        :category-name="categoryName(product.categoryId)"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { getCategories, getProducts } from '~/services/product.service'

const selectedCategory = ref('all')
const { data: products, pending, error } = await useAsyncData('storefront-products', getProducts)
const { data: categories } = await useAsyncData('storefront-categories', getCategories)

const categoryOptions = computed(() => [
  { id: 'all', name: 'All products' },
  ...(categories.value ?? []).map((category) => ({ id: category.id, name: category.name }))
])

const filteredProducts = computed(() => {
  const catalog = products.value ?? []
  return selectedCategory.value === 'all'
    ? catalog
    : catalog.filter((product) => product.categoryId === selectedCategory.value)
})

function categoryName(categoryId: string) {
  return categories.value?.find((category) => category.id === categoryId)?.name ?? 'Collection'
}

useSeoMeta({ title: 'Products', description: 'Browse the Elite Wholesalers product collection.' })
</script>
