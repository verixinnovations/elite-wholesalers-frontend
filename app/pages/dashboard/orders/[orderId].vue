<template>
  <section class="max-w-4xl">
    <div class="mb-6 flex items-center justify-between">
      <UButton
        label="Back to Orders"
        icon="i-lucide-arrow-left"
        variant="ghost"
        to="/dashboard/orders"
      />
      <span
        v-if="order"
        class="inline-flex px-3 py-1 text-xs font-semibold capitalize rounded-full"
        :class="statusClass(order.status)"
      >
        {{ order.status }}
      </span>
    </div>

    <template v-if="order">
      <div class="border-b border-neutral-200 pb-6">
        <p class="text-xs font-bold uppercase tracking-[0.16em] text-primary-500">Order Details</p>
        <h1 class="mt-2 font-oswald text-4xl font-medium text-neutral-950">
          {{ order.salesorder_number }}
        </h1>
        <p class="mt-1 text-sm text-neutral-500">Placed on {{ formatDate(order.date) }}</p>
      </div>

      <!-- Essential Order Info Cards (Zoho Statuses) -->
      <div class="mt-6 grid gap-4 sm:grid-cols-3">
        <div class="rounded-xl border border-neutral-200 p-4">
          <p class="text-xs font-bold uppercase tracking-wider text-neutral-400">Order Status</p>
          <p class="mt-1 font-medium capitalize text-neutral-900">{{ order.order_status }}</p>
        </div>
        <div class="rounded-xl border border-neutral-200 p-4">
          <p class="text-xs font-bold uppercase tracking-wider text-neutral-400">Shipping Status</p>
          <p class="mt-1 font-medium capitalize text-neutral-900">{{ order.shipped_status }}</p>
        </div>
        <div class="flex justify-between rounded-xl border border-neutral-200 p-4">
          <div class="">
            <p class="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Payment Status
            </p>
            <p class="mt-1 font-medium capitalize text-neutral-900">{{ order.paid_status }}</p>
          </div>
          <UButton
            v-if="order.paid_status === 'unpaid'"
            @click="checkoutOrder"
            :loading="isLoading"
            label="Pay"
            class="rounded-lg! px-4 py-1! h-8!"
          />
        </div>
      </div>

      <!-- Delivery Address & Financial Summary -->
      <div class="mt-8 grid gap-6 sm:grid-cols-2">
        <div class="rounded-xl border border-neutral-200 p-5">
          <h2 class="font-oswald text-xl text-neutral-950 mb-3">Delivery Address</h2>
          <div class="text-sm text-neutral-600 space-y-1">
            <p class="font-medium text-neutral-900">
              {{ order.shipping_address.attention || order.customer_name }}
            </p>
            <p>{{ order.shipping_address.address }} {{ order.shipping_address.street2 }}</p>
            <p>
              {{ order.shipping_address.city }}, {{ order.shipping_address.state }}
              {{ order.shipping_address.zip }}
            </p>
            <p>{{ order.shipping_address.country }}</p>
          </div>
        </div>

        <div class="rounded-xl border border-neutral-200 p-5">
          <h2 class="font-oswald text-xl text-neutral-950 mb-3">Summary</h2>
          <div class="text-sm text-neutral-600 space-y-2">
            <div class="flex justify-between">
              <span>Subtotal</span>
              <span>{{ formatPrice(order.sub_total) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Tax (GST)</span>
              <span>{{ formatPrice(order.tax_total) }}</span>
            </div>
            <div
              class="flex justify-between border-t border-neutral-200 pt-2 font-bold text-neutral-950"
            >
              <span>Total</span>
              <span>{{ formatPrice(order.total) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Line Items with Zoho Helpers Image Generation -->
      <div class="mt-8">
        <h2 class="font-oswald text-2xl text-neutral-950 mb-4">Ordered Items</h2>
        <div class="divide-y divide-neutral-200 rounded-xl border border-neutral-200">
          <div
            v-for="line in order.line_items"
            :key="line.line_item_id"
            class="flex items-center gap-4 p-4 sm:p-5"
          >
            <img
              :src="
                ZohoHelpers.getZohoProductImageUrl({
                  imageName: line.image_name,
                  imageDocumentId: line.image_document_id
                })
              "
              :alt="line.name"
              class="size-16 shrink-0 object-cover bg-neutral-100 rounded-md border border-neutral-200"
            />
            <div class="min-w-0 flex-1">
              <p class="font-medium text-neutral-900">{{ line.name }}</p>
              <p class="mt-1 text-xs text-neutral-500">
                SKU: {{ line.sku }} · Qty {{ line.quantity }}
              </p>
            </div>
            <p class="shrink-0 font-semibold text-neutral-900">
              {{ formatPrice(line.item_total) }}
            </p>
          </div>
        </div>
      </div>
    </template>

    <div v-else class="py-16 text-center text-sm text-neutral-500">Loading order details...</div>
  </section>
</template>

<script setup lang="ts">
import { OrderService } from '~/services/order.service'
import { useOrderStore } from '~/store/order-store'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

const route = useRoute()
const orderId = route.params.orderId as string

const orderStore = useOrderStore()
const { order } = storeToRefs(orderStore)

function formatDate(value: string) {
  if (!value) return ''
  return new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date(value))
}

function statusClass(status: string) {
  const lower = status?.toLowerCase()
  if (lower === 'confirmed') return 'bg-blue-100 text-blue-800'
  if (lower === 'closed') return 'bg-green-100 text-green-800'
  if (lower === 'void') return 'bg-red-100 text-red-800'
  if (lower === 'draft') return 'bg-yellow-100 text-yellow-800'
  return 'bg-neutral-100 text-neutral-800'
}

function formatPrice(value: number) {
  return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(value ?? 0)
}

useSeoMeta({ title: computed(() => `Order ${order.value?.salesorder_number ?? ''}`) })
const isLoading = ref(false)
const toast = useToast()

const checkoutOrder = async () => {
  isLoading.value = true
  try {
    const response = await OrderService.payForOrder(orderId)
    if (response?.data.payment_url) {
      window.location.href = response.data.payment_url
    }
  } catch (error: any) {
    toast.add({ title: error?.message || 'Failed to initialize checkout. Please try again.' })
  } finally {
    isLoading.value = false
  }
}

onBeforeMount(() => {
  orderStore.selectOrder(orderId)
})
</script>
