// app/cart/page.jsx
"use client";
import React from "react";
import { assets } from "@/assets/assets";
import OrderSummary from "@/components/OrderSummary";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";

const Cart = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    getCartCount,
    router,
    loadingCart, // optional: if you have a loading state
  } = useAppContext();

  // Show loading or empty state
  if (loadingCart) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xl">Loading your cart...</p>
        </div>
      </>
    );
  }

  // Empty Cart
  if (!cart || cart.items.length === 0) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
          <Image
            src={assets.empty_cart || "/empty-cart.png"}
            alt="Empty cart"
            width={200}
            height={200}
            className="mb-8 opacity-70"
          />
          <p className="text-2xl md:text-3xl mb-4 text-gray-700">
            Your cart is empty
          </p>
          <p className="text-gray-500 mb-8">
            Looks like you haven't added anything yet.
          </p>
          <button
            onClick={() => router.push("/all-products")}
            className="px-8 py-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition text-lg font-medium"
          >
            Start Shopping
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen px-6 md:px-16 lg:px-32 py-14 mb-20">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8 border-b border-gray-300 pb-6">
              <h1 className="text-2xl md:text-3xl">
                Your <span className="font-semibold text-orange-600">Cart</span>
              </h1>
              <p className="text-lg text-gray-600">
                {getCartCount()} {getCartCount() === 1 ? "Item" : "Items"}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="text-left text-gray-600 border-b">
                    <th className="pb-4 font-medium">Product</th>
                    <th className="pb-4 font-medium">Price</th>
                    <th className="pb-4 font-medium">Quantity</th>
                    <th className="pb-4 font-medium">Subtotal</th>
                    <th className="pb-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.items.map((item) => {
                    const imageUrl = item.primary_image
                      ? `${process.env.NEXT_PUBLIC_API_URL}${item.primary_image}`
                      : "/placeholder.jpg";

                    return (
                      <tr
                        key={item.cart_item_id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="py-6">
                          <div className="flex items-center gap-4">
                            <div className="bg-gray-100 rounded-lg p-2">
                              <Image
                                src={imageUrl}
                                alt={item.product_name}
                                width={70}
                                height={70}
                                className="rounded object-cover"
                                unoptimized
                              />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {item.product_name}
                              </p>
                              {item.variant_name && (
                                <p className="text-sm text-gray-500 mt-1">
                                  Variant: {item.variant_name}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>

                        <td className="py-6 text-gray-800">
                          ₦{Number(item.price).toLocaleString()}
                        </td>

                        <td className="py-6">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                updateCartQuantity(
                                  item.cart_item_id,
                                  item.quantity - 1
                                )
                              }
                              className="w-9 h-9 rounded border border-gray-300 hover:bg-gray-100 flex items-center justify-center transition"
                              disabled={item.quantity <= 1}
                            >
                              −
                            </button>
                            <span className="w-12 text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateCartQuantity(
                                  item.cart_item_id,
                                  item.quantity + 1
                                )
                              }
                              className="w-9 h-9 rounded border border-gray-300 hover:bg-gray-100 flex items-center justify-center transition"
                            >
                              +
                            </button>
                          </div>
                        </td>

                        <td className="py-6 font-medium text-gray-900">
                          ₦
                          {(
                            Number(item.price) * item.quantity
                          ).toLocaleString()}
                        </td>

                        <td className="py-6">
                          <button
                            onClick={() => removeFromCart(item.cart_item_id)}
                            className="text-red-600 hover:text-red-700 text-sm font-medium transition"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-8">
              <Link
                href="/all-products"
                className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-96">
            <OrderSummary />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
