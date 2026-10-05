export interface SalesOrder {
  salesorder_id: string
  zcrm_potential_id: string
  zcrm_potential_name: string
  customer_name: string
  customer_id: string
  email: string
  delivery_date: string
  company_name: string
  color_code: string
  current_sub_status_id: string
  current_sub_status: string
  pickup_location_id: string
  salesorder_number: string
  reference_number: string
  date: string
  shipment_date: string
  shipment_days: string | number
  due_by_days: string | number
  due_in_days: string | number
  currency_id: string
  source: string
  currency_code: string
  total: number
  bcy_total: number
  total_invoiced_amount: number
  created_time: string
  last_modified_time: string
  is_emailed: boolean
  quantity: number
  quantity_invoiced: number
  quantity_packed: number
  quantity_shipped: number
  order_status: string
  invoiced_status: string
  paid_status: string
  shipped_status: string
  status: string
  order_fulfillment_type: string
  is_drop_shipment: boolean
  is_backorder: boolean
  is_manually_fulfilled: boolean
  sales_channel: string
  sales_channel_formatted: string
  salesperson_name: string
  branch_id: string
  location_id: string
  location_name: string
  has_attachment: boolean
  tags: unknown[]
  balance: number
  delivery_method: string
  delivery_method_id: string
  is_viewed_in_mail: boolean
  mail_first_viewed_time: string
  mail_last_viewed_time: string
  is_scheduled_for_quick_shipment_create: boolean
}

export interface SalesOrderItemEntity {
  salesorder_id: string
  is_viewed_in_mail: boolean
  mail_first_viewed_time: string
  mail_last_viewed_time: string
  coupon_id: string
  coupon_code: string
  is_automatic_coupon_applied: boolean
  documents: any[]
  zcrm_potential_id: string
  zcrm_potential_name: string
  salesorder_number: string
  date: string
  offline_created_date_with_time: string
  tracking_url: string
  has_discount: boolean
  status: string
  color_code: string
  current_sub_status_id: string
  current_sub_status: string
  sub_statuses: any[]
  shipment_date: string
  reference_number: string
  customer_id: string
  customer_name: string
  contact_persons: any[]
  contact_persons_associated: any[]
  contact_person_details: ContactPersonDetail[]
  source: string
  contact_category: string
  is_taxable: boolean
  tax_id: string
  tax_name: string
  tax_percentage: number
  exceptions: any[]
  has_shipping_address: boolean
  currency_id: string
  currency_code: string
  currency_symbol: string
  exchange_rate: number
  is_discount_before_tax: boolean
  discount_type: string
  estimate_id: string
  delivery_method: string
  delivery_method_id: string
  is_inclusive_tax: boolean
  tax_rounding: string
  order_status: string
  invoiced_status: string
  paid_status: string
  shipped_status: string
  sales_channel: string
  sales_channel_formatted: string
  account_identifier: string
  integration_id: string
  is_dropshipped: boolean
  is_backordered: boolean
  is_manually_fulfilled: boolean
  can_manually_fulfill: boolean
  has_qty_cancelled: boolean
  shipping_details: Record<string, any>
  created_by_email: string
  created_by_name: string
  branch_id: string
  branch_name: string
  location_id: string
  location_name: string
  total_quantity: number
  has_digital_files: boolean
  has_sent_download_link: boolean
  line_items: LineItem[]
  entity_tags: string
  submitter_id: string
  approver_id: string
  submitted_date: string
  submitted_by: string
  submitted_by_name: string
  submitted_by_email: string
  submitted_by_photo_url: string
  price_precision: number
  is_emailed: boolean
  has_unconfirmed_line_item: boolean
  picklists: any[]
  purchaseorders: any[]
  locations: LocationRef[]
  billing_address_id: string
  billing_address: AddressDetails
  shipping_address_id: string
  shipping_address: AddressDetails
  is_test_order: boolean
  notes: string
  terms: string
  payment_terms: number
  payment_terms_label: string
  payment_terms_id: string
  custom_fields: any[]
  custom_field_hash: Record<string, any>
  template_id: string
  template_name: string
  page_width: string
  page_height: string
  orientation: string
  template_type: string
  created_time: string
  last_modified_time: string
  created_by_id: string
  created_date: string
  last_modified_by_id: string
  attachment_name: string
  can_send_in_mail: boolean
  salesperson_id: string
  salesperson_name: string
  merchant_id: string
  merchant_name: string
  pickup_location_id: string
  beat_id: string
  beat_number: string
  journey_plan_id: string
  discount: number
  discount_applied_on_amount: number
  is_adv_tracking_in_package: boolean
  shipping_charge_taxes: any[]
  lock_details: { can_lock: boolean }
  locked_actions: any[]
  lock_detail: {
    can_lock: boolean
    custom_locks: any[]
    system_locks: any[]
  }
  shipping_charge_tax_id: string
  shipping_charge_tax_name: string
  shipping_charge_tax_type: string
  shipping_charge_tax_percentage: string | number
  shipping_charge_tax_exemption_id: string
  shipping_charge_tax_exemption_code: string
  shipping_charge_tax: string | number
  bcy_shipping_charge_tax: string | number
  shipping_charge_exclusive_of_tax: number
  shipping_charge_inclusive_of_tax: number
  shipping_charge_tax_formatted: string
  shipping_charge_exclusive_of_tax_formatted: string
  shipping_charge_inclusive_of_tax_formatted: string
  shipping_charge: number
  bcy_shipping_charge: number
  adjustment: number
  bcy_adjustment: number
  adjustment_description: string
  roundoff_value: number
  transaction_rounding_type: string
  rounding_mode: string
  bcy_rounding_mode: string
  sub_total: number
  bcy_sub_total: number
  sub_total_inclusive_of_tax: number
  sub_total_exclusive_of_discount: number
  discount_total: number
  bcy_discount_total: number
  discount_percent: number
  tax_total: number
  bcy_tax_total: number
  total: number
  computation_type: string
  bcy_total: number
  taxes: TaxSummary[]
  tds_calculation_type: string
  packages: any[]
  so_cycle_preference: {
    is_feature_enabled: boolean
    socycle_status: string
    can_create_invoice: boolean
    can_create_package: boolean
    can_create_shipment: boolean
    shipment_preference: {
      default_carrier: string
      send_notification: boolean
      deliver_shipments: boolean
    }
    invoice_preference: {
      mark_as_sent: boolean
      record_payment: boolean
      payment_mode_id: string
      payment_account_id: string
    }
  }
  invoices: InvoiceRef[]
  can_show_kit_return: boolean
  is_kit_partial_return: boolean
  salesreturns: any[]
  payments: any[]
  in_process_payments: any[]
  creditnotes: any[]
  refunds: any[]
  contact: ContactInfo
  balance: number
  approvers_list: any[]
  is_scheduled_for_quick_shipment_create: boolean
  allow_quick_shipment: boolean
  profit_margin_percentage: number
  profit_margin_amount: string
}

