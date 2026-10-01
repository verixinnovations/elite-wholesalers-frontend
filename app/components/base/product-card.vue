<template>
  <article
    v-if="product"
    class="group flex flex-col min-w-0 border border-gray-200 rounded-xl overflow-hidden"
  >
    <NuxtLink :to="`/products/${product?.item_id}`" class="block flex-1">
      <div class="relative aspect-4/3 overflow-hidden bg-surface-container-low">
        <NuxtImg
          :src="
            ZohoHelpers.getZohoProductImageUrl({
              imageName: product?.image_name,
              imageDocumentId: product?.image_document_id
            })
          "
          :alt="product?.name"
          class="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
          width="600"
          height="450"
        />

        <span
          v-if="product?.available_stock <= 0"
          class="absolute text-white left-3 top-3 bg-error px-2.5 py-1 text-xs font-semibold"
        >
          Out of stock
        </span>
      </div>
      <div class="pt-4 px-2">
        <p class="text-xxs font-semibold uppercase tracking-[0.12em] text-primary-500">
          {{ product.category_name }}
        </p>
        <h2 class="my-1 line-clamp-2 text-base font-semibold text-neutral-900">
          {{ product?.item_name }}
        </h2>
        <p class="text-muted text-sm line-clamp-2 mb-2">
          {{ product?.description }}
        </p>
      </div>
    </NuxtLink>
    <div class="mt-0 mb-0 p-2 flex items-center justify-between gap-3">
      <BaseAuthButton size="lg" :variant="isLoggedIn ? 'ghost' : 'solid'" :block="!isLoggedIn">
        <span class="" v-if="isLoggedIn">
          {{ NumberFunctions.formatCurrency(product?.rate || 0, 'AUD') }}</span
        >
        <span v-else class="font-semibold">View Pricing</span>
      </BaseAuthButton>
      <BaseAddToCart v-if="isLoggedIn" />
    </div>
  </article>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth-store'
import type { ProductEntity } from '~/types/product'

const { isLoggedIn } = storeToRefs(useAuthStore())

const props = defineProps<{
  product?: ProductEntity
}>()
</script>
