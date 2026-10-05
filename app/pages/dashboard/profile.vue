<template>
  <section class="max-w-2xl">
    <div class="border-b border-neutral-200 pb-6">
      <p class="text-xs font-bold uppercase tracking-[0.16em] text-primary-500">Account</p>
      <h1 class="mt-2 font-oswald text-4xl font-medium text-neutral-950">Profile settings</h1>
      <p class="mt-2 text-sm text-neutral-500">Manage the details associated with your account.</p>
    </div>

    <div class="mt-7 max-w-2xl">
      <div class="mb-6 flex justify-end gap-2">
        <UButton
          v-if="!editing"
          label="Edit"
          icon="i-lucide-pencil"
          variant="outline"
          @click="editing = true"
        />
        <template v-else>
          <UButton label="Cancel" color="neutral" variant="ghost" @click="cancelEditing" />
          <UButton label="Save" icon="i-lucide-save" :disabled="!isValid" @click="saveProfile" />
        </template>
      </div>

      <form class="space-y-5" @submit.prevent="saveProfile">
        <UFormField label="Name" name="name" required>
          <p v-if="!editing" class="py-2 text-sm text-neutral-900">
            {{ user?.fullname || 'Not set' }}
          </p>
          <UInput v-else v-model="form.name" autocomplete="name" class="w-full" />
        </UFormField>
        <UFormField label="Email" name="email" required>
          <p v-if="!editing" class="py-2 text-sm text-neutral-900">
            {{ user?.email || 'Not set' }}
          </p>
          <UInput v-else v-model="form.email" type="email" autocomplete="email" class="w-full" />
        </UFormField>
        <UFormField label="Phone" name="phone">
          <p v-if="!editing" class="py-2 text-sm text-neutral-900">
            {{ user?.phone_number || 'Not set' }}
          </p>
          <UInput v-else v-model="form.phone" type="tel" autocomplete="tel" class="w-full" />
        </UFormField>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import dashboardData from '~/data/data.json'
import { useAuthStore } from '~/store/auth-store'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const form = reactive(structuredClone(dashboardData.profile))
const savedProfile = ref(structuredClone(dashboardData.profile))
const editing = ref(false)
const toast = useToast()
const isValid = computed(
  () => form.name.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
)

function cancelEditing() {
  Object.assign(form, savedProfile.value)
  editing.value = false
}

function saveProfile() {
  if (!isValid.value) return
  form.name = form.name.trim()
  form.email = form.email.trim()
  savedProfile.value = structuredClone(form)
  editing.value = false
  toast.add({ title: 'Profile updated', color: 'success' })
}

useSeoMeta({ title: 'Profile settings' })
</script>
