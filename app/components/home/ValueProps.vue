<template>
  <section class="mb-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
    <article
      v-for="item in items"
      :key="item.title"
      class="flex items-start gap-4 rounded-lg bg-surface-container-low p-5 shadow-sm"
    >
      <div class="rounded bg-surface-container p-2 text-primary">
        <Icon :name="item.icon" class="size-6" />
      </div>
      <div>
        <h3 class="font-bold text-on-surface">
          {{ item?.title }}
        </h3>
        <p class="mt-1 text-xs text-on-surface-variant">
          {{ item.description }}
        </p>
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
const items = [
  {
    icon: 'i-lucide-truck',
    title: 'Same-Day Dispatch',
    description: 'Orders received before 16:30 EST shipped out immediately.'
  },
  {
    icon: 'i-lucide-percent',
    title: '20% Trade Discount',
    description: 'Flat baseline discount across all hardware for registered accounts.'
  },
  {
    icon: 'i-lucide-badge-check',
    title: '5-Yr Hardware Warranty',
    description: 'Enterprise advance-replacement coverage on critical gear.'
  },
  {
    icon: 'i-lucide-box',
    title: 'Free Pallet Freight',
    description: 'Complimentary LTL carrier freight on orders over $5,000.'
  }
]
</script>
