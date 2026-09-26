<template>
  <RouterLink :to="{ name: RouteName.Home }">
    <NuxtImg src="/logo.png" class="h-10" />
  </RouterLink>
</template>

<script setup lang="ts">
import { RouteName } from '~/constants/route-names'
</script>
