import { useAuthStore } from '~/store/auth-store'

export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.client) {
    const authStore = useAuthStore()
    const { isAdmin } = storeToRefs(authStore)
    if (isAdmin.value) {
      return
    }
    return abortNavigation()
  }
})
