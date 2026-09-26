<template>
  <section class="mb-12 border-t border-surface-container pt-8">
    <div class="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        <div class="mb-1 flex items-center gap-2">
          <span class="size-2 rounded-full bg-primary" /><span
            class="text-[10px] font-bold uppercase tracking-wider text-outline"
            >Authorized Integrator Network</span
          >
        </div>
        <h2 class="text-xl font-bold tracking-tight max-w-md text-on-surface">
          Trusted by Top Commercial Security Integrators & Enterprise Companies
        </h2>
      </div>
    </div>
    <UMarquee
      :ui="{
        root: '[--gap:--spacing(10)]'
      }"
    >
      <div class="" v-for="partner in partners" :key="partner.name" :repeat="10">
        <LazyNuxtImg :src="'/images/partners/' + partner.logo" class="max-h-10" />
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
