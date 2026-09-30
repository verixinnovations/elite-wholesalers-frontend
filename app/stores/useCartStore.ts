import { defineStore } from 'pinia'
import type { CartItem, Product } from '~/types/ecommerce'

function variantKey(variant: Record<string, string>) {
  return JSON.stringify(
    Object.fromEntries(Object.entries(variant).sort(([left], [right]) => left.localeCompare(right)))
  )
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[]
  }),

  getters: {
    totalItems: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    subtotal: (state) =>
      state.items.reduce(
        (total, item) => total + Math.round(item.unitPrice * 100) * item.quantity,
        0
      ) / 100
  },

  actions: {
    addToCart(product: Product, quantity = 1, variant: Record<string, string> = {}) {
      if (!product.inStock || product.stockQuantity < 1) return false

      const amount = Math.max(1, Math.floor(quantity))
      const id = `${product.id}:${variantKey(variant)}`
      const existing = this.items.find((item) => item.id === id)
      const maxQuantity = product.stockQuantity

      if (existing) {
        existing.quantity = Math.min(existing.quantity + amount, maxQuantity)
      } else {
        this.items.push({
          id,
          productId: product.id,
          title: product.title,
          image: product.images[0] ?? '',
          unitPrice: product.price,
          currencyCode: product.currencyCode,
          quantity: Math.min(amount, maxQuantity),
          maxQuantity,
          variant: { ...variant }
        })
      }

      return true
    },

    removeFromCart(itemId: string) {
      this.items = this.items.filter((item) => item.id !== itemId)
    },

    updateQuantity(itemId: string, quantity: number) {
      const item = this.items.find((entry) => entry.id === itemId)
      if (!item) return
      if (!Number.isFinite(quantity) || quantity <= 0) {
        this.removeFromCart(itemId)
        return
      }

      item.quantity = Math.min(Math.floor(quantity), item.maxQuantity ?? Number.MAX_SAFE_INTEGER)
    },

    clearCart() {
      this.items = []
    }
  },

  persist: {
    pick: ['items'],
    storage: piniaPluginPersistedstate.localStorage()
  }
})
