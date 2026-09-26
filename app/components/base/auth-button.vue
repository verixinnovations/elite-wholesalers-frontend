<template>
  <UButton v-bind="$attrs" @click="checkAuthState">
    <slot />
  </UButton>
</template>

<script setup lang="ts">
import { RouteName } from '~/constants/route-names'
import { useAuthStore } from '~/store/auth-store'

const { isLoggedIn } = storeToRefs(useAuthStore())
const router = useRouter()
const checkAuthState = () => {
  if (isLoggedIn.value) return
  else router.push({ name: RouteName.Auth.Login })
}
</script>

<style scoped></style>
