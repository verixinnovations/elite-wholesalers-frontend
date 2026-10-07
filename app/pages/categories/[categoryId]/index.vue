<template>
  <UContainer class="mx-auto px-5 py-10 sm:px-8 lg:py-14">
    <div class="border-b border-neutral-200">
      <div class="flex flex-col justify-between gap-6 pb-7 sm:flex-row sm:items-end">
        <div>
          <h1 class="mt-2 font-oswald text-4xl font-medium text-neutral-950 sm:text-5xl">
            {{ parentCategory?.name }}
          </h1>
        </div>
      </div>
    </div>
    <div class="sticky top-0 z-10 w-full mt-5 px-5 py-3 backdrop-blur">
      <nav
        v-if="subCategories.length > 0"
        class="overflow-x-auto pb-1 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        aria-label="Filter products by category"
      >
        <UCard
          v-for="category in subCategories"
          :key="category.category_id"
          class="cursor-pointer"
          :ui="{
            root: ' min-w-0 md:max-w-[343px] md:h-[255px] ring-transparent flex flex-col rounded-none! transition-all',
            body: 'flex-1 flex flex-col justify-between px-3! py-0!!',
            header: 'p-0!',
            footer: 'p-0!'
          }"
          @click="productStore.selectCategory(category.category_id)"
        >
          <template #header>
            <div class="relative w-full overflow-hidden bg-gray-800">
              <NuxtImg
                :src="
                  ZohoHelpers.getZohoProductImageUrl({
                    imageName: category.documents[0].file_name,
                    imageDocumentId: category.documents[0].document_id
                  })
                "
                :alt="category.name"
                class="w-full bg-left h-60 md:h-50 lg:h-40 overflow-hidden object-top block transition-transform duration-300 aspect-square md:aspect-auto"
                loading="lazy"
              />
            </div>
          </template>
          <template #footer>
            <div
              class="bg-secondary hover:text-white text-sm uppercase text-center text-black font-base py-2"
            >
              {{ category.name }}
            </div>
          </template>
        </UCard>
      </nav>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import { RouteName } from '~/constants/route-names'
import { useProductStore } from '~/store/product-store'

useSeoMeta({ title: 'Products', description: 'Browse the Elite Wholesalers product collection.' })

definePageMeta({
  name: RouteName.Categories
})

const route = useRoute()
const productStore = useProductStore()
const { parentCategory, subCategories } = storeToRefs(productStore)

const categoryId = computed(() => route.params.categoryId as string)

onBeforeMount(async () => {
  if (categoryId) {
    await productStore.selectCategory(categoryId.value)
  }
})
</script>
