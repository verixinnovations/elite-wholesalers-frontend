import type { Order, OrderStatus, SubmitOrderPayload } from '~/types/ecommerce'

const sampleOrders: Order[] = [
  {
    id: 'EW-10482',
    createdAt: '2026-09-18T10:24:00.000Z',
    items: [],
    subtotal: 684.5,
    shipping: 18,
    total: 702.5,
    status: 'Shipped',
    shippingAddress: {
      firstName: 'Jordan',
      lastName: 'Lee',
      address1: '18 Market Street',
      city: 'Melbourne',
      state: 'VIC',
      postalCode: '3000',
      country: 'Australia',
      phone: '+61 400 000 000'
    }
  },
  {
    id: 'EW-10316',
    createdAt: '2026-09-04T08:10:00.000Z',
    items: [],
    subtotal: 1290,
    shipping: 0,
    total: 1290,
    status: 'Delivered',
    shippingAddress: {
      firstName: 'Jordan',
      lastName: 'Lee',
      address1: '18 Market Street',
      city: 'Melbourne',
      state: 'VIC',
      postalCode: '3000',
      country: 'Australia',
      phone: '+61 400 000 000'
    }
  },
  {
    id: 'EW-10189',
    createdAt: '2026-08-21T14:45:00.000Z',
    items: [],
    subtotal: 338.75,
    shipping: 18,
    total: 356.75,
    status: 'Pending',
    shippingAddress: {
      firstName: 'Jordan',
      lastName: 'Lee',
      address1: '18 Market Street',
      city: 'Melbourne',
      state: 'VIC',
      postalCode: '3000',
      country: 'Australia',
      phone: '+61 400 000 000'
    }
  }
]

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), 450))
}

export async function submitOrder(payload: SubmitOrderPayload): Promise<Order> {
  const status: OrderStatus = 'Pending'
  const order: Order = {
    id: `EW-${Math.floor(10000 + Math.random() * 90000)}`,
    createdAt: new Date().toISOString(),
    items: payload.items.map((item) => ({ ...item, variant: { ...item.variant } })),
    subtotal: payload.subtotal,
    shipping: payload.shipping,
    total: payload.total,
    status,
    shippingAddress: { ...payload.shippingAddress }
  }

  await delay(order)
  sampleOrders.unshift(order)
  return order
}

export async function getUserOrders(): Promise<Order[]> {
  return delay(sampleOrders.map((order) => ({ ...order, items: [...order.items] })))
}
