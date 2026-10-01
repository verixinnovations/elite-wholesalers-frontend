<template>
  <div class="w-screen">
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

const items = [
  '/images/slider/12-volt.jpeg',
  '/images/slider/bosch.jpeg',
  '/images/slider/nidac.jpeg',
  '/images/slider/unv.jpeg'
]

const options = reactive({
  allowFullscreen: false,
  allowToSkipTransition: true,
  autohideTime: 0,
  height: '50dvh',
  autoplay: true,
  bindKeys: false,
  delay: 3000,
  enableGestures: true,
  infinite: true,
  lazyLoad: true,
  lazyLoadAfter: 3
})

const transitions = shallowReactive([Blocks1, Blocks2, Fade, Swipe, Blinds2D])

const rscs = shallowReactive(items.map((item) => new Img(item)))
</script>
