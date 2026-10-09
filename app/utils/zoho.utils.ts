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
    console.log({ imageName, imageDocumentId })
    if (!imageName || !imageDocumentId) {
      return placeholderUrl
    }

    const cleanImageName = imageName.trim()

    // Encode the dynamic parameters to handle spaces, symbols, and special text safely
    const encodedImageName = encodeURIComponent(cleanImageName)
    const encodedDocId = encodeURIComponent(imageDocumentId)
    const encodedDomain = encodeURIComponent(storefrontDomain)

    const zohoImage = `https://cdn1.zohoecommerce.com/product-images/${encodedImageName}/${encodedDocId}/${width}x${height}?storefront_domain=${encodedDomain}`
    console.log(zohoImage)

    return zohoImage
  }
}
