<template>
  <section>
    <div
      class="flex flex-col justify-between gap-4 border-b border-neutral-200 pb-6 sm:flex-row sm:items-end"
    >
      <div>
        <p class="text-xs font-bold uppercase tracking-[0.16em] text-primary-500">Account</p>
        <h1 class="mt-2 font-oswald text-4xl font-medium text-neutral-950">My orders</h1>
      </div>
      <p class="text-sm text-neutral-500">{{ orders.length }} orders</p>
    </div>

    <div v-if="!orders.length" class="py-16 text-center">
      <UIcon name="i-lucide-package-open" class="mx-auto size-10 text-neutral-300" />
      <h2 class="mt-4 font-oswald text-2xl text-neutral-900">No orders yet</h2>
      <UButton label="Browse products" to="/products" class="mt-5" />
    </div>
    <div v-else class="mt-6 divide-y divide-neutral-200 border-y border-neutral-200">
      <article v-for="order in orders" :key="order.id" class="py-6 first:pt-5">
        <header class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 class="font-semibold text-neutral-950">{{ order.id }}</h2>
            <time class="mt-1 block text-sm text-neutral-500" :datetime="order.createdAt">
              {{ formatDate(order.createdAt) }}
            </time>
          </div>
          <div class="flex items-center gap-4">
            <span class="text-sm font-bold text-neutral-950">{{ formatPrice(order.total) }}</span>
            <span
              class="inline-flex px-2.5 py-1 text-xs font-semibold"
              :class="statusClass(order.status)"
            >
              {{ order.status }}
            </span>
          </div>
        </header>
        <ul class="mt-4 divide-y divide-neutral-100">
          <li
            v-for="line in order.items"
            :key="line.product.item_id"
            class="flex items-center gap-4 py-3"
          >
            <img
              :src="productImage(line.product)"
              :alt="line.product.name"
              class="size-16 shrink-0 object-cover bg-neutral-100"
            />
            <div class="min-w-0 flex-1">
              <p class="font-medium text-neutral-900">{{ line.product.name }}</p>
              <p class="mt-1 text-xs text-neutral-500">
                {{ line.product.sku }} · Qty {{ line.quantity }}
              </p>
            </div>
            <p class="shrink-0 text-sm text-neutral-700">
              {{ formatPrice(line.product.rate * line.quantity) }}
            </p>
          </li>
        </ul>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import dashboardData from '~/data/data.json'
import type { ProductEntity } from '~/types/product'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

interface MockOrder {
  id: string
  status: string
  createdAt: string
  total: number
  items: { product: ProductEntity; quantity: number }[]
}

const orders = dashboardData.orders as unknown as MockOrder[]

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date(value))
}

function statusClass(status: string) {
  if (status === 'Delivered') return 'bg-green-100 text-green-800'
  if (status === 'Shipped') return 'bg-blue-100 text-blue-800'
  if (status === 'Cancelled') return 'bg-red-100 text-red-800'
  return 'bg-yellow-100 text-yellow-900'
}

function formatPrice(value: number) {
  return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(value)
}

function productImage(product: ProductEntity) {
  return (
    (product as ProductEntity & { image_url?: string }).image_url ??
    '/images/product-placeholder.png'
  )
}

useSeoMeta({ title: 'My orders' })
</script>
