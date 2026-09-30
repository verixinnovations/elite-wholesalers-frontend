import type { Category, Product } from '~/types/ecommerce'
import productCatalog from '~/data/products.json'

const catalog = productCatalog.products

const categoryLabels: Record<string, string> = {
  cat_sports: 'Sporting goods',
  cat_clothing: 'Clothing',
  cat_health: 'Health and wellness',
  cat_home: 'Home and living',
  cat_electronics: 'Electronics'
}

function toStorefrontProduct(record: (typeof catalog)[number]): Product {
  return {
    id: record.id,
    slug: record.slug,
    categoryId: record.category_id,
    title: record.title,
    description: record.description,
    price: record.price,
    currencyCode: record.currency_code,
    images: [...new Set([...(record.pictures ?? []), record.picture].filter(Boolean))],
    tags: record.tags ?? [],
    inStock: record.in_stock,
    stockQuantity: record.quantity,
    variants:
      record.category_id === 'cat_clothing'
        ? [
            { name: 'Size', options: ['S', 'M', 'L', 'XL'] },
            { name: 'Color', options: ['Black', 'White', 'Navy'] }
          ]
        : undefined
  }
}

function visibleCatalog() {
  return catalog.filter((record) => record.show && record.archived_at === null)
}

function mockDelay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), 120))
}

export async function getProducts(): Promise<Product[]> {
  return mockDelay(visibleCatalog().map(toStorefrontProduct))
}

export async function getProductById(id: string): Promise<Product | null> {
  const record = visibleCatalog().find((product) => product.id === id || product.slug === id)
  return mockDelay(record ? toStorefrontProduct(record) : null)
}

export async function getCategories(): Promise<Category[]> {
  const products = visibleCatalog()
  const categories = new Map<string, Category>()

  for (const product of products) {
    const existing = categories.get(product.category_id)
    if (existing) {
      existing.productCount += 1
      continue
    }

    categories.set(product.category_id, {
      id: product.category_id,
      name: categoryLabels[product.category_id] ?? product.category_id.replace(/^cat_/, ''),
      image: product.picture,
      productCount: 1
    })
  }

  return mockDelay([...categories.values()])
}
