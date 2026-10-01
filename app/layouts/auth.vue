<script setup lang="ts">
import { RouteName } from '~/constants/route-names'
</script>

<template>
  <div class="relative flex min-h-dvh w-full bg-white font-sans text-zinc-900">
    <aside
      class="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-zinc-950 p-12 lg:flex xl:p-16"
    >
      <BaseBoxedBackground />
      <!-- Brand Identity -->

      <BaseLogo class="z-10" variant="white" />

      <!-- Core Message -->
      <div class="relative z-10 max-w-xl">
        <h1
          class="font-oswald text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.05] text-zinc-500"
        >
          Australia’s trusted source for
          <span class="text-zinc-50">security, networking & electronics</span> devices.<br />
        </h1>
        <p class="mt-6 text-lg leading-relaxed text-zinc-400">
          Best pricing, fast fulfilment and reliable support for businesses, installers and
          resellers.
        </p>
        <p class="mt-6 text-lg leading-relaxed text-zinc-300">
          Trusted by trade buyers across Australia.
        </p>
      </div>

      <!-- Pure CSS Stat Block (No avatars needed) -->
      <div class="relative z-10 flex flex-col gap-2 border-l-2 border-indigo-500 pl-6">
        <div class="text-sm font-medium text-zinc-500 uppercase tracking-widest">
          We are PCI certified.
        </div>
      </div>
    </aside>

    <!-- Action Panel (Forms, Slot Content) -->
    <main class="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-20 xl:px-32">
      <div class="mb-12 lg:hidden">
        <BaseLogo />
      </div>

      <!-- Dynamic Content Injection -->
      <div class="mx-auto w-full max-w-md">
        <div class="mb-10">
          <p
            v-if="$route.meta.pageLabel"
            class="mb-3 flex items-center gap-x-2 text-xs font-bold uppercase tracking-[0.14em] text-primary-400"
          >
            <NuxtLink
              v-if="$route.meta.hasBackButton"
              :to="{ name: RouteName.Auth.Login }"
              class="inline-flex items-center text-sm font-bold"
            >
              <UButton icon="i-lucide-arrow-left" color="primary" size="xs" />
            </NuxtLink>
            {{ $route.meta.pageLabel }}
          </p>
          <h1
            v-if="$route.meta.pageLabel"
            class="font-oswald text-[clamp(1.4rem,5vw,2rem)] font-medium leading-[1.05] text-primary"
          >
            {{ $route.meta.pageTitle }}
          </h1>
          <p v-if="$route.meta.pageLabel" class="mt-4 leading-[1.6] text-neutral-400">
            {{ $route.meta.pageHint }}
          </p>
        </div>
        <slot />
      </div>
    </main>
  </div>
</template>
