<template>
  <section>
    <div
      class="flex flex-col justify-between gap-4 border-b border-neutral-200 pb-6 sm:flex-row sm:items-end"
    >
      <div>
        <p
          class="text-xs font-bold uppercase tracking-[0.16em] text-primary-500"
          :class="{
            'text-primary': user?.accountType === AccountType.INDIVIDUAL,
            'text-success-500': user?.accountType === AccountType.TRADER,
            'text-rose-600': user?.accountType === AccountType.ADMIN
          }"
        >
          {{ user?.accountType }} Account
        </p>
        <h1 class="mt-2 font-oswald text-4xl font-medium text-neutral-950">My orders</h1>
      </div>
      <p class="text-sm text-neutral-500">{{ orders.length }} orders</p>
    </div>

    <ProductsOrderList :orders="orders" />
  </section>
</template>

<script setup lang="ts">
import { RouteName } from '~/constants/route-names'
import { useAuthStore } from '~/store/auth-store'
import { useOrderStore } from '~/store/order-store'
import { AccountType } from '~/types/enums'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  name: RouteName.Orders
})

const { user } = storeToRefs(useAuthStore())
const orderStore = useOrderStore()
const { orders } = storeToRefs(orderStore)

useSeoMeta({ title: 'My orders' })
</script>
