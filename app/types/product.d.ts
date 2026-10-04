import type { Currency } from './enums'

export interface ProductTaxCategory {
  tax_category_code: string
  tax_category_name: string
  description: string
}

export interface ProductDataEntity {
  group_id: string
  group_name: string
  item_id: string
  has_attribute_options: boolean
  name: string
  sku: string
  brand: string
  manufacturer: string
  category_id: string
  category_name: string
  purpose_of_use: string
  item_code: Record<string, unknown>
  image_name: string
  image_type: string
  status: string
  source: string
  is_linked_with_zohocrm: boolean
  zcrm_product_id: string
  crm_owner_id: string
  unit: string
  unit_id: string
  description: string
  rate: number
  account_id: string
  account_name: string
  tax_id: string
  tax_name: string
  tax_percentage: number
  tax_type: string
  tax_status: string
  tax_groups_details: string
  tax_country_code: string
  tax_information: string
  purchase_tax_information: string
  is_default_tax_applied: boolean
  is_taxable: boolean
  tax_exemption_id: string
  tax_exemption_code: string
  associated_template_id: string
  documents: ProductDataDocument[]
  purchase_description: string
  pricebook_rate: number
  pricing_scheme: string
  price_brackets: ProductPriceBracket[]
  default_price_brackets: ProductDefaultPriceBracket[]
  sales_rate: number
  purchase_rate: number
  label_rate: string
  sales_margin: string
  purchase_account_id: string
  purchase_account_name: string
  inventory_account_id: string
  inventory_account_name: string
  created_time: string
  offline_created_date_with_time: string
  last_modified_time: string
  can_be_sold: boolean
  can_be_purchased: boolean
  track_inventory: boolean
  item_type: string
  product_type: string
  is_returnable: boolean
  product_tax_category: ProductTaxCategory
  reorder_level: string
  minimum_order_quantity: string
  maximum_order_quantity: string
  initial_stock: number
  initial_stock_rate: number
  total_initial_stock: number
  vendor_id: string
  vendor_name: string
  stock_on_hand: number
  asset_value: string
  available_stock: number
  actual_available_stock: number
  committed_stock: number
  actual_committed_stock: number
  available_for_sale_stock: number
  actual_available_for_sale_stock: number
  include_in_tax_return: boolean
  lock_details: ProductLockDetails
  locked_actions: unknown[]
  locked_fields: Record<string, unknown>
  lock_detail: ProductLockDetail
  custom_fields: ProductCustomField[]
  custom_field_hash: Record<string, string>
  track_serial_number: boolean
  is_fulfillable: boolean
  upc: string
  ean: string
  isbn: string
  part_number: string
  is_combo_product: boolean
  combo_type: string
  image_sync_in_progress: boolean
  sales_channels: ProductSalesChannel[]
  locations: ProductLocation[]
  preferred_vendors: ProductPreferredVendor[]
  package_details: ProductPackageDetails
  is_modifier_item: boolean
  integration_references: unknown[]
  has_variant: boolean
  price: {
    amount: number
    currency: Currency
  }
}

export interface ProductDataResponse {
  meta: {
    success: boolean
    statusCode: number
    statusMessage: string
  }
  data: ProductDataEntity
  timestamp: string
}

export interface ProductDataDocument extends DocumentItem {
  source_formatted: string
  uploaded_by: string
}

export interface ProductPriceBracket {
  start_quantity: number
  end_quantity: number
  pricebook_rate: number
}

export type ProductDefaultPriceBracket = ProductPriceBracket

export interface ProductLockDetails {
  can_lock: boolean
}

export interface ProductLockDetail extends ProductLockDetails {
  custom_locks: unknown[]
  system_locks: unknown[]
}

export interface ProductCustomField {
  field_id: string
  customfield_id: string
  show_in_store: boolean
  show_in_portal: boolean
  is_active: boolean
  index: number
  label: string
  show_on_pdf: boolean
  is_custom_field: boolean
  edit_on_portal: boolean
  edit_on_store: boolean
  api_name: string
  show_in_all_pdf: boolean
  value_formatted: string
  search_entity: string
  data_type: string
  placeholder: string
  value: string
  is_dependent_field: boolean
  is_rich_text_supported?: boolean
}

export interface ProductSalesChannel {
  integration_id: number
  can_sync_item_images: boolean
  is_image_sync_in_progress: boolean
  channel_product_id: string
  product_mapping_id: number
  account_identifier: string
  name: string
  formatted_name: string
  status: string
  channel_name: string
  channel_sku: string
  channel_reference: string
  channel_group_id: string
}

export interface ProductLocation {
  location_id: string
  location_name: string
  status: string
  is_primary: boolean
  is_primary_location: boolean
  is_item_mapped: boolean
  location_stock_on_hand: number
  initial_stock: number
  initial_stock_rate: number
  location_asset_value: number
  location_available_stock: number
  location_actual_available_stock: number
  location_committed_stock: number
  location_actual_committed_stock: number
  location_available_for_sale_stock: number
  location_actual_available_for_sale_stock: number
  location_quantity_in_transit: number
  serial_numbers: unknown[]
  serial_number_details: unknown[]
  is_general_location: boolean
  sales_channels: unknown[]
}

export interface ProductPreferredVendor {
  vendor_id: string
  vendor_name: string
  is_primary: boolean
  item_stock: number
  item_price: number
  last_modified_time: string
}

export interface ProductPackageDetails {
  length: string
  width: string
  height: string
  weight: string
  weight_unit: string
  dimension_unit: string
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
  price: {
    amount: number
    currency: Currency
  }
}

export type ProductVariant = Omit<ProductEntity, 'variants'> & {
  variant_id: string
}

export interface ProductCategoryEntity {
  created_time: string
  last_modified_time: string
  visibility: boolean
  documents: DocumentItem[]
  custom_fields: any[] // Or define a specific type if you have custom field data
  description: string
  show_in_menu: boolean
  ondc_category_type: string
  document_id: string
  url: string
  parent_category_id: string
  sibling_order: number
  depth: number
  category_id: string
  has_active_items: boolean
  name: string
  ondc_category_type_formatted: string
  image: string | null
}

export interface CartEntity {
  cart_id: string
  item_id: string
  product: ProductEntity | ProductDataEntity
  quantity: number
  price: {
    amount: number
    currency: `${Currency}`
  }
}

export interface DocumentItem {
  uploaded_by_id: string
  alter_text: string
  uploaded_on_date_formatted: string
  can_send_in_mail?: boolean
  is_custom_field_document?: boolean
  file_name?: string
  attachment_order?: number
  source?: string
  document_id?: string
  file_size?: string
  file_type?: string
  file_size_formatted?: string
  uploaded_on?: string
}

export interface ChannelPreferences {
  hide_price: boolean
  hide_add_to_cart: boolean
  show_add_to_quote: boolean
}

export interface Attributes {
  attribute_option_id1?: string
  attribute_option_id2?: string
  attribute_option_id3?: string
  attribute_option_name1?: string
  attribute_option_data1?: string
  attribute_option_name2?: string
  attribute_option_data2?: string
  attribute_option_name3?: string
  attribute_option_data3?: string
  attribute_id1?: string
  attribute_id2?: string
  attribute_id3?: string
  attribute_name1?: string
  attribute_name2?: string
  attribute_name3?: string
  attribute_type1?: string
  attribute_type2?: string
  attribute_type3?: string
}
