import type { Product } from '../types/product'
import productsJson from './products.json'

export const products: Product[] = productsJson as Product[]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getCategories(): string[] {
  return [...new Set(products.map((p) => p.category))].sort()
}
