import { useAuthStore } from '~/store/auth-store'
import { AccountType } from '~/types/enums'

export default defineNuxtRouteMiddleware((to) => {
  const { user, isLoggedIn } = storeToRefs(useAuthStore())
  if (isLoggedIn && user.value?.accountType === AccountType.ADMIN) return
  else return abortNavigation()
})
