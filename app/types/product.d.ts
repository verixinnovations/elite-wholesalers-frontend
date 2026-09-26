import type { UserEntity } from './auth'

interface ProductCategoryEntity {
  id: string
  name: string
  image: string
  totalProducts: number
  slug: string
  description: string
  isActive: boolean
  inStockCount: number
  startingPrice: number
  tags: string[]
}

interface ProductParams {
  op?: 'search' | 'premium' | 'latest' | 'free' | 'premiumFirst' | 'similar.'
  page?: number
  size?: number
  search?: string
  perPage?: number
  page?: number
  sort?: string
  postId?: number
  sort?: string
  pendingApproval?: boolean
  archived?: boolean
  detailed: 1
}

interface ProductsMeta {
  current_page: number
  from: number
  last_page: number
  per_page: number
  to: number
  total: number
}

interface Picture {
  id: number
  post_id: number
  mime_type: string
  url: string
}

interface SavedProductEntity {
  id: number
  post_id: number
  post: ProductEntity
  saved_at_formatted: string
}

export interface ProductCategoryFields {
  id: number
  belongs_to: string
  name: string
  type: 'select' | 'text' | 'number' | 'radio' | 'checkbox_multiple' | 'date' | 'checkbox'
  max: number | null
  default_value: string | number
  required: number
  use_as_filter: number
  help: string
  active: string
}

interface Category extends ProductCategoryEntity {
  parent: ProductCategoryEntity
}

export interface ProductTaxCategory {
  tax_category_code: string
  tax_category_name: string
  description: string
}

export interface ProductEntity {
  item_id: string
  name: string
  item_name: string
  category_id: string
  category_name: string
  unit: string
  status: string
  source: string
  is_combo_product: boolean
  is_linked_with_zohocrm: boolean
  zcrm_product_id: string
  description: string
  brand: string
  manufacturer: string
  rate: number
  tax_id: string
  tax_name: string
  tax_percentage: number
  purchase_account_id: string
  purchase_account_name: string
  account_id: string
  account_name: string
  purchase_description: string
  purchase_rate: number
  can_be_sold: boolean
  can_be_purchased: boolean
  track_inventory: boolean
  item_type: string
  product_type: string
  is_taxable: boolean
  tax_exemption_id: string
  tax_exemption_code: string
  stock_on_hand: number
  available_for_sale: number
  has_attachment: boolean
  is_returnable: boolean
  available_stock: number
  actual_available_stock: number
  sku: string
  upc: string
  ean: string
  isbn: string
  part_number: string
  track_serial_number: boolean
  is_storage_location_enabled: boolean
  reorder_level: string
  image_name: string
  image_type: string
  image_document_id: string
  created_time: string
  last_modified_time: string
  purpose_of_use: string
  show_in_storefront: boolean
  vendor_name: string
  length: string
  width: string
  height: string
  weight: string
  weight_unit: string
  dimension_unit: string
  dimensions_with_unit: string
  weight_with_unit: string
  tax_category_code: string
  tax_category_name: string
  tags: string[]
  product_tax_category: ProductTaxCategory
  image_url: string
}
