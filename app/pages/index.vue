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
            <div class="relative w-full aspect-video overflow-hidden rounded-xl shadow-md">
              <iframe
                class="absolute top-0 left-0 w-full h-full border-0"
                src="https://www.youtube.com/embed/xArTod5Rz6o?si=HUPP3PviSecdapC9"
                title="YouTube video player"
                allow="
                  accelerometer;
                  autoplay;
                  clipboard-write;
                  encrypted-media;
                  gyroscope;
                  picture-in-picture;
                  web-share;
                "
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
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
