<template>
  <UContainer class="py-12 space-y-12">
    <!-- Header -->
    <div class="text-center max-w-3xl mx-auto space-y-4">
      <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
        CONTACT US
      </h1>
      <div class="bg-primary-500 mx-auto h-1 w-20 rounded-full"></div>
      <p class="mt-4 text-gray-500 dark:text-gray-400">
        Have questions about our products, pricing, or your account? Our team is ready to help.
      </p>
    </div>

    <div class="grid grid-cols-1 gap-12 lg:grid-cols-2 items-start">
      <!-- Contact Information Sidebar -->
      <div class="space-y-8">
        <UCard class="border-primary-500 bg-gray-50 border-l-4 dark:bg-gray-900">
          <div class="space-y-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">Get in Touch</h3>

            <div class="space-y-6">
              <div
                v-for="(info, index) in contactDetails"
                :key="index"
                class="flex items-start gap-4"
              >
                <UIcon :name="info.icon" class="text-primary-500 mt-1 h-6 w-6 flex-shrink-0" />
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">{{ info.title }}</h4>
                  <p class="whitespace-pre-line text-sm text-gray-600 dark:text-gray-400">
                    {{ info.details }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Contact Form -->
      <UCard>
        <h3 class="mb-6 text-xl font-bold text-gray-900 dark:text-white">Send us a Message</h3>
        <UForm
          v-slot="formState"
          :state="state"
          :schema="validationSchema"
          class="flex w-full flex-col gap-4"
          @submit="submitContactForm"
        >
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <UFormField label="First Name" name="firstName">
              <UInput v-model="state.firstName" class="w-full" placeholder="John" />
            </UFormField>

            <UFormField label="Last Name" name="lastName">
              <UInput v-model="state.lastName" class="w-full" placeholder="Doe" />
            </UFormField>
          </div>

          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <UFormField label="Email Address" name="email">
              <UInput v-model="state.email" class="w-full" placeholder="john.doe@example.com" />
            </UFormField>

            <UFormField label="Phone Number" name="phone">
              <UInput v-model="state.phone" class="w-full" placeholder="0400 000 000" />
            </UFormField>
          </div>

          <UFormField label="Message" name="message">
            <UTextarea
              v-model="state.message"
              :rows="5"
              class="w-full"
              placeholder="How can we help you?"
            />
          </UFormField>

          <UButton
            type="submit"
            class="disabled:bg-primary-400 mt-4 flex items-center justify-center rounded-full"
            block
            size="xl"
            font="font-bold"
            label="Send Message"
            :loading="formState?.loading"
            :disabled="formState?.errors.length !== 0 || formState?.loading"
          />
        </UForm>
      </UCard>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import * as zod from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { RouteName } from '~/constants/route-names'
import { useSEO } from '~/utils/seo.utils'
// import { useToast } from '#imports' // Assuming you have Nuxt UI toast available for success feedback

definePageMeta({
  name: 'contact',
  pageTitle: 'Contact Us',
  pageLabel: 'Get in touch with Elite Wholesalers'
})

useSEO({
  title: 'Contact Us | Elite Wholesalers',
  description:
    'Reach out to Elite Wholesalers for inquiries, technical support, and wholesale account requests.',
  keywords: 'contact, wholesale, support, elite wholesalers'
})

// Zod Validation Schema
const validationSchema = zod.object({
  firstName: zod.string().min(2, 'First name is required'),
  lastName: zod.string().min(2, 'Last name is required'),
  email: zod.string().email('Please enter a valid email address'),
  phone: zod.string().optional(),
  message: zod.string().min(10, 'Message must be at least 10 characters long')
})

type Schema = zod.output<typeof validationSchema>

// Reactive Form State
const state = ref<Partial<Schema>>({
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  phone: undefined,
  message: undefined
})

// Contact Info Data Object
const contactDetails = [
  {
    icon: 'i-heroicons-phone',
    title: 'Phone',
    details: '0295337877\n+61 2 9533 7877'
  },
  {
    icon: 'i-heroicons-envelope',
    title: 'Email',
    details: 'info@elitewholesalers.com.au'
  },
  {
    icon: 'i-heroicons-clock',
    title: 'Business Hours',
    details: 'Monday - Friday\n8:30am - 5:00pm'
  },
  {
    icon: 'i-heroicons-building-office-2',
    title: 'Head Office & Showroom',
    details: '2210, 1/9 Street\nPeakhurst NSW'
  },
  {
    icon: 'i-heroicons-building-office',
    title: 'Admin & Sales Office',
    details: '13 Horne St,\nElsternwick VIC 3185'
  }
]

// Submit Handler
const submitContactForm = async (values: FormSubmitEvent<Schema>) => {
  try {
    // Await your API call here
    // await $fetch('/api/contact', { method: 'POST', body: values.data })
    console.log('Form submitted:', values.data)

    // toast.add({ title: 'Message Sent', description: 'We will get back to you shortly.', color: 'green' })

    // Reset form after submission
    state.value = {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      phone: undefined,
      message: undefined
    }
  } catch (error) {
    console.error('Submission failed', error)
    // toast.add({ title: 'Error', description: 'Failed to send message.', color: 'red' })
  }
}
</script>
