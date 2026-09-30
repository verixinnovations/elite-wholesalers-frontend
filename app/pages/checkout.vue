<template>
  <main class="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-14">
    <div class="border-b border-neutral-200 pb-6">
      <p class="text-xs font-bold uppercase tracking-[0.16em] text-primary-500">Secure checkout</p>
      <h1 class="mt-2 font-oswald text-4xl font-medium text-neutral-950">Delivery details</h1>
    </div>

    <div v-if="!cart.items.length" class="py-16 text-center">
      <h2 class="font-oswald text-2xl text-neutral-900">There is nothing to check out yet</h2>
      <UButton label="Browse products" to="/products" class="mt-5" />
    </div>

    <div v-else class="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
      <UForm :schema="schema" :state="state" class="space-y-8" @submit="placeOrder">
        <section>
          <div class="mb-5 flex items-baseline justify-between gap-3">
            <h2 class="font-oswald text-2xl text-neutral-950">Contact</h2>
            <span class="text-xs text-neutral-500">Required for order updates</span>
          </div>
          <UFormField name="email" label="Email address" required>
            <UInput
              v-model="state.email"
              type="email"
              autocomplete="email"
              placeholder="you@business.com"
              class="w-full"
            />
          </UFormField>
        </section>

        <section>
          <h2 class="mb-5 font-oswald text-2xl text-neutral-950">Shipping address</h2>
          <div class="grid gap-4 sm:grid-cols-2">
            <UFormField name="shippingAddress.firstName" label="First name" required>
              <UInput
                v-model="state.shippingAddress.firstName"
                autocomplete="shipping given-name"
                class="w-full"
              />
            </UFormField>
            <UFormField name="shippingAddress.lastName" label="Last name" required>
              <UInput
                v-model="state.shippingAddress.lastName"
                autocomplete="shipping family-name"
                class="w-full"
              />
            </UFormField>
            <UFormField name="shippingAddress.company" label="Company" class="sm:col-span-2">
              <UInput
                v-model="state.shippingAddress.company"
                autocomplete="organization"
                class="w-full"
              />
            </UFormField>
            <UFormField
              name="shippingAddress.address1"
              label="Street address"
              required
              class="sm:col-span-2"
            >
              <UInput
                v-model="state.shippingAddress.address1"
                autocomplete="shipping address-line1"
                class="w-full"
              />
            </UFormField>
            <UFormField
              name="shippingAddress.address2"
              label="Apartment, suite, etc."
              class="sm:col-span-2"
            >
              <UInput
                v-model="state.shippingAddress.address2"
                autocomplete="shipping address-line2"
                class="w-full"
              />
            </UFormField>
            <UFormField name="shippingAddress.city" label="City" required>
              <UInput
                v-model="state.shippingAddress.city"
                autocomplete="shipping address-level2"
                class="w-full"
              />
            </UFormField>
            <UFormField name="shippingAddress.state" label="State / region" required>
              <UInput
                v-model="state.shippingAddress.state"
                autocomplete="shipping address-level1"
                class="w-full"
              />
            </UFormField>
            <UFormField name="shippingAddress.postalCode" label="Postcode" required>
              <UInput
                v-model="state.shippingAddress.postalCode"
                autocomplete="shipping postal-code"
                class="w-full"
              />
            </UFormField>
            <UFormField name="shippingAddress.country" label="Country" required>
              <UInput
                v-model="state.shippingAddress.country"
                autocomplete="shipping country-name"
                class="w-full"
              />
            </UFormField>
            <UFormField name="shippingAddress.phone" label="Phone" required class="sm:col-span-2">
              <UInput
                v-model="state.shippingAddress.phone"
                type="tel"
                autocomplete="shipping tel"
                class="w-full"
              />
            </UFormField>
          </div>
        </section>

        <section class="border-t border-neutral-200 pt-6">
          <UCheckbox
            v-model="state.billingSameAsShipping"
            label="Billing address is the same as shipping"
            @update:model-value="setBillingAddressMode"
          />
          <div v-if="!state.billingSameAsShipping && state.billingAddress" class="mt-6">
            <h2 class="mb-5 font-oswald text-2xl text-neutral-950">Billing address</h2>
            <div class="grid gap-4 sm:grid-cols-2">
              <UFormField name="billingAddress.firstName" label="First name" required>
                <UInput
                  v-model="state.billingAddress.firstName"
                  autocomplete="billing given-name"
                  class="w-full"
                />
              </UFormField>
              <UFormField name="billingAddress.lastName" label="Last name" required>
                <UInput
                  v-model="state.billingAddress.lastName"
                  autocomplete="billing family-name"
                  class="w-full"
                />
              </UFormField>
              <UFormField name="billingAddress.company" label="Company" class="sm:col-span-2">
                <UInput
                  v-model="state.billingAddress.company"
                  autocomplete="organization"
                  class="w-full"
                />
              </UFormField>
              <UFormField
                name="billingAddress.address1"
                label="Street address"
                required
                class="sm:col-span-2"
              >
                <UInput
                  v-model="state.billingAddress.address1"
                  autocomplete="billing address-line1"
                  class="w-full"
                />
              </UFormField>
              <UFormField
                name="billingAddress.address2"
                label="Apartment, suite, etc."
                class="sm:col-span-2"
              >
                <UInput
                  v-model="state.billingAddress.address2"
                  autocomplete="billing address-line2"
                  class="w-full"
                />
              </UFormField>
              <UFormField name="billingAddress.city" label="City" required>
                <UInput
                  v-model="state.billingAddress.city"
                  autocomplete="billing address-level2"
                  class="w-full"
                />
              </UFormField>
              <UFormField name="billingAddress.state" label="State / region" required>
                <UInput
                  v-model="state.billingAddress.state"
                  autocomplete="billing address-level1"
                  class="w-full"
                />
              </UFormField>
              <UFormField name="billingAddress.postalCode" label="Postcode" required>
                <UInput
                  v-model="state.billingAddress.postalCode"
                  autocomplete="billing postal-code"
                  class="w-full"
                />
              </UFormField>
              <UFormField name="billingAddress.country" label="Country" required>
                <UInput
                  v-model="state.billingAddress.country"
                  autocomplete="billing country-name"
                  class="w-full"
                />
              </UFormField>
              <UFormField name="billingAddress.phone" label="Phone" required class="sm:col-span-2">
                <UInput
                  v-model="state.billingAddress.phone"
                  type="tel"
                  autocomplete="billing tel"
                  class="w-full"
                />
              </UFormField>
            </div>
          </div>
        </section>

        <UButton
          type="submit"
          :label="submitting ? 'Placing order…' : 'Place order'"
          icon="i-lucide-lock-keyhole"
          size="xl"
          class="w-full justify-center sm:w-auto sm:min-w-56"
          :loading="submitting"
          :disabled="submitting || !cart.items.length"
        />
        <p v-if="submitError" class="text-sm text-red-700" role="alert">{{ submitError }}</p>
      </UForm>

      <aside
        class="border-t border-neutral-200 pt-6 lg:sticky lg:top-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"
      >
        <h2 class="font-oswald text-2xl text-neutral-950">Order summary</h2>
        <ul class="mt-5 divide-y divide-neutral-200">
          <li v-for="item in cart.items" :key="item.id" class="flex gap-3 py-3 first:pt-0">
            <div class="relative size-16 shrink-0 bg-surface-container-low">
              <NuxtImg
                :src="item.image"
                :alt="item.title"
                class="size-full object-cover"
                width="128"
                height="128"
              />
              <span
                class="absolute -right-2 -top-2 grid size-5 place-items-center rounded-full bg-neutral-800 text-[10px] text-white"
                >{{ item.quantity }}</span
              >
            </div>
            <div class="min-w-0 flex-1">
              <p class="line-clamp-2 text-sm font-semibold text-neutral-800">{{ item.title }}</p>
              <p v-if="Object.keys(item.variant).length" class="mt-1 text-xs text-neutral-500">
                {{
                  Object.entries(item.variant)
                    .map(([name, value]) => `${name}: ${value}`)
                    .join(' · ')
                }}
              </p>
            </div>
            <span class="shrink-0 text-sm text-neutral-700">{{
              NumberFunctions.formatCurrency(item.unitPrice * item.quantity, item.currencyCode)
            }}</span>
          </li>
        </ul>
        <div class="mt-4 space-y-3 border-t border-neutral-200 pt-4 text-sm">
          <div class="flex justify-between text-neutral-600">
            <span>Subtotal</span
            ><span>{{ NumberFunctions.formatCurrency(cart.subtotal, currencyCode) }}</span>
          </div>
          <div class="flex justify-between text-neutral-600">
            <span>Shipping</span
            ><span>{{
              shipping ? NumberFunctions.formatCurrency(shipping, currencyCode) : 'Free'
            }}</span>
          </div>
          <div
            class="flex justify-between border-t border-neutral-200 pt-4 text-base font-bold text-neutral-950"
          >
            <span>Total</span><span>{{ NumberFunctions.formatCurrency(total, currencyCode) }}</span>
          </div>
        </div>
        <p class="mt-4 text-xs leading-5 text-neutral-500">
          Orders over {{ NumberFunctions.formatCurrency(500, currencyCode) }} ship free. Taxes, if
          applicable, are confirmed on your invoice.
        </p>
      </aside>
    </div>
  </main>
