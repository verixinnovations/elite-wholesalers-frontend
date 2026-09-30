<template>
  <footer class="bg-primary-700 border-t border-gray-200 dark:border-gray-800">
    <UContainer class="py-12 md:py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Quick Links -->
        <div>
          <h3 class="text-sm font-semibold text-secondary mb-4 uppercase tracking-wider">
            Quick Links
          </h3>
          <ul class="space-y-3 text-sm">
            <li v-for="link in quickLinks" :key="link.title">
              <ULink :to="link.url" class="footer-text">
                {{ link.title }}
              </ULink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="footer-title">Contact Us</h3>
          <ul class="space-y-3 text-sm">
            <li v-for="info in contactInfo" :key="info.label">
              <span class="font-medium text-neutral-400 mr-2">{{ info.label }}:</span>
              <component
                :is="info.link ? 'a' : 'span'"
                :href="info.link"
                class="text-white"
                :class="{ 'hover:text-primary-500 transition-colors': info.link }"
              >
                {{ info.value }}
              </component>
            </li>
          </ul>
        </div>

        <!-- Locations -->
        <div>
          <h3 class="footer-title">Locations</h3>
          <div class="space-y-6">
            <div v-for="location in locations" :key="location.title">
              <h4 class="text-xs font-semibold text-neutral-400 mb-1">
                {{ location.title }}
              </h4>
              <p class="text-sm text-neutral-50 whitespace-pre-line">
                {{ location.address }}
              </p>
            </div>
          </div>
        </div>

        <!-- Stay Connected -->
        <div>
          <h3 class="footer-title">Stay Connected</h3>
          <div class="flex gap-4">
            <UButton icon="i-mdi-facebook" color="neutral" aria-label="Facebook" />
            <UButton icon="i-mdi-instagram" color="neutral" aria-label="Instagram" />
            <UButton icon="i-line-md-twitter-x" color="neutral" aria-label="Instagram" />
            <UButton icon="i-mdi-youtube" color="neutral" aria-label="Instagram" />
          </div>
        </div>
      </div>
    </UContainer>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const quickLinks = ref([
  { title: 'About Us', url: '/about-us' },
  { title: 'Download Center', url: '/download-center' },
  { title: 'Contact Us', url: '/contact-us' },
  { title: 'About Us', url: '/about-us' },
  { title: 'Terms & Conditions', url: '/terms' }
])

const contactInfo = ref([
  { label: 'Phone', value: '+61 2 9533 7877', type: 'tel', link: 'tel:+61295337877' },
  { label: 'Hours', value: '8:30am - 5pm', type: 'text' },
  { label: 'Days', value: 'Monday - Friday', type: 'text' },
  { label: 'ABN', value: '73 611 475 131', type: 'text' },
  {
    label: 'Email',
    value: 'info@elitewholesalers.com.au',
    type: 'email',
    link: 'mailto:info@elitewholesalers.com.au'
  }
])

const locations = ref([
  {
    title: 'HEAD OFFICE & SHOWROOM',
    address: '2210, 1/9 Street Peakhurst NSW'
  },
  {
    title: 'ADMIN & SALES OFFICE',
    address: '13 Horne St, Elsternwick VIC 3185'
  }
])
</script>

<style scoped lang="scss">
.footer-title {
  color: var(--color-secondary);
  text-transform: uppercase;
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 10px;
}

.footer-text {
  color: white;
}
</style>
