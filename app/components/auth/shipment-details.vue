<template>
  <UForm
    v-slot="formState"
    :schema="schema"
    :state="signupLocationDetails"
    class="space-y-5"
    @submit="onSubmit"
  >
    <UFormField label="Country" name="country" required class="w-full">
      <UInput
        v-model="signupLocationDetails.country"
        placeholder="e.g. United States"
        class="w-full"
        icon="i-lucide-globe"
      />
    </UFormField>

    <UFormField label="State / Province" name="state" required class="w-full">
      <UInput
        v-model="signupLocationDetails.state"
        placeholder="e.g. NY"
        icon="i-lucide-map"
        class="w-full"
      />
    </UFormField>

    <UFormField label="City" name="city" required>
      <UInput
        v-model="signupLocationDetails.city"
        placeholder="e.g. New York"
        icon="i-lucide-building-2"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Street address" name="street" required>
      <UInput
        v-model="signupLocationDetails.street"
        placeholder="123 Main St, Suite 100"
        icon="i-lucide-map-pin"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Postal code" name="postal_code" required>
      <UInput
        v-model="signupLocationDetails.postal_code"
        placeholder="e.g. 10001"
        icon="i-lucide-hash"
        class="w-full"
      />
    </UFormField>

    <UButton
      type="submit"
      label="Create Account"
      block
      size="xl"
      class="w-full"
      :loading="formState?.loading"
      :disabled="formState?.errors.length !== 0 || formState?.loading"
    />
  </UForm>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import * as z from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import type { LocationEntity } from '~/types'
import { useAuthStore } from '~/store/auth-store'

const emit = defineEmits<{
  (e: 'submit', payload: LocationEntity): void
}>()

const { signupLocationDetails } = storeToRefs(useAuthStore())

const schema = z.object({
  country: z.string().min(1, 'Country is required'),
  country_code: z.string().length(2, 'Must be a 2-letter ISO code').toUpperCase(),
  state: z.string().min(1, 'State or province is required'),
  city: z.string().min(1, 'City is required'),
  street: z.string().min(1, 'Street address is required'),
  postal_code: z.string().min(1, 'Postal code is required'),
  latitude: z
    .number({ message: 'Latitude is required' })
    .min(-90, 'Latitude must be between -90 and 90')
    .max(90, 'Latitude must be between -90 and 90'),
  longitude: z
    .number({ message: 'Longitude is required' })
    .min(-180, 'Longitude must be between -180 and 180')
    .max(180, 'Longitude must be between -180 and 180')
})

type Schema = z.output<typeof schema>

function onSubmit(event: FormSubmitEvent<Schema>) {
  emit('submit', event.data)
}
</script>
