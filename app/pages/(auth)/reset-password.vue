<template>
  <div>
    <UForm v-slot="formState" :schema="schema" :state="state" class="space-y-5" @submit="onSubmit">
      <UFormField class="w-full" label="New password" name="password" required>
        <UInput
          v-model="state.password"
          :type="show ? 'text' : 'password'"
          class="w-full"
          placeholder="Use at least 8 characters"
          icon="i-lucide-lock-keyhole"
          ><template #trailing>
            <UButton
              variant="link"
              size="lg"
              :icon="show ? 'i-lucide-eye' : 'i-lucide-eye-off'"
              aria-label="show ? 'Hide password' : 'Show password'"
              :aria-pressed="show"
              aria-controls="password"
              @click="show = !show"
            /> </template
        ></UInput>
      </UFormField>
      <UFormField class="w-full" label="Confirm new password" name="password_confirmation" required>
        <UInput
          class="w-full"
          v-model="state.password_confirmation"
          :type="show ? 'text' : 'password'"
          placeholder="Re-enter your new password"
          icon="i-lucide-lock-keyhole"
          ><template #trailing>
            <UButton
              variant="link"
              size="lg"
              :icon="show ? 'i-lucide-eye' : 'i-lucide-eye-off'"
              aria-label="show ? 'Hide password' : 'Show password'"
              :aria-pressed="show"
              aria-controls="password"
              @click="show = !show"
            /> </template
        ></UInput>
      </UFormField>
      <UButton type="submit" label="Reset password" block size="xl" :loading="formState?.loading" />
    </UForm>
  </div>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { RouteName } from '~/constants/route-names'
import { useAuthStore } from '~/store/auth-store'

const authStore = useAuthStore()
definePageMeta({
  name: RouteName.Auth.ResetPassword,
  layout: 'auth',
  pageLabel: 'Reset Credentials',
  pageTitle: 'Reset your password'
})

const route = useRoute()
const show = ref(false)
const schema = z
  .object({
    email: z.email('Enter a valid email address'),
    verification_code: z.string().min(1, 'Enter your reset token'),
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
  verification_code: typeof route.query.token === 'string' ? route.query.token : '',
  password: '',
  password_confirmation: ''
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  await authStore.resetPassword({ ...event.data })
}
</script>
