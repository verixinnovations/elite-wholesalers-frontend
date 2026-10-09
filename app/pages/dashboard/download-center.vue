<template>
  <section class="max-w-xl space-y-8 pb-12">
    <header class="border-b border-neutral-200 pb-6 dark:border-neutral-800">
      <p class="text-xs font-bold uppercase tracking-[0.16em] text-rose-500">ADMIN Account</p>
      <div>
        <h1 class="text-4xl font-oswald font-medium">Download Center Management</h1>
        <p class="text-sm text-muted mt-2">
          Create, edit, reorder, and manage firmware categories and downloadable resources.
        </p>
      </div>
    </header>

    <!-- Main Navigation Tabs -->
    <UTabs :items="tabItems" class="w-full">
      <!-- ==================== TAB 1: CREATE ==================== -->
      <template #create>
        <div class="space-y-8 pt-6">
          <!-- Category Creator -->
          <div class="space-y-4 rounded-xl border border-neutral-200 p-6 dark:border-neutral-800">
            <div>
              <h2 class="text-base font-semibold text-neutral-900 dark:text-white">
                Create Category
              </h2>
              <p class="text-xs text-neutral-500">Add a new category before assigning resources.</p>
            </div>

            <UForm
              v-slot="categoryFormState"
              :state="categoryState"
              :schema="categoryValidationSchema"
              class="w-full"
              @submit="handleCategorySubmit"
            >
              <div class="grid grid-cols-2 gap-4">
                <UFormField label="Category Name" name="name">
                  <UInput
                    v-model="categoryState.name"
                    class="w-full"
                    placeholder="e.g. enterprise-software"
                  />
                </UFormField>

                <UFormField label="Category Title" name="title">
                  <UInput
                    v-model="categoryState.title"
                    class="w-full"
                    placeholder="e.g. Enterprise Solutions"
                  />
                </UFormField>

                <div class="col-span-2 mt-2">
                  <UButton
                    type="submit"
                    class="flex items-center justify-center rounded-lg"
                    block
                    size="lg"
                    color="neutral"
                    label="Create Category"
                    :loading="loadingStates.firmware"
                  />
                </div>
              </div>
            </UForm>
          </div>

          <!-- Resource Creator -->
          <div class="space-y-4 rounded-xl border border-neutral-200 p-6 dark:border-neutral-800">
            <div>
              <h2 class="text-base font-semibold text-neutral-900 dark:text-white">
                Create Resource
              </h2>
              <p class="text-xs text-neutral-500">Fill in details for the downloadable file.</p>
            </div>

            <UForm
              v-slot="resourceFormState"
              :state="resourceState"
              :schema="resourceValidationSchema"
              class="w-full"
              @submit="handleResourceSubmit"
            >
              <div class="grid grid-cols-2 gap-4">
                <UFormField label="Title" name="title" class="col-span-2">
                  <UInput
                    v-model="resourceState.title"
                    class="w-full"
                    placeholder="e.g. Enterprise Suite"
                  />
                </UFormField>

                <UFormField label="Version" name="version" class="col-span-1">
                  <UInput
                    v-model="resourceState.version"
                    class="w-full"
                    placeholder="e.g. v1.2.0"
                  />
                </UFormField>

                <UFormField label="File Size" name="size" class="col-span-1">
                  <UInput v-model="resourceState.size" class="w-full" placeholder="e.g. 45 MB" />
                </UFormField>

                <UFormField label="Release Date" name="date" class="col-span-1">
                  <UPopover>
                    <UButton
                      color="neutral"
                      variant="subtle"
                      icon="i-lucide-calendar"
                      class="w-full justify-between"
                    >
                      {{
                        resourceState.date
                          ? format(new Date(resourceState.date), 'yyyy-MM-dd')
                          : 'Select date'
                      }}
                    </UButton>
                    <template #content>
                      <UCalendar v-model="resourceCalendarDate" class="p-2" />
                    </template>
                  </UPopover>
                </UFormField>

                <UFormField label="Category" name="categoryId" class="col-span-1">
                  <USelectMenu
                    v-model="resourceState.categoryId"
                    :items="firmwareCategories"
                    label-key="title"
                    value-key="id"
                    placeholder="Select a category"
                    class="w-full"
                  />
                </UFormField>

                <UFormField label="Download Link" name="downloadLink" class="col-span-2">
                  <UInput
                    v-model="resourceState.downloadLink"
                    class="w-full"
                    placeholder="https://example.com/download"
                  />
                </UFormField>

                <div class="col-span-2 mt-2">
                  <UButton
                    type="submit"
                    class="flex items-center justify-center rounded-lg"
                    block
                    size="xl"
                    label="Save Resource"
                    :loading="loadingStates.firmware"
                  />
                </div>
              </div>
            </UForm>
          </div>
        </div>
      </template>

      <!-- ==================== TAB 2: MANAGE & EDIT ==================== -->
      <template #edit>
        <div class="space-y-8 pt-6">
          <!-- Categories Table -->
          <div class="space-y-4 rounded-xl border border-neutral-200 p-6 dark:border-neutral-800">
            <h3 class="text-base font-semibold">Manage Categories</h3>
            <UTable :data="firmwareCategories" :columns="categoryTableColumns" class="w-full">
              <template #title-cell="{ row }">
                <UInput v-model="row.original.title" size="xs" />
              </template>
              <template #name-cell="{ row }">
                <UInput v-model="row.original.name" size="xs" />
              </template>
              <template #actions-cell="{ row }">
                <div class="flex items-center gap-2">
                  <UButton
                    size="xs"
                    color="primary"
                    label="Save"
                    @click="saveCategoryEdit(row.original)"
                  />
                  <UButton
                    size="xs"
                    color="error"
                    variant="ghost"
                    icon="i-lucide-trash"
                    @click="adminStore.deleteCategory(row.original.id)"
                  />
                </div>
              </template>
            </UTable>
          </div>

          <!-- Items Table -->
          <div class="space-y-4 rounded-xl border border-neutral-200 p-6 dark:border-neutral-800">
            <h3 class="text-base font-semibold">Manage Resources</h3>
            <UTable :data="items" :columns="itemTableColumns" class="w-full">
              <template #title-cell="{ row }">
                <UInput v-model="row.original.title" size="xs" />
              </template>
              <template #version-cell="{ row }">
                <UInput v-model="row.original.version" size="xs" />
              </template>
              <template #size-cell="{ row }">
                <UInput v-model="row.original.size" size="xs" />
              </template>
              <template #actions-cell="{ row }">
                <div class="flex items-center gap-2">
                  <UButton
                    size="xs"
                    color="primary"
                    label="Save"
                    @click="saveItemEdit(row.original)"
                  />
                  <UButton
                    size="xs"
                    color="error"
                    variant="ghost"
                    icon="i-lucide-trash"
                    @click="adminStore.deleteItem(row.original.id)"
                  />
                </div>
              </template>
            </UTable>
          </div>
        </div>
      </template>

      <!-- ==================== TAB 3: REORDER ==================== -->
      <template #reorder>
        <div class="space-y-8 pt-6">
          <!-- Categories Reorder -->
          <div class="space-y-4 rounded-xl border border-neutral-200 p-6 dark:border-neutral-800">
            <h3 class="text-base font-semibold">Reorder Categories</h3>
            <UTable :data="firmwareCategories" :columns="categoryReorderColumns" class="w-full">
              <template #actions-cell="{ row }">
                <div class="flex items-center gap-2">
                  <UButton
                    size="xs"
                    variant="subtle"
                    icon="i-lucide-arrow-up"
                    @click="moveCategory(row.index, -1)"
                    :disabled="row.index === 0"
                  />
                  <UButton
                    size="xs"
                    variant="subtle"
                    icon="i-lucide-arrow-down"
                    @click="moveCategory(row.index, 1)"
                    :disabled="row.index === firmwareCategories.length - 1"
                  />
                </div>
              </template>
            </UTable>
          </div>

          <!-- Items Reorder -->
          <div class="space-y-4 rounded-xl border border-neutral-200 p-6 dark:border-neutral-800">
            <h3 class="text-base font-semibold">Reorder Resources</h3>
            <UTable :data="items" :columns="itemReorderColumns" class="w-full">
              <template #actions-cell="{ row }">
                <div class="flex items-center gap-2">
                  <UButton
                    size="xs"
                    variant="subtle"
                    icon="i-lucide-arrow-up"
                    @click="moveItem(row.index, -1)"
                    :disabled="row.index === 0"
                  />
                  <UButton
                    size="xs"
                    variant="subtle"
                    icon="i-lucide-arrow-down"
                    @click="moveItem(row.index, 1)"
                    :disabled="row.index === items.length - 1"
                  />
                </div>
              </template>
            </UTable>
          </div>
        </div>
      </template>
    </UTabs>
  </section>
