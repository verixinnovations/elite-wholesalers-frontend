<template>
  <main v-if="product" class="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-14">
    <nav class="mb-7 text-sm text-neutral-500" aria-label="Breadcrumb">
      <NuxtLink to="/products" class="hover:text-primary-600">Products</NuxtLink>
      <span class="mx-2">/</span>
      <span class="text-neutral-900">{{ product.title }}</span>
    </nav>

    <div class="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <StorefrontProductGallery :images="product.images" :alt="product.title" />
      <section class="lg:py-4">
        <p class="text-xs font-bold uppercase tracking-[0.16em] text-primary-500">
          {{ categoryName }}
        </p>
        <h1
          class="mt-3 font-oswald text-4xl font-medium leading-tight text-neutral-950 sm:text-5xl"
        >
          {{ product.title }}
        </h1>
        <p class="mt-5 text-2xl font-bold text-neutral-950">
          {{ NumberFunctions.formatCurrency(product.price, product.currencyCode) }}
          <span class="ml-2 text-sm font-normal text-neutral-500">per unit</span>
        </p>
        <div
          class="mt-6 flex items-center gap-2 text-sm"
          :class="product.inStock ? 'text-green-700' : 'text-red-700'"
        >
          <span
            class="size-2 rounded-full"
            :class="product.inStock ? 'bg-green-600' : 'bg-red-600'"
          />
          {{
            product.inStock ? `${product.stockQuantity} units available` : 'Currently unavailable'
          }}
        </div>
        <p class="mt-7 max-w-prose whitespace-pre-line leading-7 text-neutral-600">
          {{ product.description }}
        </p>

        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <BaseAddToCart />
          <UButton
            label="Download Specs"
            icon="i-lucide-file-down"
            color="neutral"
            variant="outline"
            size="lg"
            class="justify-center"
          />
        </div>
        <p v-if="product.variants?.length && !variantsReady" class="mt-2 text-sm text-neutral-500">
          Choose each option before adding this item.
        </p>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { getCategories, getProductById } from '~/composable/store'
import type { ProductVariant } from '~/types/ecommerce'

const route = useRoute()
const id = String(route.params.id)
const { data: product } = await useAsyncData(`storefront-product-${id}`, () => getProductById(id))
const { data: categories } = await useAsyncData('storefront-categories', getCategories)

if (!product.value) {
  throw createError({ statusCode: 404, statusMessage: 'Product not found' })
}

const selectedVariants = reactive<Record<string, string>>({})
const categoryName = computed(
  () =>
    categories.value?.find((category) => category.id === product.value?.categoryId)?.name ??
    'Collection'
)
const variantsReady = computed(() =>
  (product.value?.variants ?? []).every((variant: ProductVariant) =>
    Boolean(selectedVariants[variant.name])
  )
)
const cart = useCartStore()
const toast = useToast()

function addToCart() {
  if (!product.value) return
  if (!cart.addToCart(product.value, 1, { ...selectedVariants })) return
  toast.add({ title: 'Added to cart', description: product.value.title, color: 'success' })
}

useSeoMeta({
  title: () => product.value?.title ?? 'Product',
  description: () => product.value?.description ?? ''
})
</script>
