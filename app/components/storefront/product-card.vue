<template>
  <article class="group min-w-0 border border-gray-200 rounded-2xl overflow-hidden">
    <NuxtLink :to="`/products/${product.id}`" class="block">
      <div class="relative aspect-4/3 overflow-hidden bg-surface-container-low">
        <NuxtImg
          :src="product.images[0] || '/images/product-placeholder.png'"
          :alt="product.title"
          class="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
          width="600"
          height="450"
        />
        <span
          v-if="!product.inStock"
          class="absolute text-white left-3 top-3 bg-error px-2.5 py-1 text-xs font-semibold"
        >
          Out of stock
        </span>
      </div>
      <div class="pt-4 px-2">
        <p class="text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-500">
          {{ categoryName }}
        </p>
        <h2 class="mt-1 line-clamp-2 min-h-12 text-base font-semibold text-neutral-900">
          {{ product.title }}
        </h2>
      </div>
    </NuxtLink>
    <div class="mt-0 p-2 flex items-center justify-between gap-3">
      <span class="text-lg font-bold text-neutral-950">
        {{ NumberFunctions.formatCurrency(product.price, product.currencyCode) }}
      </span>
      <BaseAddToCart />
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Product } from '~/types/ecommerce'

const props = defineProps<{
  product: Product
  categoryName: string
}>()

const cart = useCartStore()
const toast = useToast()

function addToCart() {
  if (!cart.addToCart(props.product)) return
  toast.add({ title: 'Added to cart', description: props.product.title, color: 'success' })
}
</script>
