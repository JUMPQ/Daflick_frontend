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
  const currency = process.env.NEXT_PUBLIC_CURRENCY || "₦";
  const router = useRouter();

  // === STATE ===
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0, item_count: 0 });

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
      } else {
        setUser(null);
      }
    } catch (err) {
      console.log("No session or error:", err);
      setUser(null);
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
      setCart({ items: [], total: 0, item_count: 0 });
    }
  };

  // === ADD TO CART ===
  const addToCart = async (productId, quantity = 1) => {
    if (!user) {
      toast.error("Please login to add to cart");
      router.push("/login");
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
      if (!res.ok) throw new Error(data.message || "Failed to add");

      toast.success("Added to cart!");
      await fetchCart();
    } catch (err) {
      toast.error(err.message || "Failed to add to cart");
    }
  };

  // === UPDATE CART QUANTITY ===
  const updateCartQuantity = async (cartItemId, quantity) => {
    if (quantity < 1) {
      await removeFromCart(cartItemId);
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
      await fetchCart();
    } catch (err) {
      toast.error("Failed to update cart");
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
      await fetchCart();
    } catch (err) {
      toast.error("Failed to remove item");
    }
  };

  // === CART HELPERS ===
  const getCartCount = () => cart.item_count || 0;
  const getCartAmount = () => cart.total || 0;

  // === LOGIN ===
  const login = async (email, password) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      await fetchUser(); // Re-fetch user with new cookie
      toast.success("Logged in successfully!");
      router.push("/");
    } catch (err) {
      toast.error(err.message || "Login failed");
      throw err;
    }
  };

  // === LOGOUT ===
  const logout = () => {
    // Clear cookie with SameSite=None; Secure
    document.cookie =
      "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; secure; samesite=none";

    setUser(null);
    setCart({ items: [], total: 0, item_count: 0 });
    toast.success("Logged out");
    router.push("/");
  };

  // === EFFECTS ===
  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchCart();
  }, [user]);

  // === CONTEXT VALUE ===
  const value = {
    currency,
    user,
    login,
    logout,
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