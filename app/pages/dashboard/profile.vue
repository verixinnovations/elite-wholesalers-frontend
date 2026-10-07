<template>
  <section class="max-w-2xl">
    <div class="border-b border-neutral-200 pb-6">
      <div class="flex items-center justify-between">
        <p
          class="text-xs font-bold uppercase tracking-[0.16em] text-primary-500"
          :class="{
            'text-primary': user?.accountType === AccountType.INDIVIDUAL,
            'text-success-500': user?.accountType === AccountType.TRADER,
            'text-rose-600': user?.accountType === AccountType.ADMIN
          }"
        >
          {{ user?.accountType }} Account
        </p>
      </div>
      <h1 class="mt-2 font-oswald text-4xl font-medium text-neutral-950">Profile settings</h1>
      <p class="mt-2 text-sm text-neutral-500">Manage the details associated with your account.</p>
    </div>

    <!-- Username & Copy Section -->
    <div
      v-if="user?.username"
      class="mt-6 flex items-center justify-between rounded-lg border border-neutral-200 bg-neutral-50 p-4"
    >
      <div>
        <p class="text-xs font-medium text-neutral-500">Username</p>
        <p class="font-mono text-sm font-semibold text-neutral-900">{{ user.username }}</p>
      </div>
      <UButton
        label="Copy"
        icon="i-lucide-copy"
        size="xs"
        variant="outline"
        @click="copyText(user.username)"
      />
    </div>

    <!-- Store Id & Copy Section -->
    <div
      v-if="user?.zohoContactId"
      class="mt-6 flex items-center justify-between rounded-lg border border-neutral-200 bg-neutral-50 p-4"
    >
      <div>
        <p class="text-xs font-medium text-neutral-500">Store ID</p>
        <p class="font-mono text-sm font-semibold text-neutral-900">{{ user.zohoContactId }}</p>
      </div>
      <UButton
        label="Copy"
        icon="i-lucide-copy"
        size="xs"
        variant="outline"
        @click="copyText(user.zohoContactId)"
      />
    </div>

    <div class="mt-7 max-w-2xl">
      <UForm
        v-slot="{ errors, loading }"
        :schema="profileSchema"
        :state="form"
        class="space-y-6"
        @submit="saveProfile"
      >
        <div class="flex justify-end gap-2">
          <UButton
            v-if="!editing"
            label="Edit"
            icon="i-lucide-pencil"
            variant="outline"
            size="xs"
            @click="editing = true"
          />
          <template v-else>
            <UButton
              size="xs"
              label="Cancel"
              color="neutral"
              variant="ghost"
              @click="cancelEditing"
            />
            <UButton
              type="submit"
              label="Save"
              size="xs"
              :disabled="errors.length > 0 || loading"
            />
          </template>
        </div>

        <!-- Personal Details Section -->
        <div class="space-y-5 rounded-xl border border-neutral-200 p-5 bg-white">
          <h2 class="text-sm font-bold uppercase tracking-wider text-neutral-900">
            Personal Information
          </h2>

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <UFormField label="First Name" name="firstname">
              <UInput
                :disabled="!editing"
                v-model="form.firstname"
                autocomplete="given-name"
                class="w-full"
              />
            </UFormField>

            <UFormField label="Last Name" name="lastname">
              <UInput
                :disabled="!editing"
                v-model="form.lastname"
                autocomplete="family-name"
                class="w-full"
              />
            </UFormField>
          </div>

          <UFormField :ui="{ label: 'font-semibold' }" label="Email" name="email">
            <UInput
              disabled
              v-model="form.email"
              type="email"
              autocomplete="email"
              class="w-full"
            />
          </UFormField>

          <UFormField :ui="{ label: 'font-semibold' }" label="Phone" name="phone_number">
            <BasePhoneInput
              v-model="form.phone_number"
              :disabled="!editing"
              type="tel"
              autocomplete="tel"
              class="w-full"
            />
          </UFormField>

          <UFormField :ui="{ label: 'font-semibold' }" label="Bio" name="bio">
            <UTextarea
              :disabled="!editing"
              v-model="form.bio"
              class="w-full"
              placeholder="Tell us a little bit about yourself"
            />
          </UFormField>
        </div>

        <div
          v-if="user?.accountType !== AccountType.INDIVIDUAL && form.business_details"
          class="space-y-5 rounded-xl border border-neutral-200 p-5 bg-white"
        >
          <div class="flex items-center justify-between border-b border-neutral-100 pb-3">
            <h2 class="text-sm font-bold uppercase tracking-wider text-neutral-900">
              Business Details
            </h2>
            <UBadge label="Trader" variant="subtle" color="neutral" size="xs" />
          </div>

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <!-- Non-Editable Business Fields -->
            <UFormField label="ABN" name="business_details.abn">
              <UInput disabled v-model="form.business_details.abn" class="w-full" />
            </UFormField>

            <UFormField label="ACN" name="business_details.acn">
              <UInput disabled v-model="form.business_details.acn" class="w-full" />
            </UFormField>

            <UFormField label="Licence Number" name="business_details.licence_number">
              <UInput disabled v-model="form.business_details.licence_number" class="w-full" />
            </UFormField>

            <UFormField label="State Issued" name="business_details.stateIssued">
              <UInput
                disabled
                v-model="form.business_details.stateIssued"
                class="w-full uppercase"
              />
            </UFormField>

            <!-- Editable Business Fields -->
            <UFormField label="Business Name" name="business_details.business_name">
              <UInput
                :disabled="!editing"
                v-model="form.business_details.business_name"
                class="w-full"
              />
            </UFormField>

            <UFormField label="Business type" name="business_details.business_type" class="w-full">
              <USelectMenu
                v-model="form.business_details.business_type"
                :items="businessTypes"
                :disabled="!editing"
                value-key="value"
                placeholder="Select a business type"
                class="w-full"
              />
            </UFormField>

            <UFormField label="Business Website" name="business_details.business_website">
              <UInput
                :disabled="!editing"
                v-model="form.business_details.business_website"
                type="url"
                class="w-full"
              />
            </UFormField>

            <UFormField label="Industry" name="business_details.industry" class="w-full">
              <USelectMenu
                v-model="form.business_details.industry"
                :items="industries"
                :disabled="!editing"
                value-key="value"
                placeholder="Select your industry"
                class="w-full"
              />
            </UFormField>
          </div>
        </div>
      </UForm>
    </div>
  </section>
