<template>
  <section class="max-w-3xl">
    <header class="border-b border-neutral-200 pb-6">
      <p class="text-xs font-bold uppercase tracking-[0.16em] text-primary-500">Account</p>
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
        <UFormField label="Phone" required class="sm:col-span-2">
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
    </div>

    <!-- <div v-else class="mt-7 text-sm text-neutral-500">No delivery address found.</div> -->
  </section>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth-store'

definePageMeta({ layout: 'dashboard', middleware: 'auth' })

const { user } = storeToRefs(useAuthStore())

const form = reactive({
  firstName: user.value?.firstname ?? '',
  lastName: user.value?.lastname ?? '',
  address1: user.value?.location?.street ?? '',
  city: user.value?.location?.city ?? '',
  state: user.value?.location?.state ?? '',
  postalCode: user.value?.location?.postal_code ?? '',
  country: user.value?.location?.country ?? '',
  phone: user.value?.phone_number ?? ''
})

const savedForm = ref({ ...form })
const editing = ref(false)

const isValid = computed(() =>
  Boolean(
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

function startEditing() {
  savedForm.value = { ...form }
  editing.value = true
}

function cancelEditing() {
  Object.assign(form, savedForm.value)
  editing.value = false
}

function saveAddress() {
  if (!isValid.value) return
  savedForm.value = { ...form }
  editing.value = false
  useToast().add({ title: 'Address updated', color: 'success' })
}

useSeoMeta({ title: 'Delivery address' })
</script>
