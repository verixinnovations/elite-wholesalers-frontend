<template>
  <UHeader
    class="mx-auto bg-primary ring-transparent border-none text-white px-4 sm:px-6"
    color="primary"
    :toggle="{
      variant: 'ghost',
      class: 'rounded-full text-secondary flex items-center lg:hidden hover:bg-white/10'
    }"
    :ui="{
      content: 'bg-primary text-white'
    }"
  >
    <!-- Logo -->
    <template #title>
      <BaseLogo class="h-10 sm:w-auto md:block hidden" variant="white" />
      <BaseLogo class="h-8! md:hidden" variant="small" />
    </template>

    <!-- Desktop Horizontal Navigation (Hidden on Mobile) -->
    <div class="hidden lg:flex gap-x-4 2xl:mr-20">
      <UNavigationMenu
        :items="items"
        variant="link"
        content-orientation="vertical"
        :highlight="false"
        :unmount-on-hide="false"
        orientation="horizontal"
        :ui="{
          link: 'font-semibold text-white  aria-[current=page]:text-secondary hover:text-secondary!'
        }"
      />
    </div>

    <!-- Right Side Actions (Search, Cart, Profile/Login) -->
    <template #right>
      <div class="flex items-center gap-1.5 sm:gap-2">
        <!-- Search Input: responsive width -->
        <UInputMenu
          trailing-icon=""
          :items="filteredSearch"
          class="w-40 sm:w-44 md:min-w-xs"
          icon="i-lucide-search"
          size="sm"
          sm:size="md"
          variant="outline"
          placeholder="Search..."
          @update:search-term="(value) => productStore.searchProducts(value)"
        >
          <template #item="{ item }">
            <div
              class="flex gap-x-2 items-center"
              @click="router.push({ name: RouteName.ProductDetails, params: { id: item.item_id } })"
            >
              <img :src="item.product_image" class="size-8 sm:size-10 object-cover rounded" />
              <h2 class="text-xs line-clamp-1 overflow-hidden text-ellipsis">{{ item.label }}</h2>
            </div>
          </template>
        </UInputMenu>

        <!-- Shopping Cart -->
        <UChip
          v-if="isLoggedIn"
          :show="itemCount > 0"
          size="2xl"
          sm:size="3xl"
          inset
          :text="itemCount >= 99 ? '99+' : itemCount"
          :ui="{ base: 'size-4 rounded-full! bottom-3 sm:bottom-4 text-xxs! bg-error text-white' }"
        >
          <UButton
            icon="i-lucide-shopping-bag"
            variant="ghost"
            size="lg"
            sm:size="xl"
            to="/cart"
            class="text-white p-1 sm:p-2"
            aria-label="Shopping cart"
          />
        </UChip>

        <!-- Profile or Login -->
        <template v-if="isLoggedIn">
          <UChip inset class="cursor-pointer">
            <UDropdownMenu
              arrow
              :ui="{ itemLeadingIcon: 'shrink-0 size-4' }"
              :items="dashboardNavigation"
              :content="{
                align: 'end',
                side: 'bottom',
                sideOffset: 8
              }"
            >
              <UAvatar icon="i-lucide-user-round" loading="lazy" size="sm" sm:size="md" />
            </UDropdownMenu>
          </UChip>
        </template>
        <template v-else>
          <UButton
            label="Login"
            variant="outline"
            class="rounded-4xl bg-white border hover:bg-primary hover:text-white px-3 sm:px-5 text-xs sm:text-sm whitespace-nowrap"
            :to="{ name: RouteName.Auth.Login }"
          />
        </template>
      </div>
    </template>

    <template #body>
      <div class="flex flex-col gap-4 py-4">
        <UNavigationMenu
          :items="items"
          orientation="vertical"
          variant="link"
          class="-mx-2.5"
          :ui="{
            link: 'font-semibold py-2 px-3 rounded-md text-white transition-all hover:bg-white/10 hover:text-white [&.router-link-active]:bg-white [&.router-link-active]:text-primary-600 [&[data-active]]:bg-white [&[data-active]]:text-primary-600',
            childLink:
              'font-medium py-1.5 px-3 rounded-md text-gray-300 transition-all hover:bg-white/10 hover:text-white [&.router-link-active]:bg-white [&.router-link-active]:text-primary-600 text-sm'
          }"
        />
      </div>
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
            productStore.selectCategory(category.category_id)
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

const dashboardNavigation = ref([
  { label: 'Dashboard', to: '/dashboard', icon: 'i-lucide-layout-dashboard' },
  { label: 'Profile', to: '/dashboard/profile', icon: 'i-lucide-user-round' },
  { label: 'My orders', to: '/dashboard/orders', icon: 'i-lucide-package-check' },
  { label: 'Addresses', to: '/dashboard/addresses', icon: 'i-lucide-map-pin' },
  {
    label: 'Logout',
    icon: 'i-lucide-log-out',
    class: 'text-error',
    color: 'error',
    onSelect: () => authStore.logout()
  }
])
</script>
