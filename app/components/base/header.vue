<template>
  <UHeader
    class="mx-auto bg-primary ring-transparent border-none text-white"
    :toggle="{
      color: 'primary',
      variant: 'subtle',
      class: 'rounded-full  flex items-center'
    }"
  >
    <template #title>
      <BaseLogo class="w-auto" variant="white" />
    </template>

    <div class="flex gap-x-4 2xl:mr-20">
      <UNavigationMenu
        :items="items"
        variant="link"
        class=""
        color="secondary"
        content-orientation="vertical"
        :highlight="false"
        :unmount-on-hide="false"
        orientation="horizontal"
        :ui="{
          link: 'font-semibold text-white aria-[current=page]:text-secondary hover:text-secondary!'
        }"
      />
    </div>

    <template #right>
      <div class="flex items-center gap-2">
        <UInputMenu
          trailing-icon=""
          :items="filteredSearch"
          class="min-w-xs"
          icon="i-lucide-search"
          size="md"
          variant="outline"
          placeholder="Search product"
          @update:search-term="(value) => productStore.searchProducts(value)"
        >
          <template #item="{ item }">
            <div
              class="flex gap-x-2"
              @click="router.push({ name: RouteName.ProductDetails, params: { id: item.item_id } })"
            >
              <img :src="item.product_image" class="size-10" />
              <h2 class="text-xxs line-clamp-1 overflow-hidden text-ellipsis">{{ item.label }}</h2>
            </div>
          </template>
        </UInputMenu>
        <UChip
          :show="itemCount > 0"
          size="3xl"
          inset
          :text="itemCount >= 99 ? '99+' : itemCount"
          :ui="{ base: 'size-4 rounded-full! bottom-4 text-xxs! bg-error text-white' }"
        >
          <UButton
            icon="i-lucide-shopping-bag"
            variant="ghost"
            size="xl"
            to="/cart"
            class="text-white"
            aria-label="Shopping cart"
          />
        </UChip>
        <template v-if="isLoggedIn">
          <UChip inset class="cursor-pointer">
            <NuxtLink :to="{ name: RouteName.Profile }">
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
import { useCartStore } from '~/store/cart-store'
import { useProductStore } from '~/store/product-store'

const authStore = useAuthStore()
const productStore = useProductStore()
const cartStore = useCartStore()

const { isLoggedIn } = storeToRefs(authStore)
const { categories, searchedProducts } = storeToRefs(productStore)
const { cartItems, itemCount } = storeToRefs(cartStore)

const router = useRouter()
const route = useRoute()

const filteredSearch = computed(() =>
  searchedProducts.value.map((item) => ({
    label: item.name,
    value: item.item_id,
    product_image: ZohoHelpers.getZohoProductImageUrl({
      imageName: item.image_name,
      imageDocumentId: item.image_document_id
    }),
    ...item
  }))
)
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
          },
          onSelect() {
            productStore.selectCategory(category)
          }
        }))
      : []
  },
  {
    label: 'Download center',
    to: '/download-center'
  },
  {
    label: 'Contact Us',
    to: '/contact-us'
  },
  {
    label: 'About Us',
    to: '/about-us'
  }
])
</script>
