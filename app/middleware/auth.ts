import { useAuthStore } from '~/store/auth-store'

export default defineNuxtRouteMiddleware((to) => {
  const { isLoggedIn } = storeToRefs(useAuthStore())

  if (import.meta.server) return

  if (isLoggedIn.value) return

  return navigateTo({
    path: '/login',
    query: { redirect: to.fullPath }
  })
})
