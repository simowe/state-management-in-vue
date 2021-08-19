import { useSWR } from '@attensi/swr'
import { nanoid } from 'nanoid'
import { Ref } from 'vue'
import { fetchProduct } from './fetchProduct'

const uniqueKey = nanoid() // Generate a unique key automatically

export function useProduct(productIdRef: Ref<number>) {
  const key = [uniqueKey, productIdRef] // Combine multiple values into a single key
  const { data: product, error } = useSWR(key, (_, productId) => {
    return fetchProduct(productId)
  })
  return { product, error }
}
