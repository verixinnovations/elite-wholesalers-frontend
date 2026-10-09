import { useAuthStore } from '~/store/auth-store'
import { AccountType } from '~/types/enums'

export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore()
  const { isAdmin } = storeToRefs(authStore)

  if (isAdmin) {
    return
  }

  return abortNavigation()
})
