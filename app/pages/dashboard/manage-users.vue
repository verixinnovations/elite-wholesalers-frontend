<template>
  <section>
    <header class="border-b border-neutral-200 pb-6">
      <p class="text-xs font-bold uppercase tracking-[0.16em] text-rose-500">ADMIN Account</p>

      <div>
        <h1 class="text-4xl font-oswald font-medium">User Management</h1>
        <p class="text-sm mt-2 text-gray-500">
          View users, update roles directly, and manage accounts.
        </p>
      </div>
    </header>

    <UCard :ui="{ body: '' }">
      <UTable
        :data="users"
        :columns="columns"
        :ui="{
          td: 'py-2 px-3 text-xs',
          th: 'py-2.5 px-3 text-xs font-semibold'
        }"
      >
        <template #business_name-cell="{ row }">
          <span class="text-gray-700 dark:text-gray-300 font-medium">
            {{ row.original.business_details?.business_name || '—' }}
          </span>
        </template>

        <!-- Zoho Contact ID Cell -->
        <template #zohoContactId-cell="{ row }">
          <span class="text-gray-500 dark:text-gray-400 font-mono text-[11px]">
            {{ row.original.zohoContactId || '—' }}
          </span>
        </template>

        <!-- ABN Cell -->
        <template #abn-cell="{ row }">
          <span class="text-gray-500 dark:text-gray-400 font-mono text-[11px]">
            {{ row.original.business_details?.abn || '—' }}
          </span>
        </template>

        <!-- Licence Number Cell -->
        <template #licence_number-cell="{ row }">
          <span class="text-gray-500 dark:text-gray-400 text-[11px]">
            {{ row.original.business_details?.licence_number || '—' }}
          </span>
        </template>

        <!-- Role Column with USelect Dropdown -->
        <template #accountType-cell="{ row }">
          <USelect
            :model-value="row.original.accountType"
            :items="availableRoles"
            size="xs"
            class="w-28"
            :class="{
              'bg-purple-600 disabled:bg-purple-400 hover:bg-purple-700 text-white':
                row.original.accountType === AccountType.ADMIN,
              'bg-primary disabled:bg-primary-400 hover:bg-primary/90 text-white':
                row.original.accountType === AccountType.INDIVIDUAL,
              'bg-success-500 disabled:bg-green-400 hover:bg-success-600 text-white':
                row.original.accountType === AccountType.TRADER
            }"
            :ui="{
              base: 'rounded-md!',
              trailingIcon: 'text-white/90 group-hover:text-white'
            }"
            :disabled="user?.id === row.original?.id || loadingStates.updatingRole"
            @update:model-value="(val) => updateRole(row.original, val)"
          />
        </template>

        <!-- Actions Column with 3-dots Menu for Delete -->
        <template #actions-cell="{ row }">
          <UPopover :content="{ align: 'end' }">
            <!-- 3-Dots Button Trigger -->
            <UButton icon="i-lucide-ellipsis-vertical" color="neutral" variant="ghost" size="xs" />

            <!-- Popover Content Box -->
            <template #content>
              <div class="p-4 w-72 space-y-4 text-xs">
                <!-- User Profile Header -->
                <div class="space-y-1 border-b border-gray-200 dark:border-gray-800 pb-3">
                  <p class="font-semibold text-sm text-gray-900 dark:text-white">
                    {{ row.original.fullname || 'Unnamed User' }}
                  </p>
                  <p class="text-gray-500 font-mono text-[11px]">
                    @{{ row.original.username || 'no-username' }}
                  </p>
                </div>

                <!-- Small Details Grid -->
                <div class="space-y-1.5 text-gray-600 dark:text-gray-300">
                  <div class="flex justify-between">
                    <span class="text-gray-400">Email:</span>
                    <span class="font-medium truncate max-w-40">{{ row.original.email }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-400">Account Type:</span>
                    <span class="font-medium">{{ row.original.accountType || '—' }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-400">Phone:</span>
                    <span class="font-medium">{{ row.original.phone_number || '—' }}</span>
                  </div>
                </div>

                <!-- Bottom Delete Action Button -->
                <div class="pt-2 border-t border-gray-200 dark:border-gray-800">
                  <UButton
                    label="Delete User"
                    icon="i-lucide-trash"
                    color="error"
                    variant="soft"
                    class="rounded-md!"
                    size="xs"
                    :ui="{ leadingIcon: 'size-3.5' }"
                    block
                    :disabled="user?.id === row.original?.id"
                    @click="openDeleteConfirmation(row.original)"
                  />
                </div>
              </div>
            </template>
          </UPopover>
        </template>
      </UTable>
    </UCard>

    <UModal v-model:open="deleteModalOpen">
      <template #content>
        <div class="p-6 space-y-4">
          <div class="space-y-1">
            <h3 class="text-lg font-semibold text-gray-900">Confirm User Deletion</h3>
            <p class="text-sm text-gray-500">
              Are you sure you want to delete
              <span class="font-medium text-gray-700">{{ userToDelete?.fullname }}</span>
              ? This action cannot be undone.
            </p>
          </div>

          <div class="flex items-center justify-end gap-3 pt-4">
            <UButton
              label="Cancel"
              color="neutral"
              variant="outline"
              size="sm"
              class="rounded-md! px-5"
              @click="deleteModalOpen = false"
            />
            <UButton
              label="Yes, Delete"
              color="error"
              size="sm"
              class="rounded-md! px-5"
              :disabled="user?.id === userToDelete.id"
              :loading="loadingStates.updatingRole"
              @click="confirmDelete"
            />
          </div>
        </div>
      </template>
    </UModal>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useAdminStore } from '~/store/admin-store'
import { AccountType } from '~/types/enums'
import { useAuthStore } from '~/store/auth-store'
import { DateFunctions } from '~/utils/dates.utils'

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'admin']
})

const adminStore = useAdminStore()
const availableRoles: AccountType[] = [
  AccountType.ADMIN,
  AccountType.TRADER,
  AccountType.INDIVIDUAL
]

const { users, loadingStates } = storeToRefs(adminStore)
const { user } = storeToRefs(useAuthStore())
const deleteModalOpen = ref(false)
const userToDelete = ref<any>(null)

// Table Columns configuration including business name
const columns = [
  { accessorKey: 'fullname', header: 'Full Name' },
  { accessorKey: 'accountType', header: 'Account Type' },
  { accessorKey: 'username', header: 'Username' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'business_name', header: 'Business Name' },
  { accessorKey: 'zohoContactId', header: 'Zoho ID' },
  { accessorKey: 'abn', header: 'ABN' },
  { accessorKey: 'licence_number', header: 'Licence No.', class: 'w-40' },
  { accessorKey: 'actions', header: '', class: 'w-10 text-right' }
]

// Actions handlers
const updateRole = async (user: any, newRole: AccountType) => {
  await adminStore.updateRole(user.id, newRole)
}

const openDeleteConfirmation = (user: any) => {
  userToDelete.value = user
  deleteModalOpen.value = true
}

const confirmDelete = async () => {
  if (!userToDelete.value) return

  await adminStore.deleteUser(userToDelete.value.id)

  deleteModalOpen.value = false
  userToDelete.value = null
}

onMounted(() => {
  adminStore.getAdminUsers()
})
</script>
