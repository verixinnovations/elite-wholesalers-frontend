<template>
  <div
    v-if="product"
    class="group flex flex-col max-w-xs border border-gray-200 rounded-md overflow-hidden"
  >
    <NuxtLink :to="`/products/${product?.item_id}`" class="block flex-1">
      <div
        class="relative w-full min-w-0 aspect-square overflow-hidden flex items-center justify-center p-3 group"
      >
        <NuxtImg
          :src="
            ZohoHelpers.getZohoProductImageUrl({
              imageName: product?.image_name,
              imageDocumentId: product?.image_document_id
            })
          "
          :alt="product?.name"
          class="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>
      <div class="pt-4 px-2">
        <p class="text-xxs font-semibold line-clamp-1 uppercase tracking-[0.12em] text-primary-500">
          {{ product.sku }}
        </p>
        <h2 class="my-1 line-clamp-2 font-roboto text-base font-semibold text-neutral-900">
          {{ product?.item_name }}
        </h2>
        <!-- <p class="text-muted text-sm line-clamp-2 mb-2">
          {{ product?.description }}
        </p> -->
      </div>
    </NuxtLink>
    <div class="mt-0 mb-0 flex p-2 items-center justify-between gap-3">
      <BaseAuthButton size="lg" :variant="isLoggedIn ? 'link' : 'solid'" :block="!isLoggedIn">
        <span class="font-k2d text-lg text-primary-400" v-if="isLoggedIn">
          {{
            NumberFunctions.formatCurrency(product?.price.amount || 0, product.price.currency)
          }}</span
        >
        <span v-else class="font-semibold">View Pricing</span>
      </BaseAuthButton>
      <BaseAddToCart class="rounded!" v-if="isLoggedIn" :product="product" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth-store'
import type { ProductEntity } from '~/types/product'

const { isLoggedIn } = storeToRefs(useAuthStore())

const props = defineProps<{
  product?: ProductEntity
}>()
</script>
