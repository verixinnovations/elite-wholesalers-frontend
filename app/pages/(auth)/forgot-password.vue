<template>
  <div>
    <NuxtLink
      :to="{ name: RouteName.Auth.Login }"
      class="mb-10 inline-flex items-center gap-2 text-sm font-bold text-[#727782] hover:text-[#024b8f]"
      ><UIcon name="i-lucide-arrow-left" /> Back to sign in</NuxtLink
    >
    <div class="mb-10">
      <p class="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-[#024b8f]">
        Account recovery
      </p>
      <h1
        class="font-oswald text-[clamp(2.2rem,5vw,3.5rem)] font-medium leading-[1.05] text-[#081c36]"
      >
        Forgot your password?
      </h1>
      <p class="mt-4 leading-[1.6] text-[#727782]">
        Enter your email and we’ll send you a secure link to reset it.
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
      <UButton
        type="submit"
        label="Send reset link"
        icon="i-lucide-send"
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

definePageMeta({ name: RouteName.Auth.ForgotPassword, layout: 'auth' })
const schema = z.object({ email: z.email('Enter a valid email address') })
type Schema = z.output<typeof schema>
const state = reactive<Schema>({ email: '' })
const loading = ref(false)
const message = ref('')
const messageColor = ref<'success' | 'error'>('error')

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  try {
    await AuthService.forgotPassword({ ...event.data, auth_field: 'email' })
    messageColor.value = 'success'
    message.value = 'If an account exists for that email, a reset link is on its way.'
  } catch {
    message.value = 'We could not send the reset link. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
