<template>
  <section>
    <header class="border-b border-neutral-200 pb-6">
      <p class="text-xs font-bold uppercase tracking-[0.16em] text-rose-500">ADMIN Account</p>

      <div>
        <h1 class="text-4xl font-oswald font-medium">Product Management</h1>
        <p class="text-sm text-muted mt-2">
          View storefront items, search inventory, and manage product spec.
        </p>
      </div>
    </header>

    <div class="flex flex-col my-5 sm:flex-row items-center justify-between gap-4">
      <UInput
        v-model="searchQuery"
        icon="i-lucide-search"
        placeholder="Search by product name or SKU..."
        size="sm"
        class="w-full sm:w-80"
        clearable
      />

      <div class="flex items-center gap-2 w-full sm:w-auto justify-end">
        <span class="text-xs font-medium text-gray-500">Category:</span>
        <USelectMenu
          v-model="query.category_id"
          label-key="name"
          value-key="category_id"
          :items="categories"
          size="sm"
          class="w-44"
        />
      </div>
    </div>

    <UCard :ui="{ body: 'p-0' }">
      <!-- Pass the sliced array to UTable -->
      <UTable
        :data="paginatedProducts"
        :columns="columns"
        v-model:global-filter="searchQuery"
        :ui="{
          td: 'py-2 px-3 text-xs text-wrap',
          th: 'py-2.5 px-3 text-xs font-semibold'
        }"
      >
        <template #item_id-cell="{ row }">
          <NuxtImg
            :src="
              ZohoHelpers.getZohoProductImageUrl({
                imageName: row.original.image_name,
                imageDocumentId: row.original.image_document_id
              })
            "
            class="w-9 h-9 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-700"
          />
        </template>

        <!-- Product Name Cell -->
        <template #name-cell="{ row }">
          <div class="text-gray-900 max-w-md block font-medium">
            {{ row.original.name }}
          </div>
        </template>

        <!-- Category Cell -->
        <template #category_name-cell="{ row }">
          <UBadge variant="soft" color="neutral" size="sm">
            {{ row.original.category_name }}
          </UBadge>
        </template>

        <!-- SKU Cell -->
        <template #sku-cell="{ row }">
          <span class="text-gray-500 font-mono text-xs">
            {{ row.original.sku || '—' }}
          </span>
        </template>

        <!-- Price Cell -->
        <template #price-cell="{ row }">
          <span class="text-gray-700 font-k2d font-medium">
            {{ NumberFunctions.formatCurrency(row.original.rate, Currency.AUD) }}
          </span>
        </template>

        <!-- Specs Upload Button Cell -->
        <template #documents-cell="{ row }">
          <div class="" @click="selectedProductId = row.original.item_id">
            <BaseUploadProductSpecs
              size="sm"
              class="text-xs"
              :variant="Boolean(row.original?.cf_product_specs) ? 'solid' : 'outline'"
              color="neutral"
              :loading="loadingStates.uploadingSpecs && selectedProductId === row.original.item_id"
              :hasProductSpecs="Boolean(row.original?.cf_product_specs)"
              @updated="adminStore.getAdminProducts(query)"
              :product="row.original"
            />
          </div>
        </template>
      </UTable>

      <!-- Pagination Footer -->
      <div
        v-if="products.length > 0"
        class="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-800"
      >
        <span class="text-xs text-gray-500">
          Showing
          <span class="font-medium">{{ pagination.pageIndex * pagination.pageSize + 1 }}</span>
          to
          <span class="font-medium">{{
            Math.min((pagination.pageIndex + 1) * pagination.pageSize, products.length)
          }}</span>
          of
          <span class="font-medium">{{ products.length }}</span> results
        </span>

        <UPagination
          v-model:page="currentPage"
          :total="products.length"
          :items-per-page="pagination.pageSize"
          size="sm"
          class="rounded-none!"
        >
          <template #last>
            <span class="hidden"></span>
          </template>
          <template #first>
            <span class="hidden"></span>
          </template>
        </UPagination>
      </div>
    </UCard>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAdminStore } from '~/store/admin-store'
import { useAuthStore } from '~/store/auth-store'
import { Currency } from '~/types/enums'

const adminStore = useAdminStore()
const { products, categories, loadingStates } = storeToRefs(adminStore)
const { user } = storeToRefs(useAuthStore())

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'admin']
})
const query = ref({
  category_id: ''
})

const searchQuery = ref('')

const selectedProductId = ref('')

const pagination = ref({
  pageIndex: 0,
  pageSize: 15
})

const currentPage = computed({
  get: () => pagination.value.pageIndex + 1,
  set: (val) => {
    pagination.value.pageIndex = val - 1
  }
})

const paginatedProducts = computed(() => {
  const start = pagination.value.pageIndex * pagination.value.pageSize
  const end = start + pagination.value.pageSize
  return products.value.slice(start, end)
})

const columns = [
  { accessorKey: 'item_id', header: 'Image', class: 'w-16' },
  { accessorKey: 'name', header: 'Product Name' },
  { accessorKey: 'category_name', header: 'Category' },
  { accessorKey: 'sku', header: 'SKU' },
  { accessorKey: 'price', header: 'Original Price' },
  { accessorKey: 'documents', header: 'Product Specs', class: 'text-right' }
]

watch(
  () => query.value,
  (newVal) => {
    adminStore.getAdminProducts(newVal)
    pagination.value.pageIndex = 0 // Reset to page 1 on query changes
  },
  { deep: true }
)

onBeforeMount(() => {
  adminStore.getAdminProducts()
  adminStore.getProductCategories()
})
</script>
