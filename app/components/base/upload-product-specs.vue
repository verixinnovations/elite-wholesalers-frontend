<template>
  <UButton
    v-if="user?.accountType === AccountType.ADMIN"
    v-bind="$attrs"
    :label="hasProductSpecs ? 'Update Product specs' : 'Add Product Specs'"
    icon="i-lucide-file-up"
    color="primary"
    variant="solid"
    size="lg"
    class="justify-center"
    @click="open()"
  />
</template>

<script setup lang="ts">
import { useAdminStore } from '~/store/admin-store'
import { useAuthStore } from '~/store/auth-store'
import { AccountType } from '~/types/enums'

import type { ProductDataEntity, ProductEntity } from '~/types/product'

const props = defineProps<{
  product: ProductDataEntity | ProductEntity
  hasProductSpecs: boolean
}>()
const toast = useToast()

const adminStore = useAdminStore()
const { user } = storeToRefs(useAuthStore())

const { files, open, reset, onChange } = useFileDialog({
  accept: '.pdf,.doc,.docx,.txt',
  multiple: false
})

onChange(async (selectedFiles) => {
  if (!selectedFiles || selectedFiles.length === 0) return

  const file = selectedFiles[0]
  if (file) {
    await adminStore.uploadProductSpecs(props.product.item_id, file)
  }

  reset()
})
</script>
