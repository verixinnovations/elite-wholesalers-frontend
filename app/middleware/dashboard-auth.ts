import { useAuthStore } from '~/store/auth-store'

export default defineNuxtRouteMiddleware((to) => {
  if (useAuthStore().isLoggedIn) return

  return navigateTo({
    path: '/login',
    query: { redirect: to.fullPath }
  })
})
