<template>
  <div class="min-h-screen bg-white text-neutral-900">
    <BaseGlobalInfo />
    <BaseHeader />
    <div class="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl md:grid-cols-[220px_minmax(0,1fr)]">
      <aside
        class="border-b border-neutral-200 px-5 py-4 md:border-b-0 md:border-r md:px-4 md:py-8"
      >
        <p
          class="hidden px-3 text-xs font-bold uppercase tracking-[0.16em] text-neutral-400 md:block"
        >
          Account
        </p>
        <nav
          class="mt-0 flex gap-2 overflow-x-auto md:mt-4 md:flex-col"
          aria-label="Account navigation"
        >
          <NuxtLink
            v-for="item in navigation"
            :key="item.to"
            :to="item.to"
            class="flex shrink-0 items-center gap-3 px-3 py-2.5 text-sm font-semibold text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-950"
            active-class="bg-primary-50 text-primary-700 hover:bg-primary-50"
          >
            <UIcon :name="item.icon" class="size-4" />
            {{ item.label }}
          </NuxtLink>
        </nav>
        <UButton
          label="Log out"
          variant="ghost"
          block
          class="rounded! mt-2.5 px-3 gap-3 justify-start text-xs text-error"
          @click="authStore.logout()"
        >
          <UIcon name="i-lucide-log-out" class="size-4" />
          <span class="">Logout </span></UButton
        >
      </aside>
      <main class="min-w-0 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth-store'
import { useOrderStore } from '~/store/order-store'

const authStore = useAuthStore()
const orderStore = useOrderStore()

const navigation = [
  { label: 'Overview', to: '/dashboard', icon: 'i-lucide-layout-dashboard' },
  { label: 'Profile', to: '/dashboard/profile', icon: 'i-lucide-user-round' },
  { label: 'My orders', to: '/dashboard/orders', icon: 'i-lucide-package-check' },
  { label: 'Addresses', to: '/dashboard/addresses', icon: 'i-lucide-map-pin' }
]

onBeforeMount(() => {
  orderStore.getOrders()
})
</script>
