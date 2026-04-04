export interface Product {
  id: string
  title: string
  price: number
  /** Optional original price for strikethrough (e.g. promotions). */
  compareAtPrice?: number
  /** Average customer rating 1–5. */
  rating?: number
  image: string
  images: string[]
  category: string
  description: string
}
