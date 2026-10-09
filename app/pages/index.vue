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
        <div class="">
          <ClientOnly>
            <div class="relative w-full aspect-video rounded-lg overflow-hidden">
              <ScriptYouTubePlayer
                video-id="xArTod5Rz6o"
                :player-vars="{
                  si: 'HUPP3PviSecdapC9'
                }"
                trigger="visible"
                class="absolute top-0 left-0 w-full h-full border-0"
              >
                <template #placeholder>
                  <div
                    class="absolute inset-0 bg-gray-900 flex items-center justify-center text-white"
                  >
                    <span>Loading Video...</span>
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

useHead({
  script: [
    {
      src: 'https://useperch.xyz/widget.js',
      'data-site-id': 'ws_66547f904a',
      async: true
    }
  ]
})
</script>
