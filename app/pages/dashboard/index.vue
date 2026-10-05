<template>
  <section>
    <header class="border-b border-neutral-200 pb-6">
      <p class="text-xs font-bold uppercase tracking-[0.16em] text-primary-500">Account</p>
      <h1 class="mt-2 font-oswald text-4xl font-medium text-neutral-950">
        <span class="text-2xl block">{{ DateFunctions.getLocalGreeting() }},</span>
        <span class="">{{ user?.fullname }}</span>
      </h1>
      <p class="mt-2 text-sm text-neutral-500">Your account at a glance.</p>
    </header>

    <div class="mt-7 grid gap-4 sm:grid-cols-3">
      <NuxtLink to="/dashboard/orders" class="border border-neutral-200 p-5 hover:bg-neutral-50">
        <p class="text-sm text-neutral-500">Orders</p>
        <p class="mt-2 font-oswald text-3xl text-neutral-950">{{ orders.length }}</p>
      </NuxtLink>
      <!-- <NuxtLink to="/dashboard/addresses" class="border border-neutral-200 p-5 hover:bg-neutral-50">
        <p class="text-sm text-neutral-500">Saved addresses</p>
        <p class="mt-2 font-oswald text-3xl text-neutral-950">{{ addresses.length }}</p>
      </NuxtLink> -->
      <div class="border border-neutral-200 p-5">
        <p class="text-sm text-neutral-500">Cart items</p>
        <p class="mt-2 font-oswald text-3xl text-neutral-950">{{ itemCount }}</p>
      </div>
    </div>

    <div class="mt-10">
      <section>
        <div class="flex items-center justify-between">
          <h2 class="font-oswald text-2xl text-neutral-950">Recent orders</h2>
          <NuxtLink
            to="/dashboard/orders"
            class="text-sm font-semibold text-primary-600 hover:underline"
            >View all</NuxtLink
          >
        </div>
        <ProductsOrderList :orders="recentOrders" />
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouteName } from '~/constants/route-names'
import { useAuthStore } from '~/store/auth-store'
import { useCartStore } from '~/store/cart-store'
import { useOrderStore } from '~/store/order-store'

definePageMeta({ layout: 'dashboard', name: RouteName.Profile, middleware: 'auth' })
useSeoMeta({ title: 'Account overview' })

const authStore = useAuthStore()
const cartStore = useCartStore()
const { user } = storeToRefs(authStore)
const { itemCount } = storeToRefs(cartStore)
const { orders } = storeToRefs(useOrderStore())

const recentOrders = computed(() => orders.value.slice(0, 3))
</script>
