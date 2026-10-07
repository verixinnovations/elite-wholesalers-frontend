<template>
  <RouterLink :to="{ name: RouteName.Home }">
    <NuxtImg :src="variant" class="h-10 shrink-0 block" />
  </RouterLink>
</template>

<script setup lang="ts">
import { RouteName } from '~/constants/route-names'

const props = defineProps<{ variant?: 'brand' | 'white' | 'black' | 'small' }>()
const variant = computed(() => {
  if (props.variant === 'white') return '/logo-main.png'
  else if (props.variant === 'black') return '/logo-black.png'
  else if (props.variant === 'small') return '/logo-sm.png'
  else return '/logo-brand.png'
})
</script>
