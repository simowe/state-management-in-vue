import { delay } from './delay'

export async function fetchProduct(productId: number) {
  console.log('fetchProduct', productId)
  await delay(1000)

  return {
    productId,
    productName: 'Super Product #' + productId
  }
}
