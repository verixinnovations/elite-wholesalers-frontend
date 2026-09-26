<template>
  <div class="p-4 w-full bg-gray-900 text-white text-center text-sm">
    <div
      class="flex w-full flex-col items-center justify-center gap-3 rounded-lg px-5 py-2 md:flex-row"
    >
      <div class="flex min-w-0 items-center gap-3">
        <span
          class="inline-flex items-center gap-1 rounded bg-secondary-container px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-on-secondary-fixed"
          ><span class="size-1.5 rounded-full bg-on-secondary-fixed" /> Live Inventory</span
        >
        <span class="truncate text-xs">
          Pallet cutoff today: 16:30 EST · 99.4% same-day order dispatch rate across 4 logistics
          nodes
        </span>
      </div>
      <div
        class="flex shrink-0 items-center gap-4 text-[10px] font-semibold uppercase tracking-wide text-outline"
      >
        <span class="flex items-center gap-1 text-on-surface">
          <Icon name="i-lucide-badge-check" class="size-3.5 text-primary" /> NDAA § 889 Compliant
        </span>
        <span class="hidden sm:flex items-center gap-1">
          <Icon name="i-lucide-truck" class="size-3.5" />
          Tier 1 Freight Sync
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
