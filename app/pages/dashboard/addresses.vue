<template>
  <section class="max-w-xl">
    <header class="border-b border-neutral-200 pb-6">
      <p
        class="text-xs font-bold uppercase tracking-[0.16em]"
        :class="{
          'text-primary-500': user?.accountType === AccountType.INDIVIDUAL,
          'text-success-500': user?.accountType === AccountType.TRADER,
          'text-rose-600': user?.accountType === AccountType.ADMIN
        }"
      >
        {{ user?.accountType }} Account
      </p>
      <h1 class="mt-2 font-oswald text-4xl font-medium text-neutral-950">Delivery address</h1>
      <p class="mt-2 text-sm text-neutral-500">Review and update your saved delivery details.</p>
    </header>

    <div class="mt-7">
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 class="font-oswald text-2xl text-neutral-950">Main Address</h2>
        <div class="flex gap-2">
          <UButton
            v-if="!editing"
            label="Edit address"
            icon="i-lucide-pencil"
            size="xs"
            variant="outline"
            @click="startEditing"
          />
          <template v-else>
            <UButton
              label="Cancel"
              color="neutral"
              variant="ghost"
              size="xs"
              @click="cancelEditing"
            />
            <UButton
              type="submit"
              form="address-form"
              label="Save address"
              icon="i-lucide-save"
              size="xs"
              :disabled="formStateRef?.errors?.length !== 0 || formStateRef?.loading"
            />
          </template>
        </div>
      </div>

      <!-- Non-editing view (Display text layout without unnecessary UFormFields) -->
      <div
        v-if="!editing"
        class="grid gap-4 sm:grid-cols-2 bg-neutral-50 p-6 rounded-xl border border-neutral-200"
      >
        <div>
          <p class="text-xs font-medium text-neutral-500">Country</p>
          <p class="mt-1 text-sm font-semibold text-neutral-900">{{ form.country || 'Not set' }}</p>
        </div>

        <div>
          <p class="text-xs font-medium text-neutral-500">State / Province</p>
          <p class="mt-1 text-sm font-semibold text-neutral-900">{{ form.state || 'Not set' }}</p>
        </div>

        <div>
          <p class="text-xs font-medium text-neutral-500">City</p>
          <p class="mt-1 text-sm font-semibold text-neutral-900">{{ form.city || 'Not set' }}</p>
        </div>

        <div>
          <p class="text-xs font-medium text-neutral-500">Postal code</p>
          <p class="mt-1 text-sm font-semibold text-neutral-900">
            {{ form.postal_code || 'Not set' }}
          </p>
        </div>

        <div class="sm:col-span-2">
          <p class="text-xs font-medium text-neutral-500">Street address</p>
          <p class="mt-1 text-sm font-semibold text-neutral-900">{{ form.street || 'Not set' }}</p>
        </div>
      </div>

      <!-- Editing view (UForm with USelectMenu inputs) -->
      <UForm
        v-else
        id="address-form"
        v-slot="formState"
        :schema="schema"
        :state="form"
        class="space-y-5"
        @submit="onSubmit"
      >
        <div class="grid gap-5 sm:grid-cols-2">
          <UFormField label="Country" name="country" required class="w-full sm:col-span-2">
            <USelectMenu
              v-model="form.country"
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
              v-model="form.state"
              placeholder="e.g. New South Wales"
              :items="states"
              label-key="name"
              :loading="utilsLoadingStates.states"
              icon="i-lucide-map"
              class="w-full"
              @update:model-value="updateLocationState"
            />
          </UFormField>

          <UFormField label="City" name="city" required class="w-full">
            <USelectMenu
              value-key="name"
              label-key="name"
              :items="cities"
              v-model="form.city"
              :loading="utilsLoadingStates.cities"
              required
              placeholder="e.g. Canberra"
              icon="i-lucide-building-2"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Street address" name="street" required class="sm:col-span-2">
            <UInput
              v-model="form.street"
              :disabled="!form.city"
              placeholder="123 Main St, Suite 100"
              icon="i-lucide-map-pin"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Postal code" name="postal_code" required class="sm:col-span-2">
            <UInput
              v-model="form.postal_code"
              placeholder="e.g. 10001"
              icon="i-lucide-hash"
              class="w-full"
            />
          </UFormField>
        </div>

        <!-- Hidden container to capture formState reference cleanly -->
        <div class="hidden">
          {{ setFormState(formState) }}
        </div>
      </UForm>
    </div>
  </section>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { useAuthStore } from '~/store/auth-store'
import { useUtilStore } from '~/store/util-store'
import { AccountType } from '~/types/enums'

definePageMeta({ layout: 'dashboard', middleware: 'auth' })

const authStore = useAuthStore()
const utilStore = useUtilStore()

const { user } = storeToRefs(authStore)
const { countries, states, cities, utilsLoadingStates } = storeToRefs(utilStore)

const editing = ref(false)
const formStateRef = ref<any>(null)

function setFormState(state: any) {
  formStateRef.value = state
}

// Active form state bound to inputs
const form = reactive({
  country: user.value?.location?.country ?? '',
  country_code: user.value?.location?.country_code ?? '',
  state: user.value?.location?.state ?? '',
  city: user.value?.location?.city ?? '',
  street: user.value?.location?.street ?? '',
  postal_code: user.value?.location?.postal_code ?? '',
  latitude: user.value?.location?.latitude ?? 0,
  longitude: user.value?.location?.longitude ?? 0
})

// Backup state used to restore inputs if editing is cancelled
const savedForm = reactive({ ...form })

const schema = z.object({
  country: z.string().min(1, 'Country is required'),
  country_code: z.string().optional(),
  state: z.string().min(1, 'State or province is required'),
  city: z.string().min(1, 'City is required'),
  street: z.string().min(1, 'Street address is required'),
  postal_code: z.string().min(1, 'Postal code is required'),
  latitude: z.number().optional(),
  longitude: z.number().optional()
})

type Schema = z.output<typeof schema>

const updateLocationCountry = async (val: any) => {
  if (form.country !== val.name) {
    form.state = ''
    form.city = ''
    cities.value = []
    states.value = []
    utilStore.getStatesByCountry(val.iso2)
  }
  form.country_code = val.iso2
  form.country = val.name
}

const updateLocationState = async (val: any) => {
  if (form.state !== val.name) {
    form.city = ''
    cities.value = []
    form.latitude = Number(val.latitude)
    form.longitude = Number(val.longitude)
    utilStore.getCitiesByState(form.country_code, val.iso2)
  }
  form.state = val.name
}

function startEditing() {
  Object.assign(savedForm, form)
  editing.value = true
}

function cancelEditing() {
  Object.assign(form, savedForm)
  editing.value = false
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const locationPayload: Record<string, any> = {}

  for (const [key, value] of Object.entries(event.data)) {
    if (value === '' || value === null || value === undefined) continue
    locationPayload[key] = typeof value === 'string' ? value.trim() : value
  }

  Object.assign(savedForm, form)
  editing.value = false

  if (Object.keys(locationPayload).length > 0) {
    authStore.updateProfile({ location: locationPayload })
  }

  useToast().add({ title: 'Delivery address updated successfully', color: 'success' })
}

useSeoMeta({ title: 'Delivery address' })

onBeforeMount(() => {
  utilStore.getCountries()
})
</script>
