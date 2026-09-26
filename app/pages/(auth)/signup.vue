<template>
  <div>
    <div class="mb-8">
      <div class="mb-3 flex items-center justify-between gap-4">
        <p class="text-xs font-bold uppercase tracking-[0.14em] text-primary-500">
          {{ currentStep?.title }}
        </p>
        <span v-if="step > 0" class="text-sm font-medium text-zinc-500"
          >Step {{ step }} of {{ totalSteps }}</span
        >
      </div>
    </div>

    <div v-if="step > 0" class="mb-8 flex gap-2" aria-label="Signup progress">
      <div
        v-for="item in totalSteps"
        :key="item"
        class="h-1.5 flex-1 rounded-full transition-colors"
        :class="item <= step ? 'bg-primary-500' : 'bg-zinc-200'"
      />
    </div>

    <AuthAccountType v-if="step === 0" v-model="signupDetails.accountType" @continue="step = 2" />
    <template v-if="signupDetails.accountType === AccountType.TRADER">
      <AuthBusinessDetails v-if="step === 2" @back="step = 0" @continue="step = 3" />
      <AuthUserDetails v-else-if="step === 3" @back="step = 2" @continue="step = 4" />
      <AuthShipmentDetails v-else-if="step === 4" @back="step = 3" @submit="createTraderAccount" />
    </template>

    <template v-else>
      <AuthUserDetails v-if="step === 2" @back="step = 2" @continue="step = 3" />
      <AuthShipmentDetails
        v-else-if="step === 3"
        @back="step = 2"
        @submit="createIndividualAccount"
      />
    </template>

    <p class="mt-8 text-center text-sm text-zinc-500">
      Already have an account?
      <NuxtLink
        :to="{ name: RouteName.Auth.Login }"
        class="font-bold text-primary-500 hover:underline"
        >Sign in</NuxtLink
      >
    </p>
  </div>
</template>

<script setup lang="ts">
import { RouteName } from '~/constants/route-names'
import { useAuthStore } from '~/store/auth-store'
import { AccountType } from '~/types/enums'

definePageMeta({ name: RouteName.Auth.SignUp, layout: 'auth' })
const authStore = useAuthStore()
const { signupDetails, signupBusinessDetails, signupLocationDetails } = storeToRefs(authStore)

const step = ref(0)

const totalSteps = computed(() => (signupDetails.value.accountType === AccountType.TRADER ? 4 : 3))

const steps = computed(() => {
  if (signupDetails.value.accountType === AccountType.TRADER) {
    return [
      {
        stepIndex: 1,
        title: 'Account Type',
        description: 'Select your account type as a ratail trader or individual buyer'
      },
      {
        stepIndex: 2,
        title: 'Business Details',
        description: 'Enter your business details for verification'
      },
      {
        stepIndex: 3,
        title: 'Personal Details',
        description: 'Enter your personal profile information'
      },
      {
        stepIndex: 4,
        title: 'Delivery details',
        description: 'Enter your address for delivery.'
      }
    ]
  } else
    return [
      {
        stepIndex: 1,
        title: 'Account Type',
        description: 'Select your account type as a ratail trader or individual buyer'
      },
      {
        stepIndex: 2,
        title: 'Personal Details',
        description: 'Enter your personal profile information'
      },
      {
        stepIndex: 3,
        title: 'Delivery details',
        description: 'Enter your address for delivery.'
      }
    ]
})

const currentStep = computed(() => steps.value.find((stepx) => stepx.stepIndex === step.value))

const createTraderAccount = async () => {
  const data = {
    ...signupDetails.value,
    ...signupLocationDetails.value,
    business_details: signupBusinessDetails.value
  }

  await authStore.signupUser(data)
}

const createIndividualAccount = async () => {
  const data = {
    ...signupDetails.value,
    ...signupLocationDetails.value
  }
  await authStore.signupUser(data)
}
</script>