export interface ContactPersonDetail {
  phone: string
  mobile: string
  last_name: string
  contact_person_id: string
  first_name: string
  email: string
}

export interface LineItemTax {
  tax_id: string
  tax_name: string
  tax_amount: number
  tax_percentage: number
  tax_specific_type: string
}

export interface ProductTaxCategory {
  tax_category_code: string
  tax_category_name: string
  description: string
  master_tax_category_code: string
}

export interface PackageDetails {
  length: string | number
  width: string | number
  height: string | number
  weight: string | number
  weight_unit: string
  dimension_unit: string
}

export interface LineItem {
  line_item_id: string
  variant_id: string
  track_serial_number: boolean
  item_id: string
  is_returnable: boolean
  product_id: string
  line_item_category: string
  attribute_name1: string
  attribute_name2: string
  attribute_name3: string
  attribute_option_name1: string
  attribute_option_name2: string
  attribute_option_name3: string
  attribute_option_data1: string
  attribute_option_data2: string
  attribute_option_data3: string
  is_combo_product: boolean
  combo_type: string
  sku: string
  name: string
  group_name: string
  description: string
  item_order: number
  bcy_rate: number
  rate: number
  sales_rate: number
  quantity: number
  quantity_manuallyfulfilled: number
  unit: string
  pricebook_id: string
  header_id: string
  header_name: string
  discount_amount: number
  discount: number
  discounts: any[]
  tax_id: string
  tax_name: string
  tax_type: string
  tax_percentage: number
  line_item_taxes: LineItemTax[]
  tax_category_code: string
  tax_category_name: string
  product_tax_category: ProductTaxCategory
  item_total: number
  item_sub_total: number
  product_type: string
  line_item_type: string
  item_type: string
  item_code: Record<string, any>
  is_invoiced: boolean
  is_unconfirmed_product: boolean
  tags: any[]
  image_name: string
  image_type: string
  image_document_id: string
  document_id: string
  item_custom_fields: any[]
  custom_field_hash: Record<string, any>
  quantity_invoiced: number
  quantity_packed: number
  quantity_shipped: number
  quantity_allocated: number
  quantity_picked: number
  quantity_backordered: number
  quantity_dropshipped: number
  quantity_cancelled: number
  quantity_delivered: number
  package_details: PackageDetails
  quantity_invoiced_cancelled: number
  quantity_returned: number
  is_fulfillable: number
  project_id: string
  location_id: string
  location_name: string
  mapped_items: any[]
  is_modifier_item: boolean
  has_digital_files: boolean
  digital_file_details: Record<string, any>
  cost_source: string
  item_profit_margin_amount: number
  purchase_price: number
  item_profit_margin_percentage: number
}

export interface AddressDetails {
  company_name?: string
  address: string
  street2: string
  city: string
  state: string
  zip: string
  country: string
  country_code: string
  county?: string
  state_code?: string
  fax?: string
  phone?: string
  latitude?: string | number
  longitude?: string | number
  attention: string
}

export interface LocationRef {
  location_id: string
  location_name: string
  status: string
}

export interface TaxSummary {
  tax_amount: number
  tax_name: string
  tax_amount_formatted: string
}

export interface InvoiceRef {
  invoice_id: string
  invoice_number: string
  reference_number: string
  status: string
  date: string
  due_date: string
  total: number
  balance: number
}

export interface ContactInfo {
  customer_balance: number
  credit_limit_configuration: {
    can_use_customer_credit_limit: boolean
    credit_limit: number
  }
  credit_limit: number
  unused_customer_credits: number
  is_credit_limit_migration_completed: boolean
}
