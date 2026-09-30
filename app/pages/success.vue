<template>
  <main
    class="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-5 py-16 text-center"
  >
    <span class="grid size-16 place-items-center rounded-full bg-green-100 text-green-700">
      <UIcon name="i-lucide-check" class="size-8" />
    </span>
    <p class="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-primary-500">
      Order confirmed
    </p>
    <h1 class="mt-2 font-oswald text-4xl font-medium text-neutral-950">
      Thank you for your order.
    </h1>
    <p class="mt-4 max-w-md leading-7 text-neutral-600">
      We have received your order and will send its progress to your email.
    </p>
    <p v-if="orderId" class="mt-5 border-y border-neutral-200 py-3 text-sm text-neutral-600">
      Order reference <span class="font-bold text-neutral-950">{{ orderId }}</span>
    </p>
    <div class="mt-8 flex flex-col gap-3 sm:flex-row">
      <UButton label="Continue shopping" to="/products" />
      <UButton label="View my orders" to="/dashboard/orders" color="neutral" variant="outline" />
    </div>
  </main>
</template>

<script setup lang="ts">
const route = useRoute()
const orderId = computed(() => (typeof route.query.order === 'string' ? route.query.order : ''))

useSeoMeta({ title: 'Order confirmed' })
</script>
