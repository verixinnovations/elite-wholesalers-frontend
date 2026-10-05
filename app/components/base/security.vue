<template>
  <section class="max-w-2xl">
    <header class="border-b border-neutral-200 pb-6">
      <p class="text-xs font-bold uppercase tracking-[0.16em] text-primary-500">Account</p>
      <h1 class="mt-2 font-oswald text-4xl font-medium text-neutral-950">Security</h1>
      <p class="mt-2 text-sm text-neutral-500">
        Choose a strong password to help protect your account.
      </p>
    </header>

    <form class="mt-7 space-y-5" @submit.prevent="changePassword">
      <UFormField label="Current password" required>
        <UInput
          v-model="form.currentPassword"
          type="password"
          autocomplete="current-password"
          class="w-full"
          required
        />
      </UFormField>
      <UFormField
        label="New password"
        :hint="`At least ${dashboardData.security.passwordMinimumLength} characters`"
        required
      >
        <UInput
          v-model="form.newPassword"
          type="password"
          autocomplete="new-password"
          class="w-full"
          :aria-invalid="Boolean(passwordError)"
          required
        />
      </UFormField>
      <UFormField label="Confirm new password" required>
        <UInput
          v-model="form.confirmNewPassword"
          type="password"
          autocomplete="new-password"
          class="w-full"
          :aria-invalid="Boolean(passwordError)"
          required
        />
      </UFormField>
      <p v-if="passwordError" class="text-sm text-red-700" role="alert">{{ passwordError }}</p>
      <p v-if="successMessage" class="text-sm text-green-700" role="status">{{ successMessage }}</p>
      <UButton
        type="submit"
        label="Update password"
        icon="i-lucide-lock-keyhole"
        :disabled="!isValid"
      />
    </form>
  </section>
</template>

<script setup lang="ts">
import dashboardData from '~/data/data.json'

definePageMeta({ layout: 'dashboard', middleware: 'auth' })

const form = reactive(structuredClone(dashboardData.securityForm))
const successMessage = ref('')
const passwordError = computed(() => {
  if (form.newPassword && form.newPassword.length < dashboardData.security.passwordMinimumLength) {
    return `Use at least ${dashboardData.security.passwordMinimumLength} characters for your new password.`
  }
  if (form.confirmNewPassword && form.newPassword !== form.confirmNewPassword) {
    return 'The new passwords do not match.'
  }
  return ''
})
const isValid = computed(
  () =>
    Boolean(form.currentPassword) &&
    form.newPassword.length >= dashboardData.security.passwordMinimumLength &&
    form.newPassword === form.confirmNewPassword
)

function changePassword() {
  if (!isValid.value) return
  form.currentPassword = ''
  form.newPassword = ''
  form.confirmNewPassword = ''
  successMessage.value = 'Password form validated. Password updates are not connected yet.'
}

useSeoMeta({ title: 'Security settings' })
</script>
