<template>
  <section>
    <div
      class="flex flex-col justify-between gap-4 border-b border-neutral-200 pb-6 sm:flex-row sm:items-end"
    >
      <div>
        <p class="text-xs font-bold uppercase tracking-[0.16em] text-primary-500">Account</p>
        <h1 class="mt-2 font-oswald text-4xl font-medium text-neutral-950">My orders</h1>
      </div>
      <p class="text-sm text-neutral-500">{{ orders?.length ?? 0 }} orders</p>
    </div>

    <div v-if="pending" class="space-y-3 py-6" aria-label="Loading orders">
      <div v-for="index in 3" :key="index" class="h-16 animate-pulse bg-neutral-100" />
    </div>
    <UAlert
      v-else-if="error"
      class="mt-6"
      color="error"
      title="Your order history could not be loaded."
    />
    <div v-else-if="!orders?.length" class="py-16 text-center">
      <UIcon name="i-lucide-package-open" class="mx-auto size-10 text-neutral-300" />
      <h2 class="mt-4 font-oswald text-2xl text-neutral-900">No orders yet</h2>
      <UButton label="Browse products" to="/products" class="mt-5" />
    </div>
    <div v-else class="mt-6 overflow-hidden border-y border-neutral-200">
      <div
        class="hidden grid-cols-[1.3fr_1fr_1fr_1fr] gap-4 bg-neutral-50 px-4 py-3 text-xs font-bold uppercase tracking-wider text-neutral-500 md:grid"
      >
        <span>Order</span><span>Date</span><span>Total</span><span>Status</span>
      </div>
      <article
        v-for="order in orders"
        :key="order.id"
        class="grid gap-3 border-t border-neutral-200 px-4 py-5 first:border-t-0 md:grid-cols-[1.3fr_1fr_1fr_1fr] md:items-center md:gap-4"
      >
        <div>
          <p class="text-xs font-semibold uppercase text-neutral-400 md:hidden">Order</p>
          <p class="font-semibold text-neutral-900">{{ order.id }}</p>
          <p class="mt-1 text-xs text-neutral-500">{{ order.items.length }} line items</p>
        </div>
        <div class="flex items-center justify-between md:block">
          <p class="text-xs font-semibold uppercase text-neutral-400 md:hidden">Date</p>
          <time class="text-sm text-neutral-600" :datetime="order.createdAt">{{
            formatDate(order.createdAt)
          }}</time>
        </div>
        <div class="flex items-center justify-between md:block">
          <p class="text-xs font-semibold uppercase text-neutral-400 md:hidden">Total</p>
          <span class="text-sm font-semibold text-neutral-900">{{
            NumberFunctions.formatCurrency(order.total)
          }}</span>
        </div>
        <div class="flex items-center justify-between md:block">
          <p class="text-xs font-semibold uppercase text-neutral-400 md:hidden">Status</p>
          <span
            class="inline-flex items-center px-2.5 py-1 text-xs font-semibold"
            :class="statusClass(order.status)"
          >
            {{ order.status }}
          </span>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { getUserOrders } from '~/services/order.service'
import type { OrderStatus } from '~/types/ecommerce'

definePageMeta({
  layout: 'dashboard',
  middleware: 'dashboard-auth'
})

const { data: orders, pending, error } = await useAsyncData('user-orders', getUserOrders)

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date(value))
}

function statusClass(status: OrderStatus) {
  if (status === 'Delivered') return 'bg-green-100 text-green-800'
  if (status === 'Shipped') return 'bg-blue-100 text-blue-800'
  if (status === 'Cancelled') return 'bg-red-100 text-red-800'
  return 'bg-yellow-100 text-yellow-900'
}

useSeoMeta({ title: 'My orders' })
</script>
