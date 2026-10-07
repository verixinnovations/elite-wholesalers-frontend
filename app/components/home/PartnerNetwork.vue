<template>
  <section class="mb-12 md:pt-8">
    <div class="flex justify-center mx-auto text-center my-10 flex-col size-full">
      <h2
        class="text-[clamp(1.5rem,5vw,2rem)] font-semibold text-primary w-fit p-3 mb-4 rounded-sm mx-auto border-2 border-black"
      >
        Welcome to Elite Wholesalers
      </h2>
      <p class="text-primary text-lg">
        Suppliers of premium CCTV, Alarms, Intercoms, Lighting, Automotion and Automotive Products
        for the Trade and Retail Sector.
      </p>
    </div>
    <UMarquee
      :ui="{
        root: '[--gap:--spacing(10)]'
      }"
    >
      <div class="" v-for="partner in partners" :key="partner.name" :repeat="10">
        <LazyNuxtImg :src="'/images/partners/' + partner.logo" class="max-h-5 md:max-h-10" />
      </div>
    </UMarquee>
  </section>
</template>

<script setup lang="ts">
const scroller = ref<HTMLElement>()

const partners = ref([
  { name: 'salpixie', logo: 'salpixie.png' },
  { name: '12volt', logo: '12-volt.jpeg' },
  { name: 'bosch', logo: 'bosch.jpeg' },
  { name: 'bticino', logo: 'bticino.jpeg' },
  { name: 'ews', logo: 'ews.jpeg' },
  { name: 'GME Kingray', logo: 'gme-kingray.jpeg' },
  { name: 'tesla', logo: 'tesla.jpeg' },
  { name: 'UNV', logo: 'unv.jpeg' }
])
function scroll(direction: number) {
  scroller.value?.scrollBy({ left: direction * 300, behavior: 'smooth' })
}
</script>
