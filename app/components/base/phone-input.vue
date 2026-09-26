<template>
  <VueTelInput
    mode="international"
    default-country="AU"
    valid-characters-only
    invalidMsg="Enter a valid phone number"
    :input-options="{
      type: 'tel'
    }"
    class="rounded-4xl! py-0.5! px-1!"
    :preferred-countries="['AU', 'US', 'NG']"
    @validate="validatePhoneNumber"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { VueTelInput } from 'vue-tel-input'
import 'vue-tel-input/vue-tel-input.css'

const phone = defineModel<string>()

const validatePhoneNumber = (value: any) => {
  if (value.valid) {
    phone.value = value.number
  } else {
    phone.value = ''
  }
}
</script>

<style scoped></style>
