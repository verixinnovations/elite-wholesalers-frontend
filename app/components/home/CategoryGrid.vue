<template>
  <section class="mb-12">
    <div class="mb-6 flex items-end justify-between">
      <div>
        <span class="text-[10px] font-bold uppercase tracking-wider text-outline">
          Commercial Core
        </span>
        <h2 class="text-2xl font-bold tracking-tight text-on-surface">Shop by Category</h2>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <UCard
        v-for="category in categories"
        :key="category.id"
        :ui="{
          root: 'overflow-hidden flex flex-col rounded-t-nones! transition-all duration-200 hover:shadow-lg hover:-translate-y-1',
          body: 'flex-1 flex flex-col justify-between px-3! py-2!',
          header: 'p-0!',
          footer: 'px-3!'
        }"
      >
        <!-- Card Media Header -->
        <template #header>
          <div class="relative w-full overflow-hidden bg-gray-800">
            <img
              :src="category.image"
              :alt="category.name"
              class="w-full h-60 object-cover overflow-hidden object-top block transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />

            <!-- Total Products Counter Overlay -->
            <div v-if="category.totalProducts !== undefined" class="absolute bottom-2.5 left-2.5">
              <UBadge
                color="secondary"
                variant="solid"
                size="xs"
                class="text-neutral backdrop-blur-sm rounded-4xl"
              >
                {{ category.totalProducts }} Products
              </UBadge>
            </div>
          </div>
        </template>

        <!-- Card Content Body -->
        <div class="space-y-2">
          <h3 class="font-medium font-oswald uppercase text-lg leading-tight">
            {{ category.name }}
          </h3>

          <p v-if="category.description" class="text-sm text-gray-500 line-clamp-2 overflow-clip">
            {{ category.description }}
          </p>
        </div>

        <!-- Action Footer -->
        <template #footer>
          <div class="border-gray-100 flex items-center justify-between gap-2">
            <span class="text-xs text-gray-500 dark:text-gray-400">
              <span
                v-if="category.inStockCount"
                class="font-medium text-gray-700 dark:text-gray-200"
              >
                {{ category.inStockCount }}
              </span>
              <span v-if="category.inStockCount"> in stock</span>
            </span>

            <UButton
              size="xs"
              color="primary"
              variant="ghost"
              trailing-icon="i-heroicons-arrow-right-20-solid"
              @click="$emit('select', category)"
            >
              Browse
            </UButton>
          </div>
        </template>
      </UCard>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useProductStore } from '~/store/product-store'

const { categories } = storeToRefs(useProductStore())
</script>
