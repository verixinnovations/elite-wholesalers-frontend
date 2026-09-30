<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'dashboard-auth'
})

await navigateTo('/dashboard/orders', { replace: true })
</script>
