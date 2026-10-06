<template>
  <UContainer class="mx-auto px-5 py-10 sm:px-8 lg:py-14">
    <div class="border-b border-neutral-200 mb-10">
      <div class="flex flex-col justify-between gap-6 pb-7 sm:flex-row sm:items-end">
        <div>
          <p class="text-xs font-bold tracking-[0.18em] text-muted uppercase">
            <UBreadcrumb :items="categoryParentsBreadcrumb" class="mb-2" />
          </p>
          <h1 class="mt-4 font-oswald text-4xl font-medium text-neutral-950 sm:text-5xl">
            {{ selectedCategory?.name }}
          </h1>
        </div>
        <p
          v-if="categoryProducts.length > 0"
          class="text-sm text-neutral-500 flex items-center font-semibold"
          aria-live="polite"
        >
          ({{ categoryProducts.length }}) Products available
        </p>
      </div>
    </div>
    <!-- <div
      class="sticky top-0 z-10 overflow-scroll w-full -mx-5 mt-5 border-b border-neutral-200 bg-white/95 px-5 py-3 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:py-5"
    >
      <nav
        v-if="subCategories.length > 0"
        class="flex gap-2 overflow-x-auto pb-1"
        aria-label="Filter products by category"
      >
        <UButton
          v-for="category in subCategories"
          :key="category.category_id"
          type="button"
          class="px-4 py-2 whitespace-nowrap shrink-0"
          :variant="category.category_id === categoryId ? 'solid' : 'outline'"
          :aria-pressed="category.category_id === categoryId"
          @click="productStore.selectCategory(category.category_id)"
        >
          {{ category.name }}
        </UButton>
        <UButton
          type="button"
          class="px-4 py-2 whitespace-nowrap shrink-0"
          :variant="parentCategory?.category_id === categoryId ? 'solid' : 'outline'"
          :aria-pressed="parentCategory?.category_id === categoryId"
          @click="
            () => {
              if (selectedCategory !== null && parentCategory !== null) {
                productStore.selectCategory(parentCategory?.category_id)
              }
            }
          "
        >
          others
        </UButton>
      </nav>
    </div> -->

    <div
      v-if="categoryProducts.length > 0"
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      <BaseProductCard
        v-for="product in categoryProducts"
        :key="product.item_id"
        :product="product"
      />
    </div>
    <div v-else class="py-20 text-center flex flex-col justify-center">
      <NuxtImg src="/images/empty-data.svg" class="mx-auto max-h-60" />
      <h2 class="mt-5 font-oswald text-3xl text-neutral-900">No product in this category</h2>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import { RouteName } from '~/constants/route-names'
import { useProductStore } from '~/store/product-store'

useSeoMeta({ title: 'Products', description: 'Browse the Elite Wholesalers product collection.' })
definePageMeta({
  name: RouteName.CategoryProducts
})

const route = useRoute()
const productStore = useProductStore()
const { selectedCategory, parentCategory, subCategories, categoryProducts } =
  storeToRefs(productStore)

const categoryId = computed(() => route.params.categoryId as string)

const categoryParentsBreadcrumb = computed(() => {
  const base = [
    {
      to: '/#products',
      label: 'Products',
      onSelect: () => null
    }
  ]

  const currentCategory = selectedCategory.value

  // 1. Combine ancestors and current category into one raw array
  const rawCategories = [
    ...(currentCategory?.ancestors ?? []),
    ...(currentCategory ? [currentCategory] : [])
  ]

  // 2. Filter out duplicates based on category_id
  const seenIds = new Set<string>()
  const uniqueCategories = rawCategories.filter((cat) => {
    if (seenIds.has(cat.category_id)) return false
    seenIds.add(cat.category_id)
    return true
  })

  // 3. Map to breadcrumb item structure
  const categoryBreadcrumbs = uniqueCategories.map((cat) => ({
    to: {
      name: RouteName.Categories,
      params: { categoryId: cat.category_id }
    },
    label: cat.name,
    onSelect: () => productStore.selectCategory(cat.category_id)
  }))

  return [...base, ...categoryBreadcrumbs]
})
onBeforeMount(async () => {
  if (categoryId) {
    await productStore.getProductByCategoryId(categoryId.value)
  }
})
</script>