</template>

<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { submitOrder as submitMockOrder } from '~/services/order.service'
import type { AddressForm, CheckoutForm } from '~/types/ecommerce'

const addressSchema = z.object({
  firstName: z.string().trim().min(1, 'Enter a first name'),
  lastName: z.string().trim().min(1, 'Enter a last name'),
  company: z.string().optional(),
  address1: z.string().trim().min(1, 'Enter a street address'),
  address2: z.string().optional(),
  city: z.string().trim().min(1, 'Enter a city'),
  state: z.string().trim().min(1, 'Enter a state or region'),
  postalCode: z.string().trim().min(1, 'Enter a postcode'),
  country: z.string().trim().min(1, 'Enter a country'),
  phone: z.string().trim().min(6, 'Enter a valid phone number')
})

const schema = z
  .object({
    email: z.email('Enter a valid email address'),
    shippingAddress: addressSchema,
    billingSameAsShipping: z.boolean(),
    billingAddress: addressSchema.optional()
  })
  .superRefine((data, context) => {
    if (!data.billingSameAsShipping && !data.billingAddress) {
      context.addIssue({
        code: 'custom',
        path: ['billingAddress', 'address1'],
        message: 'Enter a billing address'
      })
    }
  })

const cart = useCartStore()
const toast = useToast()
const submitting = ref(false)
const submitError = ref('')
const createEmptyAddress = (): AddressForm => ({
  firstName: '',
  lastName: '',
  company: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
  phone: ''
})
const state = reactive<CheckoutForm>({
  email: '',
  shippingAddress: createEmptyAddress(),
  billingSameAsShipping: true,
  billingAddress: undefined
})

