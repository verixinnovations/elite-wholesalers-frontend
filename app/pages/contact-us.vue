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
            <UFormField label="First Name" name="firstname">
              <UInput v-model="state.firstname" class="w-full" placeholder="John" />
            </UFormField>

            <UFormField label="Last Name" name="lastname">
              <UInput v-model="state.lastname" class="w-full" placeholder="Doe" />
            </UFormField>
          </div>

          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <UFormField label="Email Address" name="email">
              <UInput v-model="state.email" class="w-full" placeholder="john.doe@example.com" />
            </UFormField>

            <UFormField label="Phone Number" name="phone_number">
              <BasePhoneInput
                v-model="state.phone_number"
                class="w-full"
                placeholder="0400 000 000"
              />
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

    <UModal v-model:open="showSuccessfulModal" :dismissible="true" close title="">
      <template #content>
        <UCard>
          <div class="flex flex-col items-center justify-center gap-y-3 py-4 text-center">
            <UIcon name="i-lucide-mail-check" class="w-12 h-12 text-primary mb-1" />
            <h2 class="font-semibold text-xl">Message Received!</h2>

            <p class="text-gray-500 text-sm max-w-xs">
              Thank you for reaching out to Elite Wholesalers. Our team has received your message
              and will get back to you shortly.
            </p>
            <UButton class="px-8 mt-3" :to="{ name: RouteName.Home }">Back to Home</UButton>
          </div>
        </UCard>
      </template>
    </UModal>
  </UContainer>
</template>

<script setup lang="ts">
import * as zod from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { RouteName } from '~/constants/route-names'
import { useSEO } from '~/utils/seo.utils'
import { UtilService } from '~/services/utils.service'

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

const showSuccessfulModal = ref(false)
const toast = useToast()

const validationSchema = zod.object({
  firstname: zod.string().min(2, 'First name is required'),
  lastname: zod.string().min(2, 'Last name is required'),
  email: zod.string().email('Please enter a valid email address'),
  phone_number: zod.string().optional(),
  message: zod.string().min(10, 'Message must be at least 10 characters long')
})

type Schema = zod.output<typeof validationSchema>

const state = ref<Partial<Schema>>({
  firstname: '',
  lastname: '',
  email: '',
  phone_number: undefined,
  message: ''
})

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

const submitContactForm = async (values: FormSubmitEvent<Schema>) => {
  try {
    const res = await UtilService.sendContactUsMessage(values.data)
    if (res.success) {
      showSuccessfulModal.value = true
      state.value = {
        firstname: '',
        lastname: '',
        email: '',
        phone_number: undefined,
        message: ''
      }
    }
  } catch (error) {
    toast.add({
      title: 'Unable to Send Message',
      description: 'Failed to send message.',
      color: 'error'
    })
  }
}
</script>
