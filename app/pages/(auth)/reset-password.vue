<template>
  <div>
    <div class="mb-10">
      <p class="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-[#024b8f]">
        New credentials
      </p>
      <h1
        class="font-oswald text-[clamp(2.2rem,5vw,3.5rem)] font-medium leading-[1.05] text-[#081c36]"
      >
        Set a new password
      </h1>
      <p class="mt-4 leading-[1.6] text-[#727782]">
        Choose a strong password you’ll remember for next time.
      </p>
    </div>
    <UAlert v-if="message" :color="messageColor" :title="message" class="mb-6" />
    <UForm :schema="schema" :state="state" class="space-y-5" @submit="onSubmit">
      <UFormField label="Email address" name="email" required>
        <UInput
          v-model="state.email"
          type="email"
          placeholder="you@company.com"
          icon="i-lucide-mail"
        />
      </UFormField>
      <UFormField label="Reset token" name="token" required>
        <UInput
          v-model="state.token"
          placeholder="Paste your reset token"
          icon="i-lucide-key-round"
        />
      </UFormField>
      <UFormField label="New password" name="password" required>
        <UInput
          v-model="state.password"
          type="password"
          placeholder="Use at least 8 characters"
          icon="i-lucide-lock-keyhole"
        />
      </UFormField>
      <UFormField label="Confirm new password" name="password_confirmation" required>
        <UInput
          v-model="state.password_confirmation"
          type="password"
          placeholder="Repeat your new password"
          icon="i-lucide-shield-check"
        />
      </UFormField>
      <UButton
        type="submit"
        label="Reset password"
        icon="i-lucide-check"
        trailing
        block
        size="xl"
        :loading="loading"
      />
    </UForm>
  </div>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { RouteName } from '~/constants/route-names'
import { AuthService } from '~/services/auth.service'

definePageMeta({ name: RouteName.Auth.ResetPassword, layout: 'auth' })
const route = useRoute()
const schema = z
  .object({
    email: z.email('Enter a valid email address'),
    token: z.string().min(1, 'Enter your reset token'),
    password: z.string().min(8, 'Use at least 8 characters'),
    password_confirmation: z.string().min(1, 'Confirm your password')
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords do not match',
    path: ['password_confirmation']
  })
type Schema = z.output<typeof schema>
const state = reactive<Schema>({
  email: typeof route.query.email === 'string' ? route.query.email : '',
  token: typeof route.query.token === 'string' ? route.query.token : '',
  password: '',
  password_confirmation: ''
})
const loading = ref(false)
const message = ref('')
const messageColor = ref<'success' | 'error'>('error')

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  try {
    await AuthService.resetPassword({ ...event.data, auth_field: 'email' })
    messageColor.value = 'success'
    message.value = 'Your password was reset. You can now sign in.'
  } catch {
    message.value = 'We could not reset your password. Check the token and try again.'
  } finally {
    loading.value = false
  }
}
</script>
