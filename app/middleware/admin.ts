import { useAuthStore } from '~/store/auth-store'

export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore()
  const { isAdmin } = storeToRefs(authStore)

  if (import.meta.server) return

  if (isAdmin.value) {
    return
  }

  return abortNavigation()
})
