<template>
  <section class="max-w-2xl">
    <div class="border-b border-neutral-200 pb-6">
      <p class="text-xs font-bold uppercase tracking-[0.16em] text-primary-500">Account</p>
      <h1 class="mt-2 font-oswald text-4xl font-medium text-neutral-950">Profile settings</h1>
      <p class="mt-2 text-sm text-neutral-500">Manage the details associated with your account.</p>
    </div>

    <form class="mt-7 space-y-5" @submit.prevent="saveProfile">
      <UFormField label="Name" name="name" required>
        <UInput v-model="name" autocomplete="name" class="w-full" />
      </UFormField>
      <UFormField label="Username" name="username" hint="Managed by your account">
        <UInput :model-value="authStore.user?.username ?? 'Not set'" disabled class="w-full" />
      </UFormField>
      <UButton type="submit" label="Save changes" icon="i-lucide-save" :disabled="!name.trim()" />
    </form>
  </section>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth-store'

definePageMeta({
  layout: 'dashboard',
  middleware: 'dashboard-auth'
})

const authStore = useAuthStore()
const name = ref(authStore.user?.name ?? '')
const toast = useToast()

function saveProfile() {
  if (!authStore.user || !name.value.trim()) return
  authStore.user = { ...authStore.user, name: name.value.trim() }
  toast.add({ title: 'Profile updated', color: 'success' })
}

useSeoMeta({ title: 'Profile settings' })
</script>
