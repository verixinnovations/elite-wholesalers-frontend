<template>
  <main class="mx-auto max-w-5xl px-5 py-10 sm:px-8 lg:py-14">
    <div class="flex items-end justify-between gap-4 border-b border-neutral-200 pb-6">
      <div>
        <p class="text-xs font-bold uppercase tracking-[0.16em] text-primary-500">Your selection</p>
        <h1 class="mt-2 font-oswald text-4xl font-medium text-neutral-950">Shopping cart</h1>
      </div>
      <span class="pb-1 text-sm text-neutral-500">{{ cart.totalItems }} items</span>
    </div>

    <div v-if="!cart.items.length" class="py-20 text-center">
      <UIcon name="i-lucide-shopping-bag" class="mx-auto size-10 text-neutral-300" />
      <h2 class="mt-5 font-oswald text-2xl text-neutral-900">Your cart is empty</h2>
      <p class="mt-2 text-sm text-neutral-500">Find something worth stocking up on.</p>
      <UButton label="Browse products" to="/products" class="mt-6" />
    </div>

    <div v-else class="mt-7 grid gap-10 lg:grid-cols-[1fr_320px]">
      <div class="divide-y divide-neutral-200">
        <article
          v-for="item in cart.items"
          :key="item.id"
          class="flex gap-4 py-5 first:pt-0 sm:gap-6"
        >
          <NuxtLink
            :to="`/products/${item.productId}`"
            class="size-24 shrink-0 overflow-hidden bg-surface-container-low sm:size-32"
          >
            <NuxtImg
              :src="item.image"
              :alt="item.title"
              class="size-full object-cover"
              width="200"
              height="200"
            />
          </NuxtLink>
          <div class="flex min-w-0 flex-1 flex-col justify-between gap-3 sm:flex-row">
            <div class="min-w-0">
              <NuxtLink
                :to="`/products/${item.productId}`"
                class="font-semibold text-neutral-900 hover:text-primary-600"
              >
                {{ item.title }}
              </NuxtLink>
              <p v-if="Object.keys(item.variant).length" class="mt-1 text-sm text-neutral-500">
                {{
                  Object.entries(item.variant)
                    .map(([name, value]) => `${name}: ${value}`)
                    .join(' · ')
                }}
              </p>
              <p class="mt-2 text-sm font-medium text-neutral-700">
                {{ NumberFunctions.formatCurrency(item.unitPrice, item.currencyCode) }}
              </p>
            </div>
            <div
              class="flex items-center justify-between gap-5 sm:items-end sm:flex-col sm:justify-between"
            >
              <div class="inline-flex items-center border border-neutral-200">
                <button
                  class="size-9 text-neutral-600 hover:bg-neutral-50"
                  :aria-label="`Decrease ${item.title} quantity`"
                  @click="cart.updateQuantity(item.id, item.quantity - 1)"
                >
                  −
                </button>
                <span class="min-w-9 text-center text-sm tabular-nums">{{ item.quantity }}</span>
                <button
                  class="size-9 text-neutral-600 hover:bg-neutral-50"
                  :aria-label="`Increase ${item.title} quantity`"
                  :disabled="item.quantity >= (item.maxQuantity ?? Number.MAX_SAFE_INTEGER)"
                  @click="cart.updateQuantity(item.id, item.quantity + 1)"
                >
                  +
                </button>
              </div>
              <button
                class="text-sm text-neutral-500 underline decoration-neutral-300 underline-offset-4 hover:text-red-700"
                @click="cart.removeFromCart(item.id)"
              >
                Remove
              </button>
            </div>
          </div>
        </article>
      </div>

      <aside
        class="h-fit border-t border-neutral-200 pt-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0"
      >
        <h2 class="font-oswald text-2xl text-neutral-950">Order summary</h2>
        <div class="mt-6 flex justify-between text-sm text-neutral-600">
          <span>Subtotal</span
          ><span>{{ NumberFunctions.formatCurrency(cart.subtotal, currencyCode) }}</span>
        </div>
        <p class="mt-2 text-xs leading-5 text-neutral-500">
          Shipping and taxes are calculated at checkout.
        </p>
        <div
          class="mt-5 flex justify-between border-t border-neutral-200 pt-4 font-semibold text-neutral-950"
        >
          <span>Estimated total</span
          ><span>{{ NumberFunctions.formatCurrency(cart.subtotal, currencyCode) }}</span>
        </div>
        <UButton
          label="Continue to checkout"
          to="/checkout"
          icon="i-lucide-arrow-right"
          trailing
          class="mt-6 w-full justify-center"
          size="lg"
        />
        <NuxtLink
          to="/products"
          class="mt-4 block text-center text-sm font-semibold text-primary-600 hover:underline"
          >Continue shopping</NuxtLink
        >
      </aside>
    </div>
  </main>
</template>

<script setup lang="ts">
const cart = useCartStore()
const currencyCode = computed(() => cart.items[0]?.currencyCode ?? 'USD')

useSeoMeta({ title: 'Shopping cart' })
</script>
