<template>
  <header
    class="inset-x-0 top-0 z-50 border-b border-surface-container bg-surface-container-lowest"
  >
    <div class="mx-auto flex h-20 max-w-7xl items-center gap-6 px-4 lg:px-6">
      <NuxtLink to="/" class="flex shrink-0 items-center gap-3 text-on-surface">
        <BaseLogo class="" />
      </NuxtLink>

      <nav class="hidden items-center gap-5 text-xs font-semibold lg:flex">
        <NuxtLink
          v-for="item in navItems"
          :key="item"
          to="/"
          class="text-on-surface-variant transition-colors hover:text-on-surface"
          >{{ item }}
        </NuxtLink>
      </nav>

      <div class="ml-auto hidden max-w-sm flex-1 md:flex">
        <label
          class="flex w-full items-center rounded border border-surface-container bg-surface-container-low px-3 focus-within:border-outline"
        >
          <Icon name="i-lucide-search" class="size-4 text-outline" />
          <input
            class="h-10 w-full bg-transparent px-3 text-sm outline-none placeholder:text-outline"
            placeholder="Search commercial hardware or SKU..."
            type="search"
          />
        </label>
      </div>

      <div class="flex shrink-0 items-center gap-4 text-on-surface-variant">
        <span
          class="hidden rounded bg-surface-container px-2 py-1 text-[10px] font-bold uppercase text-primary xl:inline-flex"
          >Wholesale Discount (-20%)</span
        >
        <button class="relative p-1" aria-label="Wishlist">
          <Icon name="i-lucide-heart" class="size-5" /><span
            class="absolute -right-1 -top-1 min-w-4 rounded-full bg-error px-1 text-center text-[10px] text-white"
            >3</span
          >
        </button>
        <button class="relative p-1" aria-label="Shopping cart">
          <Icon name="i-lucide-shopping-bag" class="size-5" /><span
            class="absolute -right-1 -top-1 min-w-4 rounded-full bg-primary px-1 text-center text-[10px] text-white"
            >4</span
          >
        </button>
        <div class="hidden items-center gap-2 border-l border-surface-container pl-4 sm:flex">
          <div
            class="flex size-8 items-center justify-center rounded bg-secondary text-xs font-bold text-on-secondary-fixed"
          >
            AI
          </div>
          <div class="hidden text-left xl:block">
            <strong class="block text-xs text-on-surface">Apex Integrators</strong
            ><span class="block text-[10px] text-outline">Verified Trade Partner</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const navItems = [
  'CCTV & Cameras',
  'Intruder Alarms',
  'Access Control',
  'Intercoms',
  'Network & Racks',
  'Wholesale Program'
]
</script>
