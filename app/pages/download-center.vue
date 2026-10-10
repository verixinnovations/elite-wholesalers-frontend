<template>
  <UContainer class="grid gap-10 py-12 space-y-12 lg:grid-cols-2">
    <section v-for="category in firmwares" :key="category.id">
      <UCard :ui="{ root: 'rounded-none', body: 'p-0 sm:p-0', header: 'p-0 sm:px-0 px-0' }">
        <template #header>
          <h2 class="text-xl font-semibold font-oswald uppercase bg-primary text-white p-2">
            {{ category.title }}
          </h2>
        </template>
        <UTable
          :columns="columns"
          :data="category.items"
          class=""
          :empty-state="{
            icon: 'i-heroicons-document-magnifying-glass',
            label: `No items available in ${category.title}.`
          }"
        >
          <!-- Map item.title to 'name' column display if data expects 'name' -->
          <template #name-cell="{ row }">
            <span class="font-medium text-gray-900">{{ row.original.title }}</span>
          </template>

          <template #size-cell="{ row }">
            <span class="uppercase">{{ row.original.size }}</span>
          </template>

          <!-- Format Date cell -->
          <template #date-cell="{ row }">
            <span>{{ DateFunctions.formatIntlDate((row.original?.date as string) ?? '') }}</span>
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
import { storeToRefs } from 'pinia'
import { useUtilStore } from '~/store/util-store'
import { DateFunctions } from '~/utils/dates.utils'

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
  {
    id: 'download',
    header: 'DOWNLOAD',
    meta: {
      class: {
        th: 'text-center',
        td: 'text-center'
      }
    }
  }
]
</script>
