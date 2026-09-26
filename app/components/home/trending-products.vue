<template>
  <section class="mb-12">
    <div class="mb-6 flex items-center justify-between">
      <div>
        <span class="text-[10px] font-bold uppercase tracking-wider text-outline"
          >Verified Production Runs</span
        >
        <h2 class="text-2xl font-bold tracking-tight text-on-surface">Trending Hardware</h2>
      </div>
    </div>
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <BaseProductCard
        v-for="product in products.slice(0, 8)"
        :product="product"
        :key="product.id"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { products } from '../../data/products.json'
</script>
