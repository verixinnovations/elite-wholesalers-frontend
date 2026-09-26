<template>
  <div>
    <UForm
      v-slot="formState"
      :state="state"
      :schema="validationSchema"
      class="mx-auto mt-10 flex w-full flex-col gap-4"
      @submit="signInUser"
    >
      <UFormField label="Email Address" name="email">
        <UInput v-model="state.email" class="w-full" placeholder="raygean.donald@gmail.com" />
      </UFormField>

      <UFormField name="password" label="Password">
        <UInput
          v-model="state.password"
          :type="show ? 'text' : 'password'"
          placeholder="********"
          class="w-full"
        >
          <template #trailing>
            <UButton
              variant="link"
              size="lg"
              :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
              aria-label="show ? 'Hide password' : 'Show password'"
              :aria-pressed="show"
              aria-controls="password"
              @click="show = !show"
            />
          </template>
        </UInput>

        <template #help>
          <div class="flex w-full justify-end text-right">
            <ULink
              class="text-primary ml-auto text-right font-medium"
              color="primary"
              :to="{ name: RouteName.Auth.ForgotPassword }"
              >Forgot password</ULink
            >
          </div>
        </template>
      </UFormField>
      <UButton
        type="submit"
        class="disabled:bg-primary-400 flex items-center rounded-full"
        block
        size="xl"
        font="font-bold"
        label="Log In"
        :loading="formState?.loading"
        :disabled="formState?.errors.length !== 0 || formState?.loading"
      />
    </UForm>
    <p class="mt-2 text-center text-sm text-neutral-400">
      New to Elite Wholesalers?
      <UButton variant="link" :to="{ name: RouteName.Auth.SignUp }" class="">
        Create an account
      </UButton>
    </p>
  </div>
</template>

<script setup lang="ts">
import * as zod from 'zod'
import { RouteName } from '~/constants/route-names'
import type { FormSubmitEvent } from '@nuxt/ui'
import { useAuthStore } from '~/store/auth-store'
import { useSEO } from '~/utils/seo.utils'

definePageMeta({
  name: RouteName.Auth.Login,
  layout: 'auth',
  pageLabel: 'Welcome back',
  pageTitle: 'Signin to your account',
  pageHint: 'Pick up from where you stopped!'
})

useSEO({
  title: 'Log In to EliteWholeSalers',
  description: 'Sign in to your Nakanaki account to start buying exclusive devices.',
  keywords: 'login, sign in, account, marketplace'
})

const validationSchema = zod.object({
  email: zod.email('Please enter a valid email'),
  password: zod.string({ message: 'Password is required' })
})

type Schema = zod.output<typeof validationSchema>

const authStore = useAuthStore()
const show = ref(false)
const state = ref<Partial<Schema>>({
  email: undefined,
  password: undefined
})

const signInUser = async (values: FormSubmitEvent<Schema>) => {
  await authStore.login(values.data, true)
}
</script>
