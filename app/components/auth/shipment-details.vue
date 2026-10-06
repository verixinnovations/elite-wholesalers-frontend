<template>
  <UForm
    v-slot="formState"
    :schema="schema"
    :state="signupLocationDetails"
    class="space-y-5"
    @submit="onSubmit"
  >
    <UFormField label="Country" name="country" required class="w-full">
      <USelectMenu
        v-model="signupLocationDetails.country"
        :items="countries"
        placeholder="e.g. Australia"
        label-key="name"
        required
        class="w-full"
        @update:model-value="updateLocationCountry"
        :loading="utilsLoadingStates.country"
        icon="i-lucide-globe"
      />
    </UFormField>

    <UFormField label="State / Province" name="state" required class="w-full">
      <USelectMenu
        v-model="signupLocationDetails.state"
        placeholder="e.g. New South Wales"
        :items="states"
        label-key="name"
        :loading="utilsLoadingStates.states"
        icon="i-lucide-map"
        class="w-full"
        @update:model-value="updateLocationState"
      />
    </UFormField>

    <UFormField label="City" name="city" required>
      <USelectMenu
        value-key="name"
        label-key="name"
        :items="cities"
        v-model="signupLocationDetails.city"
        :loading="utilsLoadingStates.cities"
        required
        placeholder="e.g. Canberra"
        icon="i-lucide-building-2"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Street address" name="street" required>
      <UInput
        v-model="signupLocationDetails.street"
        :disabled="!signupLocationDetails.city"
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
      :loading="loadingState.signup"
      :disabled="formState?.errors.length !== 0 || formState?.loading"
    />
  </UForm>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import type { LocationEntity } from '~/types'
import { useAuthStore } from '~/store/auth-store'
import { useUtilStore } from '~/store/util-store'

const emit = defineEmits<{
  (e: 'submit', payload: LocationEntity): void
}>()

const utilStore = useUtilStore()

const { signupLocationDetails, loadingState } = storeToRefs(useAuthStore())
const { countries, states, cities, utilsLoadingStates } = storeToRefs(utilStore)

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

const updateLocationCountry = async (val) => {
  if (signupLocationDetails.value.country !== val.name) {
    signupLocationDetails.value.state = ''
    signupLocationDetails.value.city = ''
    cities.value = []
    states.value = []
    utilStore.getStatesByCountry(val.iso2)
  }
  signupLocationDetails.value.country_code = val.iso2
  signupLocationDetails.value.country = val.name
}

const updateLocationState = async (val) => {
  if (signupLocationDetails.value.state !== val.name) {
    signupLocationDetails.value.city = ''
    cities.value = []
    utilStore.getCitiesByState(val.country_code, val.iso2)
  }
  signupLocationDetails.value.state = val.name
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  emit('submit', event.data)
}
</script>
