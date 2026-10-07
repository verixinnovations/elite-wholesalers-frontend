<template>
  <main class="mx-auto max-w-5xl px-5 py-10 sm:px-8 lg:py-14">
    <div class="border-b border-neutral-200 pb-6">
      <p class="text-xs font-bold uppercase tracking-[0.16em] text-primary-500">Checkout</p>
      <h1 class="mt-2 font-oswald text-4xl font-medium text-neutral-950">Delivery details</h1>
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

    <div v-else class="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
      <section class="space-y-6">
        <p class="text-sm leading-6 text-neutral-600">
          Add your contact and delivery details. Order submission can be connected when the checkout
          flow is ready.
        </p>

        <form class="space-y-4" @submit.prevent="checkoutCart">
          <UFormField label="Email address">
            <UInput
              v-model="email"
              type="email"
              autocomplete="email"
              placeholder="you@business.com"
              required
              class="w-full"
            />
          </UFormField>
          <UFormField label="Delivery address">
            <UTextarea
              v-model="address"
              autocomplete="street-address"
              placeholder="Street, city, state and postcode"
              required
              class="w-full"
            />
          </UFormField>
          <UButton :loading="isLoading" type="submit" block size="lg">
            <span class="">Checkout </span>
            <UIcon name="i-lucide-arrow-right" />
          </UButton>
        </form>

        <UButton variant="outline" block>
          <NuxtLink
            to="/cart"
            class="text-sm items-center flex gap-x-2 font-semibold text-primary-600 hover:underline"
          >
            <UIcon name="i-lucide-arrow-left" />
            <span class=""> Return to cart</span>
          </NuxtLink>
        </UButton>
      </section>

      <aside
        class="border-t border-neutral-200 pt-6 lg:sticky lg:top-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"
      >
        <h2 class="font-oswald text-2xl text-neutral-950">Order summary</h2>
        <ul class="mt-5 divide-y divide-neutral-200">
          <li v-for="item in cartItems" :key="item.cartId" class="flex justify-between gap-4 py-3">
            <span class="text-sm text-neutral-700"
              >{{ item.product.name }} × {{ item.quantity }}</span
            >
            <span class="shrink-0 text-sm text-neutral-700">
              {{ NumberFunctions.formatCurrency(item.total, item.price.currency) }}
            </span>
          </li>
        </ul>
        <div
          class="mt-4 flex justify-between border-t border-neutral-200 pt-4 font-bold text-neutral-950"
        >
          <span>Subtotal</span>
          <span>{{ NumberFunctions.formatCurrency(subtotal, Currency.AUD) }}</span>
        </div>
        <p class="mt-3 text-xs leading-5 text-neutral-500">
          Shipping and taxes can be confirmed when your order is reviewed.
        </p>
      </aside>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useCartStore } from '~/store/cart-store'
import { useAuthStore } from '~/store/auth-store'
import { CartService } from '~/services/cart.service'
import { Currency } from '~/types/enums'

import { RouteName } from '~/constants/route-names'
definePageMeta({
  middleware: 'auth',
  name: RouteName.Checkout
})

const cartStore = useCartStore()
const { user } = storeToRefs(useAuthStore())
const { cartItems, subtotal } = storeToRefs(cartStore)
const email = ref(user.value?.email)
const address = ref('')
const toast = useToast()
const isLoading = ref(false)

useSeoMeta({ title: 'Checkout' })

onBeforeMount(async () => {
  await cartStore.fetchCart()
})

const checkoutCart = async () => {
  isLoading.value = true

  try {
    const response = await CartService.initializeCheckout()
    if (response?.data.payment_url) {
      window.location.href = response.data.payment_url
    }
    cartStore.fetchCart()
  } catch (error: any) {
    toast.add({ title: error?.message || 'Failed to initialize checkout. Please try again.' })
  } finally {
    isLoading.value = false
  }
}
</script>
