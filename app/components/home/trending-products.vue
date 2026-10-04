<template>
  <section class="mb-20">
    <div class="mb-6 flex items-center justify-between">
      <div>
        <!-- <span class="text-xxs text-primary font-bold uppercase tracking-wider text-outline"
          >Products
          </span> -->
        <h2 class="font-bold font-poppins tracking-wide text-4xl mb-10 uppercase text-primary">
          Featured Products Range
        </h2>
      </div>
    </div>
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <UCard
        v-for="category in featuredCategories"
        :key="category.categoryId"
        class="cursor-pointer"
        :ui="{
          root: 'overflow-hidden max-w-70 ring-transparent flex flex-col rounded-none! transition-all duration-200 hover:shadow-lg hover:-translate-y-1',
          body: 'flex-1 flex flex-col justify-between px-3! py-0!!',
          header: 'p-0!',
          footer: 'p-0!'
        }"
        @click="productStore.selectCategory(category.categoryId)"
      >
        <!-- Card Media Header -->
        <template #header>
          <div class="relative w-full overflow-hidden bg-gray-800">
            <img
              :src="category.image"
              :alt="category.label"
              class="w-full h-60 object-fill bg-left overflow-hidden object-top block transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
          </div>
        </template>
        <template #footer>
          <div
            class="bg-secondary hover:text-white text-sm uppercase text-center text-black font-base py-2"
          >
            {{ category.label }}
          </div>
        </template>
      </UCard>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useProductStore } from '~/store/product-store'

const productStore = useProductStore()

const featuredCategories = ref([
  {
    label: 'Remote Start',
    categoryId: '1969240000024824077',
    image: '/images/slider/12-volt.jpeg'
  },
  {
    label: 'Access Control',
    categoryId: '1969240000022731037',
    image: '/images/slider/unv.jpeg'
  },
  {
    label: 'UNV',
    categoryId: '1969240000025646043',
    image: '/images/slider/nidac.jpeg'
  },
  {
    label: 'Bosch',
    categoryId: '1969240000009043013',
    image: '/images/slider/bosch.jpeg'
  }
])
</script>
