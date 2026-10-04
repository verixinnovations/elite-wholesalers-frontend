<template>
  <section class="mx-auto px-4 lg:px-6 mb-12 bg-primary py-12">
    <UContainer>
      <div class="mb-6 flex items-end justify-between">
        <div>
          <!-- <span class="text-xxs font-bold uppercase tracking-wider text-outline">
          Commercial Core
        </span> -->
          <h2 class="text-4xl font-oswald font-bold tracking-tight uppercase text-white">
            Popular Categories
          </h2>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <UCard
          v-for="category in categories"
          :key="category.category_id"
          class="cursor-pointer"
          :ui="{
            root: 'overflow-hidden max-w-70 ring-transparent flex flex-col rounded-none! transition-all duration-200 hover:shadow-lg hover:-translate-y-1',
            body: 'flex-1 flex flex-col justify-between px-3! py-0!!',
            header: 'p-0!',
            footer: 'p-0!'
          }"
          @click="productStore.selectCategory(category)"
        >
          <!-- Card Media Header -->
          <template #header>
            <div class="relative w-full overflow-hidden bg-gray-800">
              <img
                :src="category.image"
                :alt="category.name"
                class="w-full h-80 object-fill bg-left overflow-hidden object-top block transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
            </div>
          </template>

          <!-- <div class="space-y-2">
            <h3 class="font-medium font-oswald uppercase text-lg leading-tight">
              {{ category.name }}
            </h3>

            <p v-if="category.description" class="text-sm text-gray-500 line-clamp-2 overflow-clip">
              {{ category.description }}
            </p>
          </div> -->

          <!-- Action Footer -->
          <template #footer>
            <!-- <div class="bg-secondary flex items-center justify-end gap-2">
              <UButton
                size="xs"
                color="primary"
                variant="ghost"
                trailing-icon="i-heroicons-arrow-right-20-solid"
                @click="$emit('select', category)"
              >
                Browse
              </UButton>
            </div> -->

            <div
              class="bg-secondary hover:text-white text-sm uppercase text-center text-black font-base py-2"
            >
              {{ category.name }}
            </div>
          </template>
        </UCard>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { useProductStore } from '~/store/product-store'

const productStore = useProductStore()
const { categories } = storeToRefs(productStore)
</script>
