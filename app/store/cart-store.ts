import { defineStore } from 'pinia'
import { Currency } from '~/types/enums'
import type { CartEntity, ProductDataEntity, ProductEntity } from '~/types/product'
import { useAuthStore } from './auth-store'
import { CartService } from '~/services/cart.service'

interface CartStore {
  cartItems: CartEntity[]
  isLoading: boolean
}

export const useCartStore = defineStore('CartStore', {
  state: (): CartStore => ({
    cartItems: [],
    isLoading: false
  }),
  getters: {
    subtotal: (state) =>
      state.cartItems.reduce((total, item) => total + (item.price?.amount || 0) * item.quantity, 0),
    itemCount: (state) => state.cartItems.reduce((total, item) => total + item.quantity, 0)
  },
  actions: {
    // 1. Fetch user cart on app load or login
    async fetchCart() {
      const { isLoggedIn } = storeToRefs(useAuthStore())
      if (!isLoggedIn.value) return

      this.isLoading = true
      try {
        const res = await CartService.getUserCart()
        if (res.success) {
          this.cartItems = res.data
        }
      } catch (error) {
        console.error('Failed to fetch user cart:', error)
      } finally {
        this.isLoading = false
      }
    },

    async addToCart(product: ProductEntity | ProductDataEntity, quantity: number = 1) {
      const toast = useToast()
      const { isLoggedIn } = storeToRefs(useAuthStore())
      const normalizedQuantity = Math.floor(quantity)

      if (!isLoggedIn.value || normalizedQuantity < 1) return

      const existingItem = this.cartItems.find((item) => item.itemId === product.item_id)

      const payloadPrice = product.price

      if (existingItem) {
        existingItem.quantity += normalizedQuantity
        this.syncUpdateQuantity(existingItem.cartId, existingItem.quantity)
        return
      }

      const tempCartId = crypto.randomUUID()
      const newItem: CartEntity = {
        product,
        quantity: normalizedQuantity,
        itemId: product.item_id,
        total: payloadPrice.amount * normalizedQuantity,
        cartId: tempCartId,
        price: payloadPrice
      }

      this.cartItems.push(newItem)
      toast.add({ title: `${product.name || 'Item'} added to cart!` })

      this.backgroundAddApiCall(
        {
          item_id: product.item_id,
          quantity: normalizedQuantity,
          price: payloadPrice
        },
        tempCartId
      )
    },

    async backgroundAddApiCall(
      data: {
        item_id: string
        quantity: number
        price: { amount: number; currency: `${Currency}` }
      },
      tempCartId: string
    ) {
      try {
        const res = await CartService.createUserCart(data)
        // If backend returns the real database cartId, swap it out
        if (res && res.data.cartId) {
          const index = this.cartItems.findIndex((i) => i.cartId === tempCartId)
          if (index !== -1) {
            this.cartItems[index] = res.data
          }
        }
      } catch (error) {
        console.error('Background add sync failed:', error)
      }
    },

    // 3. Update Quantity
    updateQuantity(cartId: string, quantity: number) {
      const item = this.cartItems.find((cartItem) => cartItem.cartId === cartId)
      if (!item) return

      if (quantity < 1) {
        this.removeFromCart(cartId)
        return
      }

      item.quantity = Math.floor(quantity)
      this.syncUpdateQuantity(cartId, item.quantity)
    },

    async syncUpdateQuantity(cartId: string, quantity: number) {
      try {
        await CartService.updateUserCart(cartId, { quantity })
      } catch (error) {
        console.error('Background quantity sync failed:', error)
      }
    },

    // 4. Remove Single Item
    removeFromCart(cartId: string) {
      this.cartItems = this.cartItems.filter((item) => item.cartId !== cartId)
      this.backgroundRemoveApiCall(cartId)
    },

    async backgroundRemoveApiCall(cartId: string) {
      try {
        await CartService.removeCart(cartId)
      } catch (error) {
        console.error('Background remove sync failed:', error)
      }
    },

    // 5. Clear Entire Cart
    clearCart() {
      this.cartItems = []
      CartService.deleteCart().catch((error) =>
        console.error('Background clear sync failed:', error)
      )
    },

    async checkout() {
      try {
        const res = await CartService.initializeCheckout()
        if (res.success && res.data.payment_url) {
          this.cartItems = []
          return res.data.payment_url
        }
      } catch (error) {
        console.error('Checkout initialization failed:', error)
        throw error
      }
    }
  },
  persist: true
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}
