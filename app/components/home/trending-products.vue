<template>
  <section class="mb-12">
    <div class="mb-6 flex items-center justify-between">
      <div>
        <!-- <span class="text-xxs text-primary font-bold uppercase tracking-wider text-outline"
          >Products
          </span> -->
        <h2 class="text-2xl font-bold tracking-tight text-on-surface">Featured Products</h2>
      </div>
    </div>
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <BaseProductCard
        v-for="product in featuredProducts"
        :product="product"
        :key="product.item_id"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useProductStore } from '~/store/product-store'

const { featuredProducts } = storeToRefs(useProductStore())
</script>
