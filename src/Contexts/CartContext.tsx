"use client"
import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { UserContext } from "./UserContext"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

interface CartProduct {
  id: number
  amount: number
  price: number
  name?: string
}

interface CartData {
  cartProducts: CartProduct[]
}

interface CartContextType {
  cartData: CartData
  addToCart: (productId: number, productPrice: number, productName?: string) => void
  removeFromCart: (productId: number, mode: "reduce" | "delete", productName?: string) => void
  updateQuantity: (productId: number, quantity: number, productName?: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

function CartProvider({ children }: { children: React.ReactNode }) {
  const { t,i18n } = useTranslation()
  const userContext = useContext(UserContext)

  if (!userContext) {
    throw new Error("CartProvider must be used within a UserContextProvider")
  }

  const { userId } = userContext

  const [cartData, setCartData] = useState<CartData>(() => {
    if (userId === undefined) return { cartProducts: [] }

    const storageKey = `cart-${userId}`
    const cart = localStorage.getItem(storageKey)

    if (cart) {
      try {
        const parsedCart = JSON.parse(cart)
        if (parsedCart.cartProducts) {
          parsedCart.cartProducts = parsedCart.cartProducts.map((item: CartProduct) => ({
            ...item,
            price: item.price || 0,
          }))
        }
        return parsedCart
      } catch (error) {
        console.error(t("CartContext.Error-parsing-cart"), error)
        localStorage.removeItem(storageKey)
      }
    }
    return { cartProducts: [] }
  })

  useEffect(() => {
    if (userId === undefined) return
    const storageKey = `cart-${userId}`
    localStorage.setItem(storageKey, JSON.stringify(cartData))
  }, [cartData, userId])

  function addToCart(productId: number, productPrice: number, productName?: string) {
    let wasUpdated = false
    let isNewProduct = false
    let newQuantity = 0

    setCartData((prevCart) => {
      const existingIndex = prevCart.cartProducts.findIndex((p) => p.id === productId)

      if (existingIndex >= 0) {
        const updatedProducts = [...prevCart.cartProducts]
        newQuantity = updatedProducts[existingIndex].amount + 1
        updatedProducts[existingIndex] = {
          ...updatedProducts[existingIndex],
          amount: newQuantity,
          price: productPrice,
          name: productName,
        }
        wasUpdated = true
        return { cartProducts: updatedProducts }
      }

      isNewProduct = true
      newQuantity = 1
      return {
        cartProducts: [...prevCart.cartProducts, { id: productId, amount: 1, price: productPrice, name: productName }],
      }
    })

    if (isNewProduct) {
      toast.success(productName ? `${productName} ${t("CartContext.added-Successfully-cart!")}` : t("CartContext.Product-added-cart!"), {
        duration: 3000,
        position: "top-right",
        icon: "🛒",
      })
    } else if (wasUpdated) {
      toast.success(
        productName
          ? `${productName} ${t("CartContext.Updated-Successfully-quantity")}: ${newQuantity}`
          : `${t("CartContext.Product-quantity")}: ${newQuantity}`,
        {
          duration: 2500,
          position: "top-right",
          icon: "📦",
        },
      )
    }
  }

  function removeFromCart(productId: number, mode: "reduce" | "delete", productName?: string) {
    let wasRemoved = false
    let wasReduced = false
    let newQuantity = 0

    setCartData((prevCart) => {
      const existingIndex = prevCart.cartProducts.findIndex((p) => p.id === productId)
      if (existingIndex === -1) return prevCart

      const currentAmount = prevCart.cartProducts[existingIndex].amount

      if (mode === "delete" || currentAmount === 1) {
        wasRemoved = true
        return {
          cartProducts: prevCart.cartProducts.filter((p) => p.id !== productId),
        }
      }

      const updatedProducts = [...prevCart.cartProducts]
      newQuantity = currentAmount - 1
      updatedProducts[existingIndex] = {
        ...updatedProducts[existingIndex],
        amount: newQuantity,
      }
      wasReduced = true

      return { cartProducts: updatedProducts }
    })

    if (wasRemoved) {
      toast.success(productName ? `${productName} ${t("CartContext.Removed-Successfully")}` : t("CartContext.Product-Removed-Successfully"), {
        duration: 3000,
        position: "top-right",
        icon: "🗑️",
      })
    } else if (wasReduced) {
      toast(
        productName
          ? `${productName} ${t("CartContext.Reduced-Successfully-New-quantity")}: ${newQuantity}`
          : `${t("CartContext.Product-Reduced-Successfully-New-quantity:")} ${newQuantity}`,
        {
          duration: 2500,
          position: "top-right",
          icon: "📦",
        },
      )
    }
  }

  function updateQuantity(productId: number, quantity: number, productName?: string) {
    if (quantity < 1) {
      removeFromCart(productId, "delete", productName)
      return
    }

    let oldQuantity = 0
    let wasUpdated = false

    setCartData((prevCart) => {
      const existingIndex = prevCart.cartProducts.findIndex((p) => p.id === productId)
      if (existingIndex === -1) {
        console.warn(t("CartContext.Cannot-update"))
        return prevCart
      }

      oldQuantity = prevCart.cartProducts[existingIndex].amount

      if (oldQuantity !== quantity) {
        const updatedProducts = [...prevCart.cartProducts]
        updatedProducts[existingIndex] = {
          ...updatedProducts[existingIndex],
          amount: quantity,
        }
        wasUpdated = true
        return { cartProducts: updatedProducts }
      }

      return prevCart
    })

    if (wasUpdated && oldQuantity !== quantity) {
      const isIncrease = quantity > oldQuantity
      toast(
      i18n.language === "ar"
        ? productName
          ? ` ${t(isIncrease ? "CartContext.increased" : "CartContext.decreased")} كمية ${productName} إلى ${quantity}`
          : ` ${t(isIncrease ? "CartContext.increased" : "CartContext.decreased")} كمية المنتج إلى ${quantity}`
        : productName
          ? `${productName} ${t("CartContext.quantity")} ${t(isIncrease ? "CartContext.increased" : "CartContext.decreased")} to ${quantity}`
          : `${t("CartContext.Product-quantity")} ${t(isIncrease ? "CartContext.increased" : "CartContext.decreased")} to ${quantity}`,
      {
        duration: 2500,
        position: "top-right",
        icon: isIncrease ? "⬆️" : "⬇️",
      }
    )
    }
  }

  function clearCart() {
    const itemCount = cartData.cartProducts.length
    setCartData({ cartProducts: [] })

    if (itemCount > 0) {
      toast.success(`${t("CartContext.Cart-cleared!")} ${itemCount} ${t("CartContext.item")}${itemCount !== 1 ? "s" : ""} ${t("CartContext.removed")}`, {
        duration: 4000,
        position: "top-right",
        icon: "🧹",
      })
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartData,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

function useCart() {
  const context = useContext(CartContext)
  const { t } = useTranslation()
  if (!context) {
    throw new Error(t("CartContext.useCart-must-used"))
  }
  return context
}

export { CartProvider, useCart }
export type { CartProduct, CartData }
