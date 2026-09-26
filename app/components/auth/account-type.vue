<template>
  <div class="space-y-5">
    <div class="grid gap-4 sm:grid-cols-2">
      <div
        v-for="option in options"
        :key="option.value"
        type="button"
        class="group cursor-pointer rounded-2xl border p-5 text-left transition-colors"
        :class="
          modelValue === option.value
            ? 'border-primary-500 bg-primary-50'
            : 'border-zinc-200 bg-white hover:border-primary-300'
        "
        @click="select(option.value)"
      >
        <UIcon
          :name="option.icon"
          class="mb-8 size-7"
          :class="modelValue === option.value ? 'text-primary' : 'text-muted'"
        />
        <span
          class="block font-semibold"
          :class="modelValue === option.value ? 'text-primary' : 'text-muted'"
          >{{ option.label }}</span
        >
        <span class="mt-2 block text-sm leading-relaxed text-muted">{{ option.description }}</span>
      </div>
    </div>

    <UButton
      label="Continue"
      trailing
      block
      size="xl"
      :disabled="!modelValue"
      @click="$emit('continue')"
    />
  </div>
</template>

<script setup lang="ts">
import { AccountType } from '~/types/enums'

const accountType = defineModel<AccountType | null>({ default: null })

const emit = defineEmits(['continue'])
const options = [
  {
    value: AccountType.TRADER,
    label: 'I am a Trader',
    description: 'Source products for a shop, company, or growing retail operation.',
    icon: 'i-lucide-building-2'
  },
  {
    value: AccountType.INDIVIDUAL,
    label: 'I am an Individual',
    description: 'Join the marketplace as an independent buyer.',
    icon: 'i-lucide-user-round'
  }
]

function select(value: AccountType) {
  accountType.value = value
}
</script>
