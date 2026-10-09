<template>
  <UContainer class="py-12 space-y-12">
    <!-- Loop through each dynamic category and its items -->
    <section v-for="category in firmwares" :key="category.id">
      <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        {{ category.title }}
      </h2>

      <UCard :ui="{ body: 'p-0 sm:p-0' }">
        <UTable
          :columns="columns"
          :data="category.items"
          :empty-state="{
            icon: 'i-heroicons-document-magnifying-glass',
            label: `No items available in ${category.title}.`
          }"
        >
          <!-- Map item.title to 'name' column display if data expects 'name' -->
          <template #name-cell="{ row }">
            <span class="font-medium text-gray-900 dark:text-white">{{ row.original.title }}</span>
          </template>

          <!-- Format Date cell -->
          <template #date-cell="{ row }">
            <span>{{ DateFunctions.formatIntlDate(new Date(row.original.date ?? '')) }}</span>
          </template>

          <!-- Custom Download Cell -->
          <template #download-cell="{ row }">
            <UButton
              icon="i-heroicons-arrow-down-tray"
              size="sm"
              color="primary"
              variant="soft"
              :to="row.original.downloadLink"
              target="_blank"
              aria-label="Download"
            />
          </template>
        </UTable>
      </UCard>
    </section>
  </UContainer>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import { storeToRefs } from 'pinia'
import { useUtilStore } from '~/store/util-store'

definePageMeta({
  name: 'download-center',
  layout: 'template',
  backgroundImage: '/images/office.png',
  pageTitle: 'Download Center',
  pageDescription: 'Get the latest software and firmware updates for your devices.'
})

const utilStore = useUtilStore()
const { firmwares } = storeToRefs(utilStore)

onMounted(async () => {
  await utilStore.getFirmwares()
})

const columns = [
  { id: 'name', accessorKey: 'title', header: 'NAME' },
  { id: 'version', accessorKey: 'version', header: 'VERSION' },
  { id: 'date', accessorKey: 'date', header: 'DATE' },
  { id: 'size', accessorKey: 'size', header: 'SIZE' },
  { id: 'download', header: 'DOWNLOAD' }
]
</script>
