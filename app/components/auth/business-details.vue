<template>
  <UForm
    v-slot="formState"
    :state="signupBusinessDetails"
    :schema="validationSchema"
    class="space-y-5"
    @submit="$emit('continue')"
  >
    <div class="grid gap-5 w-full">
      <UFormField label="ABN" name="abn" required>
        <UInput
          v-model="signupBusinessDetails.abn"
          type="text"
          inputmode="numeric"
          placeholder="Enter ABN"
          class="w-full"
          leadingIcon="i-lucide-badge-check"
          :ui="{
            base:
              !signupBusinessDetails.abn || abnDetails.isValid || abnDetails.loading
                ? ''
                : '!ring-error',
            leadingIcon:
              !signupBusinessDetails.abn || abnDetails.loading
                ? ''
                : abnDetails.isValid
                  ? '!text-success'
                  : '!text-error'
          }"
          @change="authStore.getABNDetails(signupBusinessDetails.abn)"
        >
          <template #trailing v-if="signupBusinessDetails.abn.length === 11">
            <UIcon
              v-if="abnDetails.loading"
              name="i-lucide-loader-circle"
              class="animate-spin text-primary"
            />
            <UIcon
              v-else-if="abnDetails.isValid"
              name="i-lucide-circle-check"
              class="text-success"
            />
          </template>
        </UInput>

        <template #help>
          <div
            v-if="abnDetails.errorReason"
            class="text-error flex items-center justify-start gap-x-1"
          >
            <UIcon name="i-lucide-circle-x" />
            <span class="block">{{ abnDetails.errorReason }}</span>
          </div>
        </template>
      </UFormField>
      <UFormField label="ACN" name="acn">
        <UInput
          v-model="signupBusinessDetails.acn"
          placeholder="Your 9-digit ACN"
          inputmode="numeric"
          icon="i-lucide-hash"
          class="w-full"
        />
      </UFormField>
    </div>

    <UFormField label="Business name" name="business_name" required class="w-full">
      <UInput
        v-model="signupBusinessDetails.business_name"
        placeholder="Your registered business name"
        icon="i-lucide-building-2"
        :disabled="!abnDetails.isValid"
        class="w-full"
        :ui="{
          base:
            signupBusinessDetails.business_name === abnDetails.businessName ? 'text-success' : ''
        }"
      />
    </UFormField>

    <div class="grid gap-5 w-full">
      <UFormField label="Business type" name="business_type" required class="w-full">
        <USelectMenu
          v-model="signupBusinessDetails.business_type"
          :items="businessTypes"
          value-key="value"
          placeholder="Select a business type"
          icon="i-lucide-store"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Industry" name="industry" required class="w-full">
        <USelectMenu
          v-model="signupBusinessDetails.industry"
          :items="industries"
          value-key="value"
          placeholder="Select your industry"
          icon="i-lucide-briefcase-business"
          class="w-full"
        />
      </UFormField>
    </div>

    <div class="grid gap-5 sm:grid-cols-2">
      <UFormField label="Licence number" name="license_number" required>
        <UInput
          v-model="signupBusinessDetails.license_number"
          placeholder="Your licence number"
          leadingIcon="i-lucide-badge-check"
          @change="handleLicenseInput"
          :ui="{
            base:
              !signupBusinessDetails.license_number ||
              licenceDetails.isValid ||
              licenceDetails.loading
                ? ''
                : '!ring-error',
            leadingIcon:
              !signupBusinessDetails.license_number || licenceDetails.loading
                ? ''
                : licenceDetails.isValid
                  ? '!text-success'
                  : '!text-error'
          }"
        >
          <template #trailing>
            <UIcon
              v-if="licenceDetails.loading"
              name="i-lucide-loader-circle"
              class="animate-spin text-primary"
            />
            <UIcon
              v-else-if="licenceDetails.isValid"
              name="i-lucide-circle-check"
              class="text-success"
            />
          </template>
        </UInput>

        <template #help>
          <p v-if="licenceDetails.errorReason" class="text-error">
            {{ licenceDetails.errorReason }}
          </p>
        </template>
      </UFormField>
      <UFormField label="Issuing state" name="stateIssued" required>
        <USelectMenu
          v-model="signupBusinessDetails.stateIssued"
          :items="stateIssued"
          value-key="value"
          @change="handleLicenseInput"
          placeholder="Select a state"
          icon="i-lucide-map-pin"
        />
      </UFormField>
    </div>

    <UFormField label="Website" name="business_website" class="w-full">
      <UInput
        v-model="signupBusinessDetails.business_website"
        placeholder="https://yourbusiness.com"
        icon="i-lucide-globe-2"
        class="w-full"
      />
    </UFormField>

    <div class="flex gap-x-4">
      <UButton
        type="submit"
        class="justify-center!"
        trailing
        block
        size="xl"
        :loading="formState?.loading"
        :disabled="
          formState?.errors.length !== 0 ||
          formState?.loading ||
          !abnDetails.isValid ||
          !licenceDetails.isValid
        "
      >
        <span>Continue</span>
        <UIcon name="i-lucide-arrow-right" />
      </UButton>
    </div>
  </UForm>
</template>

<script setup lang="ts">
import * as z from 'zod'
import { useAuthStore } from '~/store/auth-store'

const authStore = useAuthStore()
const { signupBusinessDetails, abnDetails, licenceDetails } = storeToRefs(authStore)

defineEmits<{ continue: [] }>()

const businessTypes = [
  { label: 'Partnership', value: 'partnership' },
  { label: 'Sole Trader', value: 'sole_trader' },
  { label: 'Company', value: 'company' }
]

const industries = ref([
  { label: 'Electric Contractor', value: 'electric-contractor' },
  { label: 'Security Installer', value: 'security-installer' },
  { label: 'Auto Electrician', value: 'auto-electrician' },
  { label: 'Alarm Installer', value: 'alarm-installer' },
  { label: 'CCTV Technician', value: 'cctv-technician' },
  { label: 'Access Control', value: 'access-control' },
  { label: 'Others', value: 'others' }
])

const stateIssued = ref([
  { label: 'New South Wales', value: 'nsw' },
  { label: 'Queensland', value: 'qld' },
  { label: 'Victoria', value: 'vic' },
  { label: 'Western Australia', value: 'wa' },
  { label: 'South Australia', value: 'sa' },
  { label: 'Tasmania', value: 'tas' },
  { label: 'Australian Capital Territory', value: 'act' },
  { label: 'Northern Territory', value: 'nt' }
])

const validationSchema = z.object({
  business_name: z.string().min(1, 'Business name is required'),
  abn: z.string().min(1, 'ABN is required').regex(/^\d+$/, 'ABN must contain only numbers'),
  acn: z.string().regex(/^\d*$/, 'ACN must contain only numbers').optional().or(z.literal('')),
  business_type: z.string().min(1, 'Please select a business type'),
  industry: z.string().min(1, 'Please select an industry'),
  license_number: z.string().min(1, 'Licence number is required'),
  stateIssued: z.string().min(1, 'Please select the issuing state'),
  business_website: z
    .string()
    .optional()
    .refine((value) => !value || /^https?:\/\//.test(value), 'Enter a valid URL')
})

const handleLicenseInput = () => {
  if (signupBusinessDetails.value.license_number.length >= 7) {
    if (!signupBusinessDetails.value.stateIssued) {
      licenceDetails.value.errorReason = 'Select state issued to continue'
    } else {
      authStore.verifyLicense(
        signupBusinessDetails.value.license_number,
        signupBusinessDetails.value.stateIssued
      )
    }
  }
}
</script>
