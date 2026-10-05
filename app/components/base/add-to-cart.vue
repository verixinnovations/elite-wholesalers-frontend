<template>
  <UButton
    :icon="productInCart ? 'i-lucide-shopping-bag' : 'i-icon-shopping-cart-plus'"
    :class="{
      'bg-success-500': productInCart
    }"
    v-bind="$attrs"
    class="flex items-center justify-center px-5!"
    :disabled="productInCart"
    @click="addToCart"
  >
    <span>{{ productInCart ? 'Added' : 'Add to Cart' }}</span>
  </UButton>
</template>

<script setup lang="ts">
import { RouteName } from '~/constants/route-names'
import { useAuthStore } from '~/store/auth-store'
import { useCartStore } from '~/store/cart-store'
import { useProductStore } from '~/store/product-store'
import type { ProductEntity, ProductDataEntity } from '~/types/product'

const props = defineProps<{
  product?: ProductEntity
}>()

const authStore = useAuthStore()
const cartStore = useCartStore()
const productStore = useProductStore()
const { isLoggedIn } = storeToRefs(authStore)
const { selectedProduct } = storeToRefs(productStore)
const product = computed<ProductEntity | ProductDataEntity | null>(
  () => props.product ?? selectedProduct.value
)
const productInCart = computed(() =>
  product.value ? cartStore.cartItems.some((item) => item.itemId === product.value?.item_id) : false
)

function addToCart() {
  if (!product.value) return
  if (!isLoggedIn.value) {
    navigateTo({ name: RouteName.Auth.Login })
    return
  }
  cartStore.addToCart(product.value, 1)
}
</script>

<style scoped></style>
