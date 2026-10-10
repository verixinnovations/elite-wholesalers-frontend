<template>
  <div class="">
    <HomeHero />

    <div class="">
      <div class="bg-white py-8">
        <UContainer class="mx-auto px-4 lg:px-6">
          <HomePartnerNetwork />
        </UContainer>
      </div>
      <HomeCategoryGrid id="products" />
      <div class="bg-white py-8">
        <UContainer class="mx-auto px-4 lg:px-6">
          <HomeTrendingProducts />
        </UContainer>
      </div>

      <UContainer class="mx-auto py-10 lg:py-20 lg:px-6">
        <div class="w-full max-w-4xl mx-auto my-6">
          <ClientOnly>
            <div
              class="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-gray-900"
            >
              <ScriptYouTubePlayer
                video-id="xArTod5Rz6o"
                :player-vars="{
                  si: 'f3SuCIe4nTV8cPAl',
                  autoplay: 0
                }"
                trigger="visible"
                class="absolute top-0 left-0 w-full h-full border-0"
              >
                <template #placeholder>
                  <div
                    class="absolute inset-0 bg-gray-900 flex flex-col items-center justify-center text-white cursor-pointer group"
                  >
                    <!-- Optional Play Button Icon Overlay -->
                    <div
                      class="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform"
                    >
                      <svg
                        class="w-8 h-8 text-white translate-x-0.5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <span class="mt-3 text-sm font-medium tracking-wide text-gray-300"
                      >Load Elite Wholesalers Video</span
                    >
                  </div>
                </template>
              </ScriptYouTubePlayer>
            </div>
          </ClientOnly>
        </div>
      </UContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouteName } from '~/constants/route-names'

definePageMeta({
  title: 'Home Page',
  name: RouteName.Home
})

useHead({
  title: 'Home Page'
})
</script>
