<template>
  <div class="mx-auto mt-10 flex w-full flex-col gap-8">
    <UPinInput
      v-model="state.otp"
      otp
      class=""
      placeholder="*"
      length="4"
      :ui="{
        base: 'size-8 text-xl rounded-lg'
      }"
      @change="validatePinComplete"
    />

    <div class="flex items-center justify-between">
      <UBadge class="cursor-pointer bg-transparent" @click="retryOtp">
        <UIcon name="i-icon-retry" />
        <span class="text-primary">Resend OTP </span>
        <span class="dark:text-neutral text-black">in 00:{{ getTimer }}s</span>
      </UBadge>
      <UBadge class="text-primary cursor-pointer bg-transparent"> Use phone number </UBadge>
    </div>

    <UButton
      type="submit"
      class="disabled:bg-primary-200 flex items-center rounded-full!"
      block
      size="xl"
      label="Confirm code"
      font="font-bold"
      :loading="loading"
      :disabled="!isComplete"
      @click="verifyEmail"
    />
  </div>
</template>

<script setup lang="ts">
import { RouteName } from '~/constants/route-names'
import { useAuthStore } from '~/store/auth-store'

definePageMeta({
  name: RouteName.Auth.Verify,
  layout: 'auth',
  pageTitle: 'Email Verification',
  pageLabel: 'ID Verification'
})

const authStore = useAuthStore()
const route = useRoute()

const loading = ref(false)
const state = ref({
  otp: []
})

const isComplete = ref(false)

const validatePinComplete = () => {
  if (state.value.otp?.length === 4) {
    isComplete.value = true
  } else {
    isComplete.value = false
  }
}

const timer = ref(59)
const retryOtp = () => {
  const interval = setInterval(() => {
    timer.value--
    if (timer.value <= 0) {
      clearInterval(interval)
      timer.value = 59
    }
  }, 1000)
}

const getTimer = computed(() => timer.value)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const verifyEmail = async () => {
  loading.value = true

  await authStore.verifyOTP({
    email: route.query.email as string,
    token: state.value.otp.join('')
  })

  loading.value = false
}

watchEffect(() => {
  route.meta.pageHint = `Enter the 6-digit code sent to your email address`
})
</script>

<style scoped></style>
