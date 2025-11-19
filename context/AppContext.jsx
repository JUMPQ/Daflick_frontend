// context/AppContext.js → 100% GUEST CHECKOUT READY
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within AppContextProvider");
  return context;
};

export const AppContextProvider = ({ children }) => {
  const currency = "₦";
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0, item_count: 0 });
  const [loadingCart, setLoadingCart] = useState(true);

  // === FETCH PRODUCTS (unchanged) ===
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products`
        );
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  // === FETCH CART — NOW WORKS FOR GUESTS (via session) ===
  const fetchCart = async () => {
    setLoadingCart(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart`, {
        credentials: "include", // This sends session cookie
      });

      if (res.ok) {
        const data = await res.json();
        setCart(data);
      } else {
        setCart({ items: [], total: 0, item_count: 0 });
      }
    } catch (err) {
      console.error("Cart fetch error:", err);
      setCart({ items: [], total: 0, item_count: 0 });
    } finally {
      setLoadingCart(false);
    }
  };

  // === ADD TO CART — NO LOGIN REQUIRED ===
  const addToCart = async (productId, quantity = 1) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart/add`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product_id: productId, quantity }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add");

      toast.success("Added to cart!");
      await fetchCart(); // Refresh cart
    } catch (err) {
      toast.error(err.message || "Out of stock or failed to add");
    }
  };

  // === UPDATE QUANTITY ===
  const updateCartQuantity = async (cartItemId, quantity) => {
    if (quantity < 1) {
      await removeFromCart(cartItemId);
      return;
    }

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/update`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart_item_id: cartItemId, quantity }),
      });
      await fetchCart();
    } catch (err) {
      toast.error("Failed to update");
    }
  };

  // === REMOVE FROM CART ===
  const removeFromCart = async (cartItemId) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/remove`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart_item_id: cartItemId }),
      });
      toast.success("Removed");
      await fetchCart();
    } catch (err) {
      toast.error("Failed to remove");
    }
  };

  // === CART HELPERS ===
  const getCartCount = () => cart.item_count || 0;
  const getCartTotal = () => cart.total || 0; // ← NOW THIS EXISTS!
  const getCartAmount = () => cart.total || 0; // Keep both for backward compat

  // === INITIAL LOAD ===
  useEffect(() => {
    fetchCart();
  }, []);

  const value = {
    currency,
    products,
    cart,
    loadingCart,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    getCartCount,
    getCartTotal, // ← NOW AVAILABLE EVERYWHERE
    getCartAmount, // ← old name still works
    router,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