</template>

<script setup lang="ts">
import * as zod from 'zod'
import { format } from 'date-fns'
import { storeToRefs } from 'pinia'
import type { FormSubmitEvent } from '@nuxt/ui'
import { useAdminStore } from '~/store/admin-store'

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'admin']
})

const adminStore = useAdminStore()
const { firmwareCategories, items, loadingStates } = storeToRefs(adminStore)

onMounted(async () => {
  await adminStore.fetchCategories()
  await adminStore.fetchItems()
})

const tabItems = [
  { label: 'Create', slot: 'create' },
  { label: 'Manage & Edit', slot: 'edit' },
  { label: 'Reorder', slot: 'reorder' }
]

// --- Category Validation & State ---
const categoryValidationSchema = zod.object({
  name: zod.string().min(1, 'Category name is required'),
  title: zod.string().min(1, 'Category title is required')
})

type CategorySchema = zod.output<typeof categoryValidationSchema>

const categoryState = ref<Partial<CategorySchema>>({
  name: undefined,
  title: undefined
})

const categoryTableColumns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'title', header: 'Title' },
  { id: 'actions', header: 'Actions' }
]

const categoryReorderColumns = [
  { accessorKey: 'title', header: 'Category Title' },
  { id: 'actions', header: 'Move' }
]

