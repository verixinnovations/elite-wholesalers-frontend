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

    <div v-if="cartItems.length === 0" class="py-20 text-center flex flex-col justify-center">
      <NuxtImg src="/images/empty-cart.svg" class="mx-auto max-h-60" />
      <h2 class="mt-5 font-oswald text-3xl text-neutral-900">Your cart is empty</h2>
      <p class="mt-2 text-sm text-neutral-500">Find something worth stocking up on.</p>
      <UButton
        label="Browse products"
        to="/products"
        class="mt-6 px-10! py-2! inline w-fit mx-auto"
        size="lg"
      />
    </div>

    <div v-else class="w-full mt-7 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
      <div class="divide-y divide-neutral-200">
        <article
          v-for="item in cartItems"
          :key="item.cartId"
          class="flex gap-4 py-5 first:pt-0 sm:gap-6"
        >
          <NuxtLink
            :to="`/products/${item?.itemId}`"
            class="size-24 shrink-0 overflow-hidden bg-surface-container-low sm:size-32"
          >
            <img
              :src="productImage(item?.product)"
              :alt="item?.product?.name"
              class="size-full object-cover"
            />
          </NuxtLink>

          <div class="flex min-w-0 flex-1 flex-col justify-between gap-3 sm:flex-row">
            <div class="flex flex-col items-start justify-start">
              <div class="text-left">
                <NuxtLink
                  :to="`/products/${item.itemId}`"
                  class="font-semibold max-w-md line-clamp-2 text-neutral-900 hover:text-primary-600"
                >
                  {{ item?.product?.name }}
                </NuxtLink>
              </div>
              <p class="mt-2 text-sm font-medium text-primary">
                {{ NumberFunctions.formatCurrency(item.price?.amount, item.price.currency) }} each
              </p>
            </div>

            <div class="flex items-center justify-between gap-5 sm:flex-col sm:items-end">
              <div class="inline-flex items-center border border-neutral-200">
                <button
                  class="size-9 text-neutral-600 hover:bg-neutral-50"
                  :aria-label="`Decrease ${item?.product?.name} quantity`"
                  @click="cartStore.updateQuantity(item.cartId, item.quantity - 1)"
                >
                  −
                </button>
                <span class="min-w-9 text-center text-sm tabular-nums">{{ item.quantity }}</span>
                <UButton
                  variant="ghost"
                  class="rounded-none! disabled:bg-primary-50 size-9 text-neutral-600 hover:bg-neutral-50"
                  :aria-label="`Increase ${item?.product?.name} quantity`"
                  @click="cartStore.updateQuantity(item.cartId, item.quantity + 1)"
                >
                  +
                </UButton>
              </div>
              <span class="text-sm font-semibold">
                {{
                  NumberFunctions.formatCurrency(
                    item.price.amount * item.quantity,
                    item.price.currency
                  )
                }}
              </span>
              <button class="" @click="cartStore.removeFromCart(item.cartId)">
                <UIcon name="i-lucide-trash" class="text-error" />
              </button>
            </div>
          </div>
        </article>
      </div>

      <div
        class="h-fit border-t border-neutral-200 pt-20 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0"
      >
        <h2 class="font-oswald text-2xl text-neutral-950">Order summary</h2>
        <div class="mt-6 flex justify-between text-sm text-neutral-600">
          <span>Subtotal</span>
          <span>{{ NumberFunctions.formatCurrency(subtotal) }}</span>
        </div>
        <p class="mt-2 text-xs leading-5 text-neutral-500">
          Shipping and taxes can be confirmed when your order is reviewed.
        </p>
        <div class="mx-auto flex justify-center flex-col">
          <UButton
            label="Continue to checkout"
            to="/cart/checkout"
            icon="i-lucide-arrow-right"
            trailing
            class="mt-6 px-10 justify-center"
            size="lg"
          />
          <UButton to="/products" class="mt-6 px-10 justify-center" variant="link">
            Continue shopping
          </UButton>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { ProductDataEntity, ProductEntity } from '~/types/product'
import { useCartStore } from '~/store/cart-store'

import { RouteName } from '~/constants/route-names'
definePageMeta({
  middleware: 'auth',
  name: RouteName.Cart
})
const cartStore = useCartStore()
const { cartItems, subtotal, itemCount } = storeToRefs(cartStore)

function productImage(prod: ProductEntity | ProductDataEntity | null): string {
  if (!prod) return ''

  const imageDocumentId =
    'image_document_id' in prod
      ? prod.image_document_id
      : 'documents' in prod
        ? prod.documents?.[0]?.document_id
        : undefined

  return ZohoHelpers.getZohoProductImageUrl({
    imageName: prod?.image_name,
    imageDocumentId
  })
}

useSeoMeta({ title: 'Shopping cart' })
</script>
