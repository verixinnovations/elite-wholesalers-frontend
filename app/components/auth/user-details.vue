<template>
  <UForm
    v-slot="formState"
    :schema="schema"
    :state="signupDetails"
    class="space-y-5"
    @submit="onSubmit"
  >
    <UFormField label="First name" name="firstname" required class="w-full">
      <UInput
        v-model="signupDetails.firstname"
        placeholder="First name"
        icon="i-lucide-user-round"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Last name" name="lastname" class="w-full" required>
      <UInput
        v-model="signupDetails.lastname"
        class="w-full"
        placeholder="Last name"
        icon="i-lucide-user-round"
      />
    </UFormField>

    <!-- <UFormField class="w-full" label="Email address" name="email" required>
      <UInput
        v-model="signupDetails.email"
        type="email"
        class="w-full"
        placeholder="you@example.com"
        icon="i-lucide-mail"
      />
    </UFormField> -->
    <UFormField class="w-full" label="Email address" name="email" required>
      <UInput
        v-model="signupDetails.email"
        type="email"
        class="w-full"
        placeholder="you@example.com"
        leadingIcon="i-lucide-mail"
        @change="authStore.checkDuplicateEmail(signupDetails.email)"
        :ui="{
          base:
            !signupDetails.email || emailDetails.isAvailable || emailDetails.loading
              ? ''
              : '!ring-error',
          leadingIcon:
            !signupDetails.email || emailDetails.loading
              ? ''
              : emailDetails.isAvailable
                ? '!text-success'
                : '!text-error'
        }"
      >
        <template #trailing>
          <UIcon
            v-if="emailDetails.loading"
            name="i-lucide-loader-circle"
            class="animate-spin text-primary"
          />
          <UIcon
            v-else-if="emailDetails.isAvailable"
            name="i-lucide-check-circle"
            class="text-success"
          />
        </template>
      </UInput>

      <template #help>
        <p v-if="emailDetails.errorReason" class="text-error">
          {{ emailDetails.errorReason }}
        </p>
      </template>
    </UFormField>

    <UFormField label="Phone number" class="w-full" name="phone_number" required>
      <BasePhoneInput
        v-model="signupDetails.phone_number"
        type="tel"
        class="w-full"
        placeholder="Your contact number"
        icon="i-lucide-phone"
      />
    </UFormField>

    <UFormField label="Password" name="password" required>
      <UInput
        v-model="signupDetails.password"
        class="w-full"
        :type="show ? 'text' : 'password'"
        placeholder="Create a password"
        icon="i-lucide-lock"
      >
        <template #trailing>
          <UButton
            color="neutral"
            variant="link"
            size="sm"
            :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
            :aria-label="show ? 'Hide password' : 'Show password'"
            :aria-pressed="show"
            aria-controls="password"
            @click="show = !show"
          />
        </template>
      </UInput>
    </UFormField>

    <UFormField label="Confirm password" name="password_confirmation" required>
      <UInput
        v-model="signupDetails.password_confirmation"
        class="w-full"
        :type="show ? 'text' : 'password'"
        placeholder="Create a password"
        icon="i-lucide-lock"
      >
        <template #trailing>
          <UButton
            color="neutral"
            variant="link"
            size="sm"
            :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
            :aria-label="show ? 'Hide password' : 'Show password'"
            :aria-pressed="show"
            aria-controls="password"
            @click="show = !show"
          />
        </template>
      </UInput>
    </UFormField>
    <UButton
      type="submit"
      class="justify-center!"
      trailing
      block
      size="xl"
      :loading="formState?.loading"
      :disabled="formState?.errors.length !== 0 || formState?.loading || !emailDetails.isAvailable"
    >
      <span>Continue</span>
      <UIcon name="i-lucide-arrow-right" />
    </UButton>
  </UForm>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { useAuthStore } from '~/store/auth-store'

const authStore = useAuthStore()
const { signupDetails, emailDetails } = storeToRefs(authStore)

const emit = defineEmits(['continue'])
const show = ref(false)

const schema = z
  .object({
    firstname: z.string().min(2, 'Enter your first name'),
    lastname: z.string().min(2, 'Enter your last name'),
    email: z.email('Enter a valid email address'),
    phone_number: z.string('Enter a valid phone number'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    password_confirmation: z.string()
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ['password_confirmation']
  })

type Schema = z.output<typeof schema>

function onSubmit(event: FormSubmitEvent<Schema>) {
  emit('continue')
}
</script>
