<template>
  <div>
    <div v-if="!orders.length" class="py-16 text-center">
      <UIcon name="i-lucide-package-open" class="mx-auto size-10 text-neutral-300" />
      <h2 class="mt-4 font-oswald text-2xl text-neutral-900">No orders yet</h2>
      <UButton label="Browse products" to="/products" class="mt-5" />
    </div>

    <div v-else class="mt-6 divide-y divide-neutral-200 border-y border-neutral-200">
      <article v-for="order in orders" :key="order.salesorder_id" class="py-6 first:pt-5">
        <header class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-3">
              <h2 class="font-semibold text-neutral-950">{{ order.salesorder_number }}</h2>
              <NuxtLink
                :to="`/dashboard/orders/${order.salesorder_id}`"
                @click="orderStore.selectOrder(order.salesorder_id)"
                class="text-xs font-medium text-primary-600 hover:underline"
              >
                View Details →
              </NuxtLink>
            </div>
            <time class="mt-1 block text-sm text-neutral-500" :datetime="order.date">
              {{ DateFunctions.formatDateTime(order.date) }}
            </time>
          </div>
          <div class="flex items-center gap-4">
            <span class="text-sm font-bold text-neutral-950">
              {{ NumberFunctions.formatCurrency(order.total) }}
            </span>
            <span
              class="inline-flex px-2.5 py-1 text-xs font-semibold capitalize rounded-full"
              :class="statusClass(order.status)"
            >
              {{ order.status }}
            </span>
          </div>
        </header>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SalesOrder } from '~/types/order'
import { useOrderStore } from '~/store/order-store'

defineProps<{
  orders: SalesOrder[]
}>()

const orderStore = useOrderStore()

function statusClass(status: string) {
  const lower = status?.toLowerCase()
  if (lower === 'delivered' || lower === 'closed') return 'bg-green-100 text-green-800'
  if (lower === 'shipped' || lower === 'confirmed') return 'bg-blue-100 text-blue-800'
  if (lower === 'cancelled' || lower === 'void') return 'bg-red-100 text-red-800'
  return 'bg-yellow-100 text-yellow-900'
}
</script>
