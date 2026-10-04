import { useAuthStore } from '~/store/auth-store'

export default defineNuxtRouteMiddleware((to) => {
  const { isLoggedIn } = storeToRefs(useAuthStore())
  if (isLoggedIn) return

  return navigateTo({
    path: '/login',
    query: { redirect: to.fullPath }
  })
})