</template>

<script setup lang="ts">
import * as zod from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { useAuthStore } from '~/store/auth-store'
import { AccountType } from '~/types/enums'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const toast = useToast()

const editing = ref(false)

const businessTypes = [
  { label: 'Partnership', value: 'partnership' },
  { label: 'Sole Trader', value: 'sole_trader' },
  { label: 'Company', value: 'company' }
]

const industries = ref([
  { label: 'Electrical Contractor', value: 'electric-contractor' },
  { label: 'Security Installer', value: 'security-installer' },
  { label: 'Auto Electrician', value: 'auto-electrician' },
  { label: 'Alarm Installer', value: 'alarm-installer' },
  { label: 'CCTV Technician', value: 'cctv-technician' },
  { label: 'Access Control', value: 'access-control' },
  { label: 'Others', value: 'others' }
])

// Define the validation schema using Zod including optional business details
const profileSchema = zod.object({
  firstname: zod.string().min(1, 'First name is required'),
  lastname: zod.string().min(1, 'Last name is required'),
  email: zod.string().email('Invalid email address'),
  phone_number: zod.string().optional(),
  bio: zod.string().max(255).optional().nullable(),
  business_details: zod
    .object({
      business_name: zod.string().min(1, 'Business name is required'),
      business_type: zod.string().min(1, 'Business type is required'),
      business_website: zod.string().url('Invalid website URL').optional().or(zod.literal('')),
      industry: zod.string().min(1, 'Industry is required'),
      abn: zod.string().optional(),
      acn: zod.string().optional(),
      licence_number: zod.string().optional(),
      stateIssued: zod.string().optional()
    })
    .optional()
})

// Infer schema type for type safety
type Schema = zod.infer<typeof profileSchema>

// Active form state bound to inputs
const form = reactive<Schema>({
  firstname: user.value?.firstname || '',
  lastname: user.value?.lastname || '',
  email: user.value?.email || '',
  phone_number: user.value?.phone_number || undefined,
  bio: user.value?.bio || '',
  business_details: user.value?.business_details ? { ...user.value.business_details } : undefined
})

// Backup state used to restore inputs if editing is cancelled
const savedProfile = reactive<Schema>({
  firstname: user.value?.firstname || '',
  lastname: user.value?.lastname || '',
  email: user.value?.email || '',
  phone_number: user.value?.phone_number || undefined,
  bio: user.value?.bio || '',
  business_details: user.value?.business_details ? { ...user.value.business_details } : undefined
})

function cancelEditing() {
  form.firstname = savedProfile.firstname
  form.lastname = savedProfile.lastname
  form.phone_number = savedProfile.phone_number
  form.bio = savedProfile.bio
  if (form.business_details && savedProfile.business_details) {
    form.business_details.business_name = savedProfile.business_details.business_name
    form.business_details.business_type = savedProfile.business_details.business_type
    form.business_details.business_website = savedProfile.business_details.business_website
    form.business_details.industry = savedProfile.business_details.industry
  }
  editing.value = false
}

async function copyText(text?: string) {
  if (!text) return
  try {
    await navigator.clipboard.writeText(text)
    toast.add({ title: 'Copied to clipboard!', color: 'success' })
  } catch {
    toast.add({ title: 'Failed to copy', color: 'error' })
  }
}

const saveProfile = async (event: FormSubmitEvent<Schema>) => {
  // Trim fields safely
  if (form.firstname) form.firstname = form.firstname.trim()
  if (form.lastname) form.lastname = form.lastname.trim()
  if (form.business_details?.business_name)
    form.business_details.business_name = form.business_details.business_name.trim()

  // Filter event.data to drop empty strings (""), nulls, undefined, and un-touched values
  const payload: Record<string, any> = {}

  for (const [key, value] of Object.entries(event.data)) {
    if (value === '' || value === null || value === undefined) continue

    // Handle nested business_details object filtering
    if (key === 'business_details' && typeof value === 'object' && value !== null) {
      const filteredBiz: Record<string, any> = {}
      for (const [bizKey, bizVal] of Object.entries(value)) {
        if (bizVal !== '' && bizVal !== null && bizVal !== undefined) {
          filteredBiz[bizKey] = typeof bizVal === 'string' ? bizVal.trim() : bizVal
        }
      }
      if (Object.keys(filteredBiz).length > 0) {
        payload.business_details = filteredBiz
      }
      continue
    }

    payload[key] = typeof value === 'string' ? value.trim() : value
  }

  // Commit changes to backup snapshot
  savedProfile.firstname = form.firstname
  savedProfile.lastname = form.lastname
  savedProfile.phone_number = form.phone_number
  savedProfile.bio = form.bio
  if (form.business_details && savedProfile.business_details) {
    savedProfile.business_details.business_name = form.business_details.business_name
    savedProfile.business_details.business_type = form.business_details.business_type
    savedProfile.business_details.business_website = form.business_details.business_website
    savedProfile.business_details.industry = form.business_details.industry
  }

  editing.value = false

  authStore.updateProfile(payload)
}

useSeoMeta({ title: 'Profile settings' })
</script>
