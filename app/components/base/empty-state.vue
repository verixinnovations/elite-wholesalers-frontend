<template>
  <UEmpty
    variant="naked"
    icon="i-lucide-bell"
    title="No notifications"
    description="You're all caught up. New notifications will appear here."
    :actions="[
      {
        icon: 'i-lucide-refresh-cw',
        label: 'Refresh',
        color: 'neutral',
        variant: 'subtle'
      }
    ]"
  />
</template>
