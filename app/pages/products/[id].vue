<template>
  <main v-if="product" class="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-14">
    <nav class="mb-7 text-xs line-clamp-1 lg:text-sm text-neutral-500 flex" aria-label="Breadcrumb">
      <NuxtLink to="/products" class="hover:text-primary-600">Products</NuxtLink>

      <span class="mx-2 block">/</span>
      <NuxtLink :to="`/categories/${product.category_id}`" class="hover:text-primary-600 block">{{
        product.category_name
      }}</NuxtLink>
      <span class="mx-2 block">/</span>
      <span class="text-neutral-900 hidden lg:block">{{
        TextFunctions.sliceWords(product.name, 48)
      }}</span>
      <span class="text-neutral-900 block lg:hidden">{{
        TextFunctions.sliceWords(product.name)
      }}</span>
    </nav>

    <div class="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <BaseProductGallery :images="getProductImages(product)" :alt="product.name" />
      <section class="lg:py-4">
        <p class="text-xs font-bold uppercase tracking-[0.16em] text-primary-500">
          {{ product.category_name }}
        </p>
        <h1
          class="mt-3 font-oswald text-[clamp(1.5rem,5vw,2.5rem)] font-medium leading-tight text-neutral-950 sm:text-5xl"
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
          <BaseAuthButton class="w-fit px-10!" v-else size="lg">
            <span class="font-semibold">View Pricing</span>
          </BaseAuthButton>
          <UButton
            label="Download Specs"
            icon="i-lucide-file-down"
            color="neutral"
            variant="outline"
            size="lg"
            class="justify-center"
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
import { useProductStore } from '~/store/product-store'

definePageMeta({
  name: RouteName.ProductDetails
})
const route = useRoute()
const productStore = useProductStore()

const { isLoggedIn } = storeToRefs(useAuthStore())

const { selectedProduct: product } = storeToRefs(productStore)
const getProductImages = (product: any) => {
  const images = product.documents?.map((doc: any) => {
    return ZohoHelpers.getZohoProductImageUrl({
      imageName: doc.file_name,
      imageDocumentId: doc.document_id
    })
  })
  return images || []
}

onBeforeMount(() => {
  productStore.selectProduct(route.params.id as string)
})
</script>
