interface ImageOptions {
  imageName?: string
  imageDocumentId?: string
  width?: number
  height?: number
  storefrontDomain?: string
  placeholderUrl?: string
}

export const ZohoHelpers = {
  getZohoProductImageUrl({
    imageName,
    imageDocumentId,
    width = 600,
    height = 600,
    storefrontDomain = 'www.elitewholesalersonline.com.au',
    placeholderUrl = '/images/product-placeholder.png'
  }: ImageOptions): string {
    if (!imageName || !imageDocumentId) {
      return placeholderUrl
    }

    const cleanImageName = imageName.trim()
    return `https://cdn1.zohoecommerce.com/product-images/${cleanImageName}/${imageDocumentId}/${width}x${height}?storefront_domain=${storefrontDomain}`
  }
}
