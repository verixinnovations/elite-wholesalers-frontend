<template>
  <article class="group min-w-0 border border-gray-200 rounded-xl overflow-hidden">
    <NuxtLink :to="`/products/${1}`" class="block">
      <div class="relative aspect-4/3 overflow-hidden bg-surface-container-low">
        <NuxtImg
          :src="'/images/slider/bosch.jpeg'"
          :alt="1"
          class="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
          width="600"
          height="450"
        />
        <span
          v-if="Math.random() > 0.5 ? true : false"
          class="absolute text-white left-3 top-3 bg-error px-2.5 py-1 text-xs font-semibold"
        >
          Out of stock
        </span>
      </div>
      <div class="pt-4 px-2">
        <p class="text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-500">
          {{ categoryName ?? 'Elecrtonics' }}
        </p>
        <h2 class="mt-1 line-clamp-2 text-base font-semibold text-neutral-900">
          {{ product?.name ?? 'Solar Inverter' }}
        </h2>
        <p class="text-muted text-sm line-clamp-1 mb-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae officia quidem neque
          impedit ducimus error, inventore labore voluptate quas voluptatum?
        </p>
      </div>
    </NuxtLink>
    <div class="mt-0 p-2 flex items-center justify-between gap-3">
      <BaseAuthButton :variant="isLoggedIn ? 'ghost' : 'solid'" :block="!isLoggedIn">
        <span class="" v-if="isLoggedIn">
          {{ NumberFunctions.formatCurrency(Math.random() + 1 * 500, 'AUD') }}</span
        >
        <span v-else>View Pricing</span>
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
  categoryName?: string
}>()

const cart = useCartStore()
const toast = useToast()
</script>
