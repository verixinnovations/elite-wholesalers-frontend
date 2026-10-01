<template>
  <UButton
    :icon="productInCart ? 'i-icon-shopping-cart' : 'i-icon-shopping-cart-plus'"
    :class="{
      'bg-success-500': productInCart
    }"
    v-bind="$attrs"
    class="flex items-center justify-center px-5!"
  >
    <span class=""> {{ productInCart ? 'Added' : 'Add to Cart' }}</span>
  </UButton>
</template>

<script setup lang="ts">
const cartQuantity = computed(() => 10)
const productInCart = computed(() => (Math.random() > 0.5 ? true : false))
const addToCart = () => {
  console.log('Added to cart')
}
</script>

<style scoped></style>
