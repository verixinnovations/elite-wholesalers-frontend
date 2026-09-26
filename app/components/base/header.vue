<template>
  <UHeader
    class="mx-auto"
    :toggle="{
      color: 'primary',
      variant: 'subtle',
      class: 'rounded-full'
    }"
  >
    <template #title>
      <BaseLogo class="h-6 w-auto" />
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
          class="font-semibold text-primary text-lg"
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
        <UChip :text="599" size="3xl" inset :ui="{ base: 'px-2 py-2 bottom-4 text-xs!' }">
          <UButton icon="i-lucide-shopping-bag" color="neutral" variant="ghost" size="xl" />
        </UChip>
        <UChip inset class="cursor-pointer" v-if="isLoggedIn">
          <UAvatar src="/images/avatar.png" loading="lazy" width="64" height="64" />
        </UChip>
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

const { isLoggedIn } = storeToRefs(useAuthStore())

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Home',
    to: '/',
    active: route.path.startsWith('/docs/getting-started')
  },
  {
    label: 'Products',
    to: '/',
    active: route.path.startsWith('/docs/components')
  },
  {
    label: 'Solutions',
    to: '/',
    target: '_blank'
  },
  {
    label: 'Terms',
    to: '/',
    target: '_blank'
  },
  {
    label: 'About Us',
    to: '/',
    target: '_blank'
  }
])
</script>
