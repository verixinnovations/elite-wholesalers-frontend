<template>
  <section>
    <header class="border-b border-neutral-200 pb-6">
      <p class="text-xs font-bold uppercase tracking-[0.16em] text-primary-500">Account</p>
      <h1 class="mt-2 font-oswald text-4xl font-medium text-neutral-950">
        Welcome back, {{ profile.name.split(' ')[0] }}
      </h1>
      <p class="mt-2 text-sm text-neutral-500">Your account at a glance.</p>
    </header>

    <div class="mt-7 grid gap-4 sm:grid-cols-3">
      <NuxtLink to="/dashboard/orders" class="border border-neutral-200 p-5 hover:bg-neutral-50">
        <p class="text-sm text-neutral-500">Orders</p>
        <p class="mt-2 font-oswald text-3xl text-neutral-950">{{ orders.length }}</p>
      </NuxtLink>
      <NuxtLink to="/dashboard/addresses" class="border border-neutral-200 p-5 hover:bg-neutral-50">
        <p class="text-sm text-neutral-500">Saved addresses</p>
        <p class="mt-2 font-oswald text-3xl text-neutral-950">{{ addresses.length }}</p>
      </NuxtLink>
      <div class="border border-neutral-200 p-5">
        <p class="text-sm text-neutral-500">Cart items</p>
        <p class="mt-2 font-oswald text-3xl text-neutral-950">{{ cartQuantity }}</p>
      </div>
    </div>

    <div class="mt-10 grid gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(280px,0.8fr)]">
      <section>
        <div class="flex items-center justify-between border-b border-neutral-200 pb-3">
          <h2 class="font-oswald text-2xl text-neutral-950">Recent orders</h2>
          <NuxtLink
            to="/dashboard/orders"
            class="text-sm font-semibold text-primary-600 hover:underline"
            >View all</NuxtLink
          >
        </div>
        <ul class="divide-y divide-neutral-200">
          <li
            v-for="order in recentOrders"
            :key="order.id"
            class="flex items-center justify-between gap-4 py-4"
          >
            <div>
              <p class="font-semibold text-neutral-900">{{ order.id }}</p>
              <p class="mt-1 text-sm text-neutral-500">{{ formatDate(order.createdAt) }}</p>
            </div>
            <div class="text-right">
              <p class="text-sm font-semibold">{{ formatPrice(order.total) }}</p>
              <p class="mt-1 text-xs text-neutral-500">{{ order.status }}</p>
            </div>
          </li>
        </ul>
      </section>

      <section>
        <div class="flex items-center justify-between border-b border-neutral-200 pb-3">
          <h2 class="font-oswald text-2xl text-neutral-950">Cart</h2>
          <span class="text-sm text-neutral-500">{{ formatPrice(cartTotal) }}</span>
        </div>
        <div v-if="!cart.length" class="py-8 text-sm text-neutral-500">
          Your mock cart is empty.
        </div>
        <ul v-else class="divide-y divide-neutral-200">
          <li v-for="item in cart" :key="item.cart_id" class="flex items-center gap-3 py-4">
            <img
              :src="item.product.image_url"
              :alt="item.product.name"
              class="size-14 object-cover"
            />
            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-semibold text-neutral-900">{{ item.product.name }}</p>
              <p class="mt-1 text-xs text-neutral-500">{{ formatPrice(item.price.amount) }} each</p>
            </div>
            <div class="flex items-center border border-neutral-200">
              <button
                class="size-8"
                :aria-label="`Decrease ${item.product.name} quantity`"
                @click="changeQuantity(item.cart_id, -1)"
              >
                −
              </button>
              <span class="min-w-7 text-center text-sm tabular-nums">{{ item.quantity }}</span>
              <button
                class="size-8"
                :aria-label="`Increase ${item.product.name} quantity`"
                @click="changeQuantity(item.cart_id, 1)"
              >
                +
              </button>
            </div>
            <button
              class="p-1 text-neutral-400 hover:text-red-700"
              :aria-label="`Remove ${item.product.name}`"
              @click="removeItem(item.cart_id)"
            >
              <UIcon name="i-lucide-trash-2" class="size-4" />
            </button>
          </li>
        </ul>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouteName } from '~/constants/route-names'
import dashboardData from '~/data/data.json'

definePageMeta({ layout: 'dashboard', name: RouteName.Profile, middleware: 'auth' })

const profile = dashboardData.profile
const addresses = dashboardData.addresses
const orders = dashboardData.orders
const cart = ref(structuredClone(dashboardData.carts))
const recentOrders = computed(() => orders.slice(0, 3))
const cartQuantity = computed(() => cart.value.reduce((sum, item) => sum + item.quantity, 0))
const cartTotal = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price.amount * item.quantity, 0)
)

function changeQuantity(cartId: string, delta: number) {
  const item = cart.value.find((entry) => entry.cart_id === cartId)
  if (item) item.quantity = Math.max(1, item.quantity + delta)
}

function removeItem(cartId: string) {
  cart.value = cart.value.filter((item) => item.cart_id !== cartId)
}

function formatPrice(amount: number) {
  return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(amount)
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date(value))
}

useSeoMeta({ title: 'Account overview' })
</script>
