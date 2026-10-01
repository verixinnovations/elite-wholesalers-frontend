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

    <div class="flex gap-x-4 mr-36">
      <UNavigationMenu
        :items="items"
        variant="link"
        content-orientation="vertical"
        :highlight="false"
        :unmount-on-hide="false"
        orientation="horizontal"
        class=""
      />
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
        <UChip :show="false" size="3xl" inset :ui="{ base: 'px-2 py-2 bottom-4 text-xs!' }">
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
            <NuxtLink>
              <UAvatar icon="i-lucide-user-round" loading="lazy" width="64" height="64" />
            </NuxtLink>
          </UChip>
          <UButton
            label="Log out"
            variant="solid"
            class="rounded-4xl px-5 text-xs bg-error"
            @click="authStore.logout()"
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
import { useProductStore } from '~/store/product-store'
import { useCartStore } from '~/stores/useCartStore'

const authStore = useAuthStore()
const productStore = useProductStore()
const { isLoggedIn } = storeToRefs(authStore)

const { categories } = storeToRefs(productStore)
const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Home',
    to: '/'
  },
  {
    label: 'Products',
    to: '/categories',
    children: categories?.value
      ? categories.value.map((category) => ({
          label: category.name,
          to: {
            name: RouteName.Categories,
            params: { categoryId: category.category_id }
          }
        }))
      : []
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
