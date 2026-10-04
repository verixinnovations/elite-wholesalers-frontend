<template>
  <section>
    <header class="border-b border-neutral-200 pb-6">
      <p class="text-xs font-bold uppercase tracking-[0.16em] text-primary-500">Account</p>
      <h1 class="mt-2 font-oswald text-4xl font-medium text-neutral-950">Delivery addresses</h1>
      <p class="mt-2 text-sm text-neutral-500">Review and update your saved delivery details.</p>
    </header>

    <div class="mt-7 grid items-start gap-8 lg:grid-cols-[minmax(220px,0.7fr)_minmax(0,1.3fr)]">
      <nav
        aria-label="Saved addresses"
        class="divide-y divide-neutral-200 border-y border-neutral-200"
      >
        <button
          v-for="address in addresses"
          :key="address.id"
          class="w-full px-3 py-4 text-left transition-colors hover:bg-neutral-50"
          :class="selectedId === address.id ? 'bg-primary-50' : ''"
          :aria-current="selectedId === address.id ? 'true' : undefined"
          @click="selectAddress(address.id)"
        >
          <span class="flex items-center justify-between gap-2">
            <span class="font-semibold text-neutral-900">{{ address.label }}</span>
            <span
              v-if="address.isDefault"
              class="text-xxs font-bold uppercase tracking-wide text-primary-700"
              >Default</span
            >
          </span>
          <span class="mt-1 block text-sm text-neutral-500"
            >{{ address.city }}, {{ address.state }}</span
          >
        </button>
      </nav>

      <section v-if="selectedAddress" class="min-w-0">
        <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 class="font-oswald text-2xl text-neutral-950">{{ selectedAddress.label }}</h2>
          <div class="flex gap-2">
            <UButton
              v-if="!editing"
              label="Edit address"
              icon="i-lucide-pencil"
              variant="outline"
              @click="startEditing"
            />
            <template v-else>
              <UButton label="Cancel" color="neutral" variant="ghost" @click="cancelEditing" />
              <UButton
                label="Save address"
                icon="i-lucide-save"
                :disabled="!isValid"
                @click="saveAddress"
              />
            </template>
          </div>
        </div>

        <form class="grid gap-4 sm:grid-cols-2" @submit.prevent="saveAddress">
          <UFormField label="Address label" required>
            <p v-if="!editing" class="py-2 text-sm">{{ form.label }}</p>
            <UInput v-else v-model="form.label" class="w-full" required />
          </UFormField>
          <UFormField label="Company">
            <p v-if="!editing" class="py-2 text-sm">{{ form.company || 'Not set' }}</p>
            <UInput v-else v-model="form.company" autocomplete="organization" class="w-full" />
          </UFormField>
          <UFormField label="First name" required>
            <p v-if="!editing" class="py-2 text-sm">{{ form.firstName }}</p>
            <UInput
              v-else
              v-model="form.firstName"
              autocomplete="given-name"
              class="w-full"
              required
            />
          </UFormField>
          <UFormField label="Last name" required>
            <p v-if="!editing" class="py-2 text-sm">{{ form.lastName }}</p>
            <UInput
              v-else
              v-model="form.lastName"
              autocomplete="family-name"
              class="w-full"
              required
            />
          </UFormField>
          <UFormField label="Street address" class="sm:col-span-2" required>
            <p v-if="!editing" class="py-2 text-sm">{{ form.address1 }}</p>
            <UInput
              v-else
              v-model="form.address1"
              autocomplete="address-line1"
              class="w-full"
              required
            />
          </UFormField>
          <UFormField label="Apartment, suite, etc." class="sm:col-span-2">
            <p v-if="!editing" class="py-2 text-sm">{{ form.address2 || 'Not set' }}</p>
            <UInput v-else v-model="form.address2" autocomplete="address-line2" class="w-full" />
          </UFormField>
          <UFormField label="City" required>
            <p v-if="!editing" class="py-2 text-sm">{{ form.city }}</p>
            <UInput
              v-else
              v-model="form.city"
              autocomplete="address-level2"
              class="w-full"
              required
            />
          </UFormField>
          <UFormField label="State / region" required>
            <p v-if="!editing" class="py-2 text-sm">{{ form.state }}</p>
            <UInput
              v-else
              v-model="form.state"
              autocomplete="address-level1"
              class="w-full"
              required
            />
          </UFormField>
          <UFormField label="Postcode" required>
            <p v-if="!editing" class="py-2 text-sm">{{ form.postalCode }}</p>
            <UInput
              v-else
              v-model="form.postalCode"
              autocomplete="postal-code"
              class="w-full"
              required
            />
          </UFormField>
          <UFormField label="Country" required>
            <p v-if="!editing" class="py-2 text-sm">{{ form.country }}</p>
            <UInput
              v-else
              v-model="form.country"
              autocomplete="country-name"
              class="w-full"
              required
            />
          </UFormField>
          <UFormField label="Phone" required>
            <p v-if="!editing" class="py-2 text-sm">{{ form.phone }}</p>
            <UInput
              v-else
              v-model="form.phone"
              type="tel"
              autocomplete="tel"
              class="w-full"
              required
            />
          </UFormField>
        </form>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import dashboardData from '~/data/data.json'

definePageMeta({ layout: 'dashboard', middleware: 'auth' })

interface Address {
  id: string
  label: string
  firstName: string
  lastName: string
  company: string
  address1: string
  address2: string
  city: string
  state: string
  postalCode: string
  country: string
  phone: string
  isDefault: boolean
}

const addresses = ref<Address[]>(structuredClone(dashboardData.addresses) as unknown as Address[])
const selectedId = ref(
  addresses.value.find((address) => address.isDefault)?.id ?? addresses.value[0]?.id ?? ''
)
const selectedAddress = computed(() =>
  addresses.value.find((address) => address.id === selectedId.value)
)
const form = reactive<Address>(structuredClone(selectedAddress.value ?? emptyAddress()))
const savedAddress = ref<Address>(structuredClone(form))
const editing = ref(false)
const isValid = computed(() =>
  Boolean(
    form.label.trim() &&
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.address1.trim() &&
    form.city.trim() &&
    form.state.trim() &&
    form.postalCode.trim() &&
    form.country.trim() &&
    form.phone.trim()
  )
)

function loadAddress(address: Address) {
  Object.assign(form, address)
  savedAddress.value = structuredClone(address)
  editing.value = false
}

function emptyAddress(): Address {
  return {
    id: '',
    label: '',
    firstName: '',
    lastName: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phone: '',
    isDefault: false
  }
}

function selectAddress(id: string) {
  selectedId.value = id
  const address = addresses.value.find((item) => item.id === id)
  if (address) loadAddress(address)
}

function startEditing() {
  savedAddress.value = structuredClone(form)
  editing.value = true
}

function cancelEditing() {
  Object.assign(form, savedAddress.value)
  editing.value = false
}

function saveAddress() {
  if (!isValid.value) return
  const index = addresses.value.findIndex((address) => address.id === selectedId.value)
  if (index < 0) return
  addresses.value[index] = structuredClone(form)
  savedAddress.value = structuredClone(form)
  editing.value = false
  useToast().add({ title: 'Address updated', color: 'success' })
}

useSeoMeta({ title: 'Delivery addresses' })
</script>
