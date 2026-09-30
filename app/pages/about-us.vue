<template>
  <UContainer class="py-12 space-y-16">
    <!-- Hero / Title Section -->
    <div class="text-center max-w-3xl mx-auto space-y-4">
      <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
        {{ pageData.title }}
      </h1>
      <div class="w-20 h-1 bg-primary-500 mx-auto rounded-full"></div>
    </div>

    <!-- Main Story Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <!-- Story Content Cards -->
      <div class="lg:col-span-2 space-y-6">
        <UCard class="shadow-sm">
          <div class="space-y-4 text-base font-sans">
            <p v-for="(paragraph, index) in pageData.story" :key="index" v-html="paragraph"></p>
          </div>

          <template #footer>
            <div class="flex items-center justify-end text-primary text-sm font-medium">
              <span>{{ pageData.author }}</span>
            </div>
          </template>
        </UCard>
      </div>

      <!-- Quick Facts / Highlights Sidebar -->
      <div class="space-y-6">
        <UCard class="bg-gray-50 dark:bg-gray-900 border-l-4 border-primary-500">
          <h3 class="font-bold text-gray-900 dark:text-white mb-2">Company Highlights</h3>
          <ul class="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <li
              v-for="(highlight, index) in companyHighlights"
              :key="index"
              class="flex items-center gap-2"
            >
              <UIcon :name="highlight.icon" class="w-5 h-5 text-primary-500 flex-shrink-0" />
              <span>{{ highlight.text }}</span>
            </li>
          </ul>
        </UCard>
      </div>
    </div>

    <!-- What Do We Deliver Section -->
    <section class="space-y-8">
      <div class="text-center max-w-2xl mx-auto space-y-2">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
          {{ deliveryInfo.title }}
        </h2>
        <p
          class="text-primary-600 dark:text-primary-400 font-medium"
          v-html="deliveryInfo.subtitle"
        ></p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Delivery Items mapped dynamically -->
        <UCard
          v-for="(item, index) in deliveryInfo.items"
          :key="index"
          class="hover:shadow-md transition-shadow"
          :class="item.colSpanClass || ''"
        >
          <div class="space-y-3">
            <div
              class="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-primary-600 dark:text-primary-400"
            >
              <UIcon :name="item.icon" class="w-6 h-6" />
            </div>
            <h4 class="font-semibold text-gray-900 dark:text-white">{{ item.title }}</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ item.description }}
            </p>
          </div>
        </UCard>
      </div>
    </section>
  </UContainer>
</template>

<script setup lang="ts">
// Page Data Objects
const pageData = {
  title: 'ABOUT US',
  author: 'George Popuolis (General Manager)',
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
  subtitle: 'Old School &bull; Real service, real performance',
  items: [
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
        'Comprehensive turnkey solution offerings designed to simplify project deployment from concept to completion.',
      colSpanClass: 'lg:col-span-2' // Maps back to the custom span required by the 5th item
    }
  ]
}
</script>
