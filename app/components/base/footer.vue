<template>
  <footer class="border-t border-surface-container bg-surface-container-lowest py-12">
    <div
      class="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-4 lg:px-6"
    >
      <div v-for="group in groups" :key="group?.title">
        <h3 class="mb-3 text-xs font-bold uppercase tracking-wider text-on-surface">
          {{ group?.title }}
        </h3>
        <ul class="space-y-2 text-xs text-on-surface-variant">
          <li v-for="item in group.items" :key="item">
            <NuxtLink to="/" class="hover:text-on-surface">{{ item }}</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <div
      class="mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-3 border-t border-surface-container px-4 pt-6 text-[10px] text-outline md:flex-row lg:px-6"
    >
      <span>© 2025 Elite Wholesalers Distribution Corp. Strictly Trade Wholesale.</span
      ><span>Commercial Settlement: Net 30/60 · Direct EFT · Commercial Visa/MC</span>
    </div>
  </footer>
</template>

<script setup lang="ts">
const groups = [
  {
    title: 'Hardware Categories',
    items: [
      'CCTV & Surveillance Systems',
      'Intruder Alarms & Detectors',
      'Access Control & Keycards',
      'Commercial Video Intercoms',
      'Network Racks & Cat6 Cabling'
    ]
  },
  {
    title: 'Trade Account & Verification',
    items: [
      'Apply for Net 30 Commercial Terms',
      'Volume Discount Matrix',
      'Reseller Tax Exemption Upload',
      'Direct SKU Quick Order Pad',
      'Account Verification Status'
    ]
  },
  {
    title: 'Logistics & Terms',
    items: [
      'Same-Day Pallet Dispatch (Cutoff 4:30 PM)',
      'Regional Warehouses: NJ, GA, TX, CA',
      'B2B Commercial Sales Terms',
      'Commercial Hardware Warranty',
      'Freight & Will Call Pickups'
    ]
  },
  {
    title: 'Certifications & Compliance',
    items: [
      'ISO 9001:2015 Registered Facility',
      'NDAA § 889 Compliant Inventory',
      'UL / CSA Security Certified Gear',
      'Security Industry Association (SIA)'
    ]
  }
]
</script>
