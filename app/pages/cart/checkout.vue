<template>
  <UContainer class="mx-auto px-5 py-10 lg:py-14">
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

    <div v-else class="checkout w-full mt-8 md:flex items-start gap-10 lg:gap-16">
      <section class="space-y-6">
        <p class="text-sm leading-6 text-neutral-600">
          Review your delivery details below. Order submission can be connected when the checkout
          flow is ready.
        </p>

        <!-- Missing Address Warning / Prompt -->
        <div
          v-if="!hasCompleteAddress"
          class="rounded-xl border border-amber-200 bg-amber-50 p-5 text-amber-900 space-y-3"
        >
          <div class="flex items-start gap-3">
            <UIcon name="i-lucide-alert-triangle" class="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            <div class="text-sm">
              <p class="font-semibold">Delivery address required</p>
              <p class="mt-1 text-amber-800">
                You must add a complete delivery address before you can proceed with checkout.
              </p>
            </div>
          </div>
          <UButton
            label="Add delivery address"
            to="/dashboard/addresses"
            color="warning"
            variant="solid"
            size="md"
            block
            class="font-medium"
          />
        </div>

        <!-- Checkout Form / Address Card -->
        <UForm v-else class="space-y-4" @submit.prevent="checkoutCart">
          <UFormField label="Delivery address">
            <!-- Styled card container for the saved address -->
            <div
              class="mt-1.5 rounded-lg border border-neutral-200 bg-neutral-50/50 p-4 text-sm text-neutral-800"
            >
              <address class="not-italic space-y-1">
                <p class="font-medium text-neutral-950">{{ user?.location?.street }}</p>
                <p class="text-neutral-600">
                  {{ user?.location?.city }}, {{ user?.location?.state }}
                  <span class="font-mono text-xs text-neutral-500">{{
                    user?.location?.postal_code
                  }}</span>
                </p>
                <p class="text-neutral-600">{{ user?.location?.country }}</p>
              </address>
            </div>
          </UFormField>

          <UButton
            :loading="isLoading"
            type="submit"
            size="lg"
            class="w-full lg:w-3/5 mx-auto text-center px-10 justify-center flex"
          >
            <span>Checkout</span>
            <UIcon name="i-lucide-arrow-right" />
          </UButton>
        </UForm>

        <!-- Disabled Checkout Action when address is missing -->
        <div v-if="!hasCompleteAddress">
          <UButton
            disabled
            size="lg"
            class="w-full lg:w-3/5 mx-auto text-center px-10 justify-center flex opacity-60 cursor-not-allowed"
          >
            <span>Checkout</span>
            <UIcon name="i-lucide-arrow-right" />
          </UButton>
        </div>

        <UButton
          variant="outline"
          class="w-full lg:w-3/5 mx-auto text-center px-10 justify-center flex"
        >
          <NuxtLink to="/cart" class="text-sm items-center flex gap-x-2">
            <UIcon name="i-lucide-arrow-left" />
            <span>Return to cart</span>
          </NuxtLink>
        </UButton>
      </section>

      <div
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
      </div>
    </div>
  </UContainer>
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
const toast = useToast()
const isLoading = ref(false)

// Computed check to verify if the user has a complete saved delivery address
const hasCompleteAddress = computed(() => {
  const loc = user.value?.location
  return Boolean(
    loc &&
    loc.street?.trim() &&
    loc.city?.trim() &&
    loc.state?.trim() &&
    loc.country?.trim() &&
    loc.postal_code
  )
})

useSeoMeta({ title: 'Checkout' })

onBeforeMount(async () => {
  await cartStore.fetchCart()
})

const checkoutCart = async () => {
  if (!hasCompleteAddress.value) {
    toast.add({ title: 'Please add a delivery address before checking out.', color: 'error' })
    return
  }

  isLoading.value = true

  try {
    const response = await CartService.initializeCheckout()
    if (response?.data.payment_url) {
      window.location.href = response.data?.payment_url
    }
    cartStore.fetchCart()
  } catch (error: any) {
    toast.add({ title: 'Failed to initialize checkout. Please try again.' })
  } finally {
    isLoading.value = false
  }
}
</script>

<style lang="css">
@media screen and (min-width: 1024px) {
  .checkout {
    display: grid !important;
    grid-template-columns: 3fr 2fr !important;
  }
}
</style>
