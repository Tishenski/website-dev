import { createContext, useContext, useState, useEffect } from 'react'
import api from '../api'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCart()
  }, [])

  async function fetchCart() {
    try {
      const data = await api.cart.get()
      setItems(data.items || [])
      setTotal(data.total || 0)
      setCount(data.count || 0)
    } catch (error) {
      console.error('Failed to fetch cart:', error)
    } finally {
      setLoading(false)
    }
  }

  async function addToCart(productId, quantity = 1) {
    try {
      const data = await api.cart.add(productId, quantity)
      setItems(data.items || [])
      setTotal(data.total || 0)
      setCount(data.count || 0)
      return true
    } catch (error) {
      console.error('Failed to add to cart:', error)
      return false
    }
  }

  async function updateQuantity(productId, quantity) {
    try {
      const data = await api.cart.update(productId, quantity)
      setItems(data.items || [])
      setTotal(data.total || 0)
      setCount(data.count || 0)
      return true
    } catch (error) {
      console.error('Failed to update cart:', error)
      return false
    }
  }

  async function removeFromCart(productId) {
    try {
      const data = await api.cart.remove(productId)
      setItems(data.items || [])
      setTotal(data.total || 0)
      setCount(data.count || 0)
      return true
    } catch (error) {
      console.error('Failed to remove from cart:', error)
      return false
    }
  }

  async function clearCart() {
    try {
      const data = await api.cart.clear()
      setItems([])
      setTotal(0)
      setCount(0)
      return true
    } catch (error) {
      console.error('Failed to clear cart:', error)
      return false
    }
  }

  const value = {
    items,
    total,
    count,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    fetchCart,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}

