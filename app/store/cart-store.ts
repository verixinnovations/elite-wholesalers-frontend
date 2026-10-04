import { Currency } from '~/types/enums'
import type { CartEntity, ProductDataEntity, ProductEntity } from '~/types/product'
import { useAuthStore } from './auth-store'

interface CartStore {
  cartItems: CartEntity[]
}

export const useCartStore = defineStore('CartStore', {
  state: (): CartStore => ({
    cartItems: []
  }),
  getters: {
    subtotal: (state) =>
      state.cartItems.reduce((total, item) => total + item.price.amount * item.quantity, 0),
    itemCount: (state) => state.cartItems.reduce((total, item) => total + item.quantity, 0)
  },
  actions: {
    addToCart(product: ProductEntity | ProductDataEntity, quantity: number) {
      const { isLoggedIn } = storeToRefs(useAuthStore())
      const normalizedQuantity = Math.floor(quantity)
      if (!isLoggedIn.value || normalizedQuantity < 1) return

      const existingItem = this.cartItems.find((item) => item.item_id === product.item_id)
      if (existingItem) {
        existingItem.quantity += normalizedQuantity
        return
      }

      this.cartItems.push({
        product,
        quantity: normalizedQuantity,
        item_id: product.item_id,
        cart_id: crypto.randomUUID(),
        price: {
          amount: product.rate,
          currency: Currency.AUD
        }
      })
    },

    updateQuantity(cartId: string, quantity: number) {
      const item = this.cartItems.find((cartItem) => cartItem.cart_id === cartId)
      if (!item) return
      if (quantity < 1) {
        this.removeFromCart(cartId)
        return
      }
      item.quantity = Math.floor(quantity)
    },

    removeFromCart(cartId: string) {
      this.cartItems = this.cartItems.filter((item) => item.cart_id !== cartId)
    },

    clearCart() {
      this.cartItems = []
    }
  }
})
