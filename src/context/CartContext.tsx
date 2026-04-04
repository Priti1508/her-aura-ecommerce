import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Product } from '../types/product'

export interface CartLine {
  product: Product
  quantity: number
}

interface CartContextValue {
  items: CartLine[]
  addItem: (product: Product, quantity?: number) => void
  setQuantity: (productId: string, quantity: number) => void
  removeItem: (productId: string) => void
  clearCart: () => void
  totalItems: number
  subtotal: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([])

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((l) => l.product.id === product.id)
      if (existing) {
        return prev.map((l) =>
          l.product.id === product.id
            ? { ...l, quantity: l.quantity + quantity }
            : l,
        )
      }
      return [...prev, { product, quantity }]
    })
  }, [])

  const setQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) {
      setItems((prev) => prev.filter((l) => l.product.id !== productId))
      return
    }
    setItems((prev) =>
      prev.map((l) =>
        l.product.id === productId ? { ...l, quantity } : l,
      ),
    )
  }, [])

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((l) => l.product.id !== productId))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const { totalItems, subtotal } = useMemo(() => {
    return items.reduce(
      (acc, line) => ({
        totalItems: acc.totalItems + line.quantity,
        subtotal: acc.subtotal + line.product.price * line.quantity,
      }),
      { totalItems: 0, subtotal: 0 },
    )
  }, [items])

  const value = useMemo(
    () => ({
      items,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
      totalItems,
      subtotal,
    }),
    [
      items,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
      totalItems,
      subtotal,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
