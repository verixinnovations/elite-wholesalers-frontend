<template>
  <main class="mx-auto max-w-5xl px-5 py-10 sm:px-8 lg:py-14">
    <div class="border-b border-neutral-200 pb-6">
      <p class="text-xs font-bold uppercase tracking-[0.16em] text-primary-500">Checkout</p>
      <h1 class="mt-2 font-oswald text-4xl font-medium text-neutral-950">Delivery details</h1>
    </div>

    <div v-if="cartItems.length === 0" class="py-16 text-center">
      <h2 class="font-oswald text-2xl text-neutral-900">Your cart is empty</h2>
      <UButton label="Browse products" to="/products" class="mt-5" />
    </div>

    <div v-else class="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
      <section class="space-y-6">
        <p class="text-sm leading-6 text-neutral-600">
          Add your contact and delivery details. Order submission can be connected when the checkout
          flow is ready.
        </p>

        <form class="space-y-4" @submit.prevent="submitted = true">
          <UFormField label="Email address" required>
            <UInput
              v-model="email"
              type="email"
              autocomplete="email"
              placeholder="you@business.com"
              required
              class="w-full"
            />
          </UFormField>
          <UFormField label="Delivery address" required>
            <UTextarea
              v-model="address"
              autocomplete="street-address"
              placeholder="Street, city, state and postcode"
              required
              class="w-full"
            />
          </UFormField>
          <UButton type="submit" label="Continue" icon="i-lucide-arrow-right" trailing />
          <p v-if="submitted" role="status" class="text-sm text-neutral-600">
            Checkout submission is not connected yet.
          </p>
        </form>

        <NuxtLink to="/cart" class="text-sm font-semibold text-primary-600 hover:underline">
          Return to cart
        </NuxtLink>
      </section>

      <aside
        class="border-t border-neutral-200 pt-6 lg:sticky lg:top-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"
      >
        <h2 class="font-oswald text-2xl text-neutral-950">Order summary</h2>
        <ul class="mt-5 divide-y divide-neutral-200">
          <li v-for="item in cartItems" :key="item.cart_id" class="flex justify-between gap-4 py-3">
            <span class="text-sm text-neutral-700"
              >{{ item.product.name }} × {{ item.quantity }}</span
            >
            <span class="shrink-0 text-sm text-neutral-700">
              {{ formatPrice(item.price.amount * item.quantity, item.price.currency) }}
            </span>
          </li>
        </ul>
        <div
          class="mt-4 flex justify-between border-t border-neutral-200 pt-4 font-bold text-neutral-950"
        >
          <span>Subtotal</span>
          <span>{{ formatPrice(subtotal, currencyCode) }}</span>
        </div>
        <p class="mt-3 text-xs leading-5 text-neutral-500">
          Shipping and taxes can be confirmed when your order is reviewed.
        </p>
      </aside>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { Currency } from '~/types/enums'
import { useCartStore } from '~/store/cart-store'

const cartStore = useCartStore()
const { cartItems, subtotal } = storeToRefs(cartStore)
const email = ref('')
const address = ref('')
const submitted = ref(false)
const currencyCode = computed(() => cartItems.value[0]?.price.currency ?? 'AUD')

function formatPrice(amount: number, currency: Currency | string) {
  return new Intl.NumberFormat('en-AU', { style: 'currency', currency }).format(amount)
}

useSeoMeta({ title: 'Checkout' })
</script>