const currencyCode = computed(() => cart.items[0]?.currencyCode ?? 'USD')
const shipping = computed(() => (cart.subtotal === 0 || cart.subtotal >= 500 ? 0 : 18))
const total = computed(() => Math.round((cart.subtotal + shipping.value) * 100) / 100)

function setBillingAddressMode(value: boolean | 'indeterminate') {
  const sameAsShipping = value === true
  state.billingSameAsShipping = sameAsShipping
  state.billingAddress = sameAsShipping ? undefined : createEmptyAddress()
}

async function placeOrder(event: FormSubmitEvent<z.output<typeof schema>>) {
  if (!cart.items.length || submitting.value) return
  submitting.value = true
  submitError.value = ''

  try {
    const order = await submitMockOrder({
      ...event.data,
      items: cart.items.map((item) => ({ ...item, variant: { ...item.variant } })),
      subtotal: cart.subtotal,
      shipping: shipping.value,
      total: total.value
    })
    cart.clearCart()
    await navigateTo({ path: '/success', query: { order: order.id } })
  } catch {
    submitError.value = 'We could not place your order. Please try again.'
    toast.add({ title: 'Order not placed', description: submitError.value, color: 'error' })
  } finally {
    submitting.value = false
  }
}

useSeoMeta({ title: 'Checkout' })
</script>
