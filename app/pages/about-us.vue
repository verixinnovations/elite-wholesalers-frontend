<template>
  <div class="py-12 space-y-16 max-w-5xl mx-auto w-full">
    <!-- Main Story Section -->
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
      <!-- Story Content Cards -->
      <div class="lg:col-span-3 space-y-6">
        <h1
          class="text-[clamp(1.5rem,5vw,2.4rem)] font-oswald font-extrabold tracking-tight text-primary text-center"
        >
          {{ pageData.title }}
        </h1>
        <div class="">
          <div class="space-y-4 text-base font-sans font-arial">
            <p v-for="(paragraph, index) in pageData.story" :key="index" v-html="paragraph"></p>
          </div>

          <div class="flex items-center justify-end text-primary text-sm font-medium">
            <span>{{ pageData.author }}</span>
          </div>
        </div>
      </div>

      <NuxtImg src="/images/about-us/emu-in-sky-project.png" class="w-full lg:col-span-2" />
    </div>

    <!-- What Do We Deliver Section -->
    <section class="space-y-8 bg-primary-50 rounded-lg overflow-hidden">
      <div class="text-center mx-auto space-y-2">
        <h2
          class="text-[clamp(1rem,5vw,1.5rem)] p-2 w-full font-oswald font-bold tracking-tight text-secondary bg-primary"
        >
          {{ deliveryInfo.title }}
        </h2>
      </div>

      <div class="space-y-4 p-5">
        <div v-for="(item, index) in deliveryInfo.items" :key="index" class="flex gap-x-2">
          <UIcon name="i-lucide-square-check" class="bg-primary shrink-0 size-5" />
          <div class="space-y-3">
            <p class="text-sm text-primary">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'template',
  backgroundImage: '/images/slider/banner.png'
})

const pageData = {
  title: 'ABOUT US',
  author: 'George Papoulidis (General Manager)',
  story: [
    'In 2013, my passion and skills led to opening our first store, <strong>Elite Wholesalers P/L</strong> in Peakhurst, NSW. Since then, we have established a dedicated sales office in Victoria.',
    'We are now in our 13th year of business. Due to continuous growth, success, and deep industry experience, we have managed to secure and be part of many prominent sites across Australia—most recently, supplying the lighting for the <em>Aboriginal EMU in the Sky Sculpture</em> located on the M12 for Transport NSW.',
    'My personal experience in the electrical and security industry spans over 36 years, aiding us in successfully sourcing products from local and international market leaders. We have recommended our listed products for many years on projects across this diverse industry, striving to support small-to-medium-sized businesses across Australia. We also offer onsite tech support for all our valued clients.'
  ]
}

const companyHighlights = [
  { icon: 'i-heroicons-check-circle', text: 'Founded in 2013 (Peakhurst, NSW)' },
  { icon: 'i-heroicons-check-circle', text: 'Sales Office in Victoria (VIC)' },
  { icon: 'i-heroicons-check-circle', text: '36+ Years Industry Experience' },
  { icon: 'i-heroicons-check-circle', text: 'Major Project Partners (Transport NSW)' }
]

const deliveryInfo = {
  title: 'WHAT DO WE DELIVER?',
  items: [
    {
      icon: 'i-heroicons-wrench-screwdriver',
      title: 'Expert Assistance',
      description: 'Old School Real service, real performance'
    },
    {
      icon: 'i-heroicons-wrench-screwdriver',
      title: 'Expert Assistance',
      description:
        'Experienced system design and application assistance tailored to your requirements.'
    },
    {
      icon: 'i-heroicons-lifebuoy',
      title: 'Tech Support',
      description: 'On and off-site technical support delivered by fully trained industry experts.'
    },
    {
      icon: 'i-heroicons-building-storefront',
      title: 'Extensive Stock',
      description:
        'Large local stock availability alongside top-tier international manufacturers to draw from.'
    },
    {
      icon: 'i-heroicons-user-group',
      title: 'Personalized Service',
      description:
        'Provided by experts with an average of over thirty years in industry and distribution.'
    },
    {
      icon: 'i-heroicons-check-badge',
      title: 'Turn Key Solutions',
      description:
        'Comprehensive turnkey solution offerings designed to simplify project deployment from concept to completion.'
    }
  ]
}
</script>
