import { useAuthStore } from '~/store/auth-store'

export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.client) {
    const { isLoggedIn } = storeToRefs(useAuthStore())
    if (isLoggedIn.value) return
    return navigateTo({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }
})
