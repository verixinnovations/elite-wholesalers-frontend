<template>
  <div
    class="group flex flex-col justify-between rounded-xl bg-surface-container-lowest p-5 shadow-sm"
  >
    <div>
      <div class="mb-3 flex items-center text-[10px]">
        <span class="font-semibold text-primary">Stock: {{ product?.quantity }}</span>
      </div>
      <div
        class="mb-4 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg bg-surface-container-low"
      >
        <img
          :src="product?.picture"
          :alt="product?.title"
          class="size-full rounded object-cover object-top mix-blend-multiply"
        />
      </div>
      <h3 class="mb-1 truncate font-bold text-on-surface group-hover:text-primary">
        {{ product?.title }}
      </h3>
      <p class="mb-4 line-clamp-2 text-xs text-on-surface-variant">
        {{ product?.description }}
      </p>
    </div>
    <div>
      <BaseAuthButton v-if="!isLoggedIn" label="view pricing" class="w-full justify-center mb-3" />
      <div v-else class="mb-3 flex items-baseline justify-between">
        <div class="space-x-1">
          <span class="text-xl font-bold text-primary">{{ product?.current_price.amount }}</span>
          <span class="text-xs text-outline line-through">{{
            product?.standard_price.amount
          }}</span>
        </div>
      </div>

      <button
        class="flex w-full items-center justify-center gap-2 rounded bg-surface-container py-2 text-xs font-bold text-on-surface transition-colors hover:bg-primary hover:text-on-primary"
        type="button"
        @click="addToCart(product?.title)"
      >
        <Icon name="i-lucide-shopping-cart" class="size-4" /> Add to Cart
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth-store'
import type { ProductEntity } from '~/types/product'

defineProps<{ product: ProductEntity }>()

const { isLoggedIn } = storeToRefs(useAuthStore())
const toast = useToast()

function addToCart(name: string) {
  toast.add({ title: 'Added to cart', description: name, color: 'success' })
}
</script>

<style scoped></style>
