<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
import { useAuthStore } from './store/auth-store'
import { useCartStore } from './store/cart-store'

const cartStore = useCartStore()
const authStore = useAuthStore()
const { isLoggedIn } = storeToRefs(authStore)
// useHead({
//   titleTemplate: (titleChunk) => {
//     return titleChunk ? `${titleChunk}` : ''
//   }
// })

onBeforeMount(() => {
  if (isLoggedIn) {
    cartStore.fetchCart()
    authStore.getProfile()
  }
})
</script>