const handleCategorySubmit = async (event: FormSubmitEvent<CategorySchema>) => {
  await adminStore.createCategory(event.data)
  categoryState.value = { name: undefined, title: undefined }
}

const saveCategoryEdit = async (category: any) => {
  await adminStore.updateCategory(category.id, {
    name: category.name,
    title: category.title
  })
}

const moveCategory = async (index: number, direction: number) => {
  const list = [...firmwareCategories.value]
  const targetIndex = index + direction
  if (targetIndex < 0 || targetIndex >= list.length) return

  const [movedItem] = list.splice(index, 1)
  list.splice(targetIndex, 0, movedItem)

  adminStore.firmwareCategories = list
  await adminStore.reorderCategories(list.map((c) => c.id))
}

// --- Resource Validation & State ---
const resourceValidationSchema = zod.object({
  title: zod.string().min(1, 'Title is required'),
  version: zod.string().min(1, 'Version is required'),
  date: zod.string().min(1, 'Date is required'),
  categoryId: zod.string().min(1, 'Category is required'),
  size: zod.string().min(1, 'Size is required'),
  downloadLink: zod.string().url('Please enter a valid download URL')
})

type ResourceSchema = zod.output<typeof resourceValidationSchema>

const resourceState = ref<Partial<ResourceSchema>>({
  title: undefined,
  version: undefined,
  date: new Date().toISOString(),
  categoryId: undefined,
  size: undefined,
  downloadLink: undefined
})

const resourceCalendarDate = computed({
  get: () => (resourceState.value.date ? new Date(resourceState.value.date) : new Date()),
  set: (val: Date | any) => {
    resourceState.value.date = val ? new Date(val).toISOString() : undefined
  }
})

const itemTableColumns = [
  { accessorKey: 'title', header: 'Title' },
  { accessorKey: 'version', header: 'Version' },
  { accessorKey: 'size', header: 'Size' },
  { id: 'actions', header: 'Actions' }
]

const itemReorderColumns = [
  { accessorKey: 'title', header: 'Resource Title' },
  { accessorKey: 'version', header: 'Version' },
  { id: 'actions', header: 'Move' }
]

const handleResourceSubmit = async (event: FormSubmitEvent<ResourceSchema>) => {
  await adminStore.createItem(event.data)
  resourceState.value = {
    title: undefined,
    version: undefined,
    date: new Date().toISOString(),
    categoryId: undefined,
    size: undefined,
    downloadLink: undefined
  }
}

const saveItemEdit = async (item: any) => {
  await adminStore.updateItem(item.id, {
    title: item.title,
    version: item.version,
    size: item.size,
    downloadLink: item.downloadLink,
    categoryId: item.categoryId,
    date: item.date
  })
}

const moveItem = async (index: number, direction: number) => {
  const list = [...items.value]
  const targetIndex = index + direction
  if (targetIndex < 0 || targetIndex >= list.length) return

  const [movedItem] = list.splice(index, 1)
  list.splice(targetIndex, 0, movedItem)

  adminStore.items = list
  await adminStore.reorderItems(list.map((i) => i.id))
}
</script>
