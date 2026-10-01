<template>
  <div class="">
    <HomeHero />
    <UContainer class="mx-auto px-4 py-8 lg:px-6">
      <HomePartnerNetwork />
      <HomeCategoryGrid />
      <HomeTrendingProducts />
    </UContainer>
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
