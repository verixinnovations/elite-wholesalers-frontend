<template>
  <main class="mx-auto max-w-5xl px-5 py-10 sm:px-8 lg:py-14">
    <div class="flex items-end justify-between gap-4 border-b border-neutral-200 pb-6">
      <div>
        <p class="text-xs font-bold uppercase tracking-[0.16em] text-primary-500">Your selection</p>
        <h1 class="mt-2 font-oswald text-4xl font-medium text-neutral-950">Shopping cart</h1>
      </div>
      <span class="pb-1 text-sm text-neutral-500">
        {{ itemCount }} {{ itemCount === 1 ? 'item' : 'items' }}
      </span>
    </div>

    <div v-if="cartItems.length === 0" class="py-20 text-center">
      <UIcon name="i-lucide-shopping-bag" class="mx-auto size-10 text-neutral-300" />
      <h2 class="mt-5 font-oswald text-2xl text-neutral-900">Your cart is empty</h2>
      <p class="mt-2 text-sm text-neutral-500">Find something worth stocking up on.</p>
      <UButton label="Browse products" to="/products" class="mt-6" />
    </div>

    <div v-else class="mt-7 grid gap-10 lg:grid-cols-[1fr_320px]">
      <div class="divide-y divide-neutral-200">
        <article
          v-for="item in cartItems"
          :key="item.cart_id"
          class="flex gap-4 py-5 first:pt-0 sm:gap-6"
        >
          <NuxtLink
            :to="`/products/${item.item_id}`"
            class="size-24 shrink-0 overflow-hidden bg-surface-container-low sm:size-32"
          >
            <img
              :src="productImage(item.product)"
              :alt="item.product.name"
              class="size-full object-cover"
            />
          </NuxtLink>

          <div class="flex min-w-0 flex-1 flex-col justify-between gap-3 sm:flex-row">
            <div class="min-w-0">
              <NuxtLink
                :to="`/products/${item.item_id}`"
                class="font-semibold text-neutral-900 hover:text-primary-600"
              >
                {{ item.product.name }}
              </NuxtLink>
              <p class="mt-2 text-sm font-medium text-neutral-700">
                {{ formatPrice(item.price.amount, item.price.currency) }} each
              </p>
            </div>

            <div class="flex items-center justify-between gap-5 sm:flex-col sm:items-end">
              <div class="inline-flex items-center border border-neutral-200">
                <button
                  class="size-9 text-neutral-600 hover:bg-neutral-50"
                  :aria-label="`Decrease ${item.product.name} quantity`"
                  @click="cartStore.updateQuantity(item.cart_id, item.quantity - 1)"
                >
                  −
                </button>
                <span class="min-w-9 text-center text-sm tabular-nums">{{ item.quantity }}</span>
                <button
                  class="size-9 text-neutral-600 hover:bg-neutral-50"
                  :aria-label="`Increase ${item.product.name} quantity`"
                  @click="cartStore.updateQuantity(item.cart_id, item.quantity + 1)"
                >
                  +
                </button>
              </div>
              <span class="text-sm font-semibold">
                {{ formatPrice(item.price.amount * item.quantity, item.price.currency) }}
              </span>
              <button
                class="text-sm text-neutral-500 underline decoration-neutral-300 underline-offset-4 hover:text-red-700"
                @click="cartStore.removeFromCart(item.cart_id)"
              >
                Remove
              </button>
            </div>
          </div>
        </article>
      </div>

      <aside
        class="h-fit border-t border-neutral-200 pt-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0"
      >
        <h2 class="font-oswald text-2xl text-neutral-950">Order summary</h2>
        <div class="mt-6 flex justify-between text-sm text-neutral-600">
          <span>Subtotal</span>
          <span>{{ formatPrice(subtotal, currencyCode) }}</span>
        </div>
        <p class="mt-2 text-xs leading-5 text-neutral-500">
          Shipping and taxes can be confirmed when your order is reviewed.
        </p>
        <UButton
          label="Continue to checkout"
          to="/cart/checkout"
          icon="i-lucide-arrow-right"
          trailing
          class="mt-6 w-full justify-center"
          size="lg"
        />
        <NuxtLink
          to="/products"
          class="mt-4 block text-center text-sm font-semibold text-primary-600 hover:underline"
        >
          Continue shopping
        </NuxtLink>
      </aside>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { Currency } from '~/types/enums'
import type { ProductDataEntity, ProductEntity } from '~/types/product'
import { useCartStore } from '~/store/cart-store'

const cartStore = useCartStore()
const { cartItems, subtotal, itemCount } = storeToRefs(cartStore)
const currencyCode = computed(() => cartItems.value[0]?.price.currency ?? 'AUD')

function formatPrice(amount: number, currency: Currency | string) {
  return new Intl.NumberFormat('en-AU', { style: 'currency', currency }).format(amount)
}

function productImage(product: ProductEntity | ProductDataEntity) {
  const imageDocumentId =
    'image_document_id' in product ? product.image_document_id : product.documents[0]?.document_id

  return ZohoHelpers.getZohoProductImageUrl({
    imageName: product.image_name,
    imageDocumentId
  })
}

useSeoMeta({ title: 'Shopping cart' })
</script>
