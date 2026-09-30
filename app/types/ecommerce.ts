export interface ProductVariant {
  name: string
  options: string[]
}

export interface Product {
  id: string
  slug: string
  categoryId: string
  title: string
  description: string
  price: number
  currencyCode: string
  images: string[]
  tags: string[]
  inStock: boolean
  stockQuantity: number
  variants?: ProductVariant[]
}

export interface Category {
  id: string
  name: string
  image: string
  productCount: number
}

export interface CartItem {
  id: string
  productId: string
  title: string
  image: string
  unitPrice: number
  currencyCode: string
  quantity: number
  maxQuantity?: number
  variant: Record<string, string>
}

export interface AddressForm {
  firstName: string
  lastName: string
  company?: string
  address1: string
  address2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone: string
}

export interface CheckoutForm {
  email: string
  shippingAddress: AddressForm
  billingSameAsShipping: boolean
  billingAddress?: AddressForm
}

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'

export interface Order {
  id: string
  createdAt: string
  items: CartItem[]
  subtotal: number
  shipping: number
  total: number
  status: OrderStatus
  shippingAddress: AddressForm
}

export interface SubmitOrderPayload extends CheckoutForm {
  items: CartItem[]
  subtotal: number
  shipping: number
  total: number
}
