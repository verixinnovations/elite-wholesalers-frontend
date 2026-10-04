<template>
  <!-- <div class="w-screen">
    <ClientOnly>
      <div class="carousel-container">
        <VueFlux :options="options" :rscs="rscs" :transitions="transitions">
          <template #preloader="preloaderProps">
            <FluxPreloader v-bind="preloaderProps" />
          </template>
          <template #pagination="paginationProps">
            <FluxPagination v-bind="paginationProps" />
          </template>
        </VueFlux>
      </div>
    </ClientOnly>
  </div> -->

  <div
    class="relative flex bg-[url('/images/slider/banner.png')] bg-contain bg-top h-[70dvh] bg-repeat w-full"
  >
    <div class="absolute size-full z-1 bg-[rgba(16,73,142,0.5)] opacity-50"></div>
    <UContainer class="z-20">
      <div class="flex items-center size-full text-white justify-start">
        <div class="">
          <h1 class="max-w-2xl leading-25 text-5xl mt-60 font-black font-archivo-black">
            Australia's Trusted
            <span class="text-secondary mx-2"> Security & Electronics</span> Suppliers
          </h1>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import {
  VueFlux,
  FluxPreloader,
  FluxPagination,
  Img,
  Blocks1,
  Blocks2,
  Fade,
  Blinds2D,
  Swipe
} from 'vue-flux'

// const items = [
//   // '/images/slider/banner.png'
//   // '/images/slider/12-volt.jpeg',
//   // '/images/slider/bosch.jpeg',
//   // '/images/slider/nidac.jpeg',
//   // '/images/slider/unv.jpeg'
// ]

// const options = reactive({
//   allowFullscreen: false,
//   allowToSkipTransition: true,
//   autohideTime: 0,
//   height: '50dvh',
//   autoplay: true,
//   bindKeys: false,
//   delay: 3000,
//   enableGestures: true,
//   infinite: true,
//   lazyLoad: true,
//   lazyLoadAfter: 3
// })

// const transitions = shallowReactive([Blocks1, Blocks2, Fade, Swipe, Blinds2D])

// const rscs = shallowReactive(items.map((item) => new Img(item)))
</script>
