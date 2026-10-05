import ApiService from './api.service'

export const ProductService = {
  async getProducts(
    params = {
      name_contains: ''
    }
  ) {
    return await ApiService.run({
      method: ApiService.GET,
      url: '/products',
      params: {
        ...params
      }
    })
  },
  // async getSimilarProducts(
  //   productId: number,
  //   params: ProductParams = {
  //     page: 1,
  //     perPage: 20,
  //     detailed: 1
  //   }
  // ) {
  //   return await ApiService.run({
  //     method: ApiService.GET,
  //     url: '/posts',
  //     params: {
  //       ...params,
  //       op: 'similar'
  //     }
  //   })
  // },

  async getProduct(productId: string) {
    return await ApiService.run({
      method: ApiService.GET,
      url: `/products/${productId}`
    })
  },

  async getFeaturedProducts() {
    return await ApiService.run({
      method: ApiService.GET,
      url: '/products/featured'
    })
  },

  async getProductsCategories() {
    return await ApiService.run({
      method: ApiService.GET,
      url: '/products/categories'
    })
  },

  async getProductCategory(categoryId: string) {
    return await ApiService.run({
      method: ApiService.GET,
      url: `/products/categories/${categoryId}`
    })
  },

  async getProductsSubcategories(categoryId: string) {
    return await ApiService.run({
      method: ApiService.GET,
      url: `/products/categories/${categoryId}/subcategories`
    })
  },

  async getProductsByCategoryId(categoryId: string) {
    return await ApiService.run({
      method: ApiService.GET,
      url: `products/categories/${categoryId}/products`,
      params: { perPage: 100 }
    })
  }
}
