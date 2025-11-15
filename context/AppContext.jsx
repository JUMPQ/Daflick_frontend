// context/AppContext.js
"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within AppContextProvider");
  return context;
};

export const AppContextProvider = ({ children }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY || "$";
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0, item_count: 0 });
  const router = useRouter();

  // === FETCH USER ===
  const fetchUser = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
        {
          credentials: "include",
        }
      );
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    } catch (err) {
      console.log("No session");
    } finally {
      setIsLoading(false);
    }
  };

  // === FETCH PRODUCTS ===
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products`
        );
        const data = await res.json();
        console.log("Fetched products:", data);
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  // === FETCH CART ===
  const fetchCart = async () => {
    if (!user) {
      setCart({ items: [], total: 0, item_count: 0 });
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setCart(data);
      } else {
        setCart({ items: [], total: 0, item_count: 0 });
      }
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  };

  // === ADD TO CART ===
  const addToCart = async (productId, quantity = 1) => {
    if (!user) {
      toast.error("Please login to add to cart");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart/add`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product_id: productId, quantity }),
          credentials: "include",
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success("Added to cart!");
      fetchCart();
    } catch (err) {
      toast.error(err.message || "Failed to add");
    }
  };

  // === UPDATE CART QUANTITY ===
  const updateCartQuantity = async (cartItemId, quantity) => {
    if (quantity < 1) {
      removeFromCart(cartItemId);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart/update`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cart_item_id: cartItemId, quantity }),
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Update failed");
      fetchCart();
    } catch (err) {
      toast.error("Failed to update");
    }
  };

  // === REMOVE FROM CART ===
  const removeFromCart = async (cartItemId) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart/remove`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cart_item_id: cartItemId }),
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Remove failed");
      toast.success("Removed from cart");
      fetchCart();
    } catch (err) {
      toast.error("Failed to remove");
    }
  };

  // === GET CART COUNT & TOTAL ===
  const getCartCount = () => cart.item_count || 0;
  const getCartAmount = () => cart.total || 0;

  // === FETCH ON LOGIN/LOGOUT ===
  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchCart();
  }, [user]);

  const value = {
    currency,
    user,
    login: () => {}, // placeholder
    logout: () => {
      document.cookie =
        "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; secure; samesite=strict";
      setUser(null);
      toast.success("Logged out");
      router.push("/");
    },
    isLoading,
    products,
    cart,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    getCartCount,
    getCartAmount,
    router,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
