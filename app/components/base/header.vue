<template>
  <UHeader
    class="mx-auto"
    :toggle="{
      color: 'primary',
      variant: 'subtle',
      class: 'rounded-full flex items-center'
    }"
  >
    <template #title>
      <BaseLogo class="w-auto" />
    </template>

    <div class="flex gap-x-4 mr-10">
      <div v-for="item in items" :key="item.label" class="">
        <UButton
          color="neutral"
          variant="link"
          :label="item.label"
          :to="item.to"
          :icon="item.icon"
          :target="item.target"
          class="text-sm! font-semibold text-primary"
        />
      </div>
    </div>

    <template #right>
      <div class="flex items-center gap-2">
        <UInput
          icon="i-lucide-search"
          size="md"
          variant="outline"
          placeholder="Search..."
          class="min-w-sm"
        />
        <UChip
          :text="cart.totalItems || undefined"
          size="3xl"
          inset
          :ui="{ base: 'px-2 py-2 bottom-4 text-xs!' }"
        >
          <UButton
            icon="i-lucide-shopping-bag"
            color="neutral"
            variant="ghost"
            size="xl"
            to="/cart"
            aria-label="Shopping cart"
          />
        </UChip>
        <template v-if="isLoggedIn">
          <UChip inset class="cursor-pointer">
            <UAvatar src="/images/avatar.png" loading="lazy" width="64" height="64" />
          </UChip>
          <UButton
            label="Log out"
            variant="solid"
            class="rounded-4xl px-5 text-xs bg-error"
            @click="authStore.logout()"
          />
          <UButton
            icon="i-lucide-user-round"
            color="neutral"
            variant="ghost"
            to="/dashboard/orders"
            aria-label="My account"
          />
        </template>
        <template v-else>
          <UButton
            label="Login"
            variant="solid"
            class="rounded-4xl px-5 text-xs"
            :to="{ name: RouteName.Auth.Login }"
          />
        </template>
      </div>
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { RouteName } from '~/constants/route-names'
import { useAuthStore } from '~/store/auth-store'
import { useCartStore } from '~/stores/useCartStore'

const authStore = useAuthStore()
const { isLoggedIn } = storeToRefs(authStore)
const cart = useCartStore()

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Home',
    to: '/'
  },
  {
    label: 'Products',
    to: '/products'
  },
  {
    label: 'Download center',
    to: '/download-center'
  },
  {
    label: 'About Us',
    to: '/about-us'
  }
])
</script>
