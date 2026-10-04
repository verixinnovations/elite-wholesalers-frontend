<template>
  <div>
    <UForm v-slot="formState" :schema="schema" :state="state" class="space-y-5" @submit="onSubmit">
      <UFormField label="Email address" name="email" required>
        <UInput
          v-model="state.email"
          type="email"
          placeholder="you@company.com"
          icon="i-lucide-mail"
          class="w-full"
        />
      </UFormField>
      <UButton
        :loading="formState?.loading"
        type="submit"
        block
        class="flex justify-center!"
        size="xl"
      >
        <span class="">Send reset link</span>
        <UIcon name="i-lucide-send" />
      </UButton>
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
  name: RouteName.Auth.ForgotPassword,
  layout: 'auth',
  pageLabel: 'Account Recovery',
  pageTitle: 'Forgot your password',
  hasBackButton: true,
  pageHint: 'Enter your email and we’ll send you a secure link to reset it.'
})

const schema = z.object({ email: z.email('Enter a valid email address') })
type Schema = z.output<typeof schema>
const state = reactive<Schema>({ email: '' })

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    await authStore.forgotPassword({ ...event.data })
  } catch {
  } finally {
  }
}
</script>
