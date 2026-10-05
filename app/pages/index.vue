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
      <UContainer class="mx-auto py-20 lg:px-6">
        <div class="">
          <iframe
            class="w-full h-[50dvh]"
            src="https://www.youtube.com/embed/xArTod5Rz6o?si=HUPP3PviSecdapC9"
            title="YouTube video player"
            frameborder="0"
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
