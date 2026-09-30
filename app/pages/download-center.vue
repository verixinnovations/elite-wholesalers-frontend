<template>
  <UContainer class="py-12 space-y-12">
    <!-- Header -->
    <div class="text-center mb-10">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        DOWNLOAD CENTER
      </h1>
      <p class="mt-2 text-gray-500 dark:text-gray-400">
        Get the latest software and firmware updates for your devices.
      </p>
    </div>

    <!-- Software Updates Table -->
    <section>
      <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        SOFTWARE LATEST UPDATES
      </h2>

      <UCard :ui="{ body: 'p-0 sm:p-0' }">
        <UTable
          :columns="columns"
          :data="softwareUpdates"
          :empty-state="{
            icon: 'i-heroicons-document-magnifying-glass',
            label: 'No software updates available.'
          }"
        >
          <!-- Custom Download Cell (Nuxt UI v3 syntax: #download-cell or #[`${id}-cell`] ) -->
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

    <!-- Firmware Updates Table -->
    <section>
      <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        FIRMWARE LATEST UPDATES
      </h2>

      <UCard :ui="{ body: 'p-0 sm:p-0' }">
        <UTable
          :columns="columns"
          :data="firmwareUpdates"
          :empty-state="{
            icon: 'i-heroicons-document-magnifying-glass',
            label: 'No firmware updates available.'
          }"
        >
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
const columns = [
  { id: 'name', accessorKey: 'name', header: 'NAME' },
  { id: 'version', accessorKey: 'version', header: 'VERSION' },
  { id: 'date', accessorKey: 'date', header: 'DATE' },
  { id: 'size', accessorKey: 'size', header: 'SIZE' },
  { id: 'download', header: 'DOWNLOAD' }
]

const softwareUpdates = [
  {
    name: 'Elite Access Control Manager',
    version: 'v2.1.0',
    date: '10/09/2026',
    size: '124 MB',
    downloadLink: '#'
  },
  {
    name: 'Bosch Configuration Tool',
    version: 'v1.4.2',
    date: '15/08/2026',
    size: '56 MB',
    downloadLink: '#'
  }
]

const firmwareUpdates = [
  {
    name: 'UNV NVR Core Update',
    version: 'v5.0.1',
    date: '22/09/2026',
    size: '85 MB',
    downloadLink: '#'
  },
  {
    name: 'Milesight Camera Firmware',
    version: 'v3.2.11',
    date: '05/09/2026',
    size: '42 MB',
    downloadLink: '#'
  }
]
</script>
