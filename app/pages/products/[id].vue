<template>
  <main v-if="product" class="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-14">
    <nav class="mb-7 text-xs line-clamp-1 lg:text-sm text-neutral-500 flex" aria-label="Breadcrumb">
      <NuxtLink to="/products" class="hover:text-primary-600">Products</NuxtLink>

      <span class="mx-2 block text-xxs md:text-xs">/</span>
      <NuxtLink :to="`/categories/${product.category_id}`" class="hover:text-primary-600 block">{{
        product.category_name
      }}</NuxtLink>

      <span class="text-neutral-900 hidden lg:block">
        <span class="mx-2">/</span> {{ TextFunctions.sliceWords(product.name, 20) }}</span
      >
    </nav>

    <div class="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <BaseProductGallery :images="getProductImages(product)" :alt="product.name" />
      <section class="lg:py-4">
        <p class="text-xs font-bold uppercase tracking-[0.16em] text-primary-500">
          {{ product?.brand ?? product.category_name }}
        </p>
        <h1
          class="mt-3 font-oswald text-[clamp(1.5rem,5vw,2.5rem)] font-medium leading-tight text-neutral-950"
        >
          {{ product.name }}
        </h1>
        <div class="">
          <p class="mt-5 text-2xl font-bold text-primary font-k2d" v-if="isLoggedIn">
            {{ NumberFunctions.formatCurrency(product.price.amount, product.price.currency) }}
            <span class="ml-2 text-sm font-normal text-neutral-500">per unit</span>
          </p>
          <UBadge variant="soft" color="neutral" class="mt-6 w-fit flex items-center gap-2 text-sm">
            <span class="size-2 rounded-full bg-neutral-500" /> SKU :
            {{ product.sku }}
          </UBadge>
        </div>

        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <BaseAddToCart v-if="isLoggedIn" class="md:w-fit px-10!" />
          <BaseAuthButton color="neutral" class="md:w-fit px-10!" v-else size="lg">
            <span class="font-semibold mx-auto">View Pricing</span>
          </BaseAuthButton>

          <UButton
            label="Download Specs"
            icon="i-lucide-file-down"
            color="neutral"
            variant="outline"
            tooltip="jellp"
            size="lg"
            class="justify-center"
            :loading="loadingStates.product"
            :disabled="!hasProductSpecs"
            @click="downloadProductSpecs()"
          />

          <BaseUploadProductSpecs
            v-if="user?.accountType === AccountType.ADMIN"
            :hasProductSpecs
            :loading="adminLoadingStates.uploadingSpecs"
            @updated="productStore.selectProduct(route.params.id as string, { force: true })"
            :product="product"
          />
        </div>

        <p
          v-html="product.description"
          class="mt-7 whitespace-pre-line leading-7 text-neutral-600"
        ></p>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { RouteName } from '~/constants/route-names'
import { useAuthStore } from '~/store/auth-store'
import { AccountType } from '~/types/enums'
import { useProductStore } from '~/store/product-store'
import { useAdminStore } from '~/store/admin-store'

definePageMeta({
  name: RouteName.ProductDetails
})

const route = useRoute()
const productStore = useProductStore()

const { isLoggedIn, user } = storeToRefs(useAuthStore())
const { loadingStates: adminLoadingStates } = storeToRefs(useAdminStore())

const { selectedProduct: product, loadingStates } = storeToRefs(productStore)
const getProductImages = (product: any) => {
  const images = product.documents?.map((doc: any) => {
    return ZohoHelpers.getZohoProductImageUrl({
      imageName: doc.file_name,
      imageDocumentId: doc.document_id
    })
  })
  return images || []
}

const hasProductSpecs = computed(() => {
  const customFields = product?.value?.custom_fields || []
  const specsFieldIndex = customFields.findIndex(
    (field) => field.api_name === 'cf_product_specs' || field.label === 'product_specs'
  )
  return specsFieldIndex >= 0
})

function downloadProductSpecs() {
  const customFields = product?.value?.custom_fields || []
  const specsField = customFields.find(
    (field) => field.api_name === 'cf_product_specs' || field.label === 'product_specs'
  )

  const fileUrl = specsField?.value

  // 2. Check if the URL exists
  if (!fileUrl) {
    console.error('Product specs URL not found in custom fields.')
    alert('No product specs available for this item.')
    return
  }

  // 3. Trigger navigation or open the file
  // Option A: Opens the PDF/file in a new browser tab (Best user experience)
  window.open(fileUrl, '_blank')

  // Option B: If you want to navigate away in the current tab/window:
  // window.location.href = fileUrl;
}

onBeforeMount(() => {
  productStore.selectProduct(route.params.id as string)
})
</script>
