<template>
  <div class="relative flex min-h-dvh w-full bg-white font-sans text-zinc-900">
    <aside
      class="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-zinc-950 p-12 lg:flex xl:p-16"
    >
      <BaseBoxedBackground />
      <!-- Brand Identity -->

      <BaseLogo class="z-10" />

      <!-- Core Message -->
      <div class="relative z-10 max-w-xl">
        <div
          class="mb-6 inline-flex rounded-full border border-zinc-700/50 bg-zinc-800/30 px-3 py-1 text-xs font-medium uppercase tracking-widest text-zinc-300 backdrop-blur-md"
        >
          B2B Marketplace
        </div>
        <h1 class="font-oswald text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.05] text-white">
          Source better.<br />
          <span class="text-zinc-500">Grow further.</span>
        </h1>
        <p class="mt-6 text-lg leading-relaxed text-zinc-400">
          The infrastructure for modern retail. Connect with verified distributors and scale your
          inventory without the operational friction.
        </p>
      </div>

      <!-- Pure CSS Stat Block (No avatars needed) -->
      <div class="relative z-10 flex flex-col gap-2 border-l-2 border-indigo-500 pl-6">
        <div class="text-3xl font-light text-white">$2M+</div>
        <div class="text-sm font-medium text-zinc-500 uppercase tracking-widest">
          In daily wholesale transactions
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
            class="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-primary-400"
          >
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
