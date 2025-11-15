// app/cart/page.jsx
"use client";
import React from "react";
import { assets } from "@/assets/assets";
import OrderSummary from "@/components/OrderSummary";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/context/AppContext";
import LoginModal from "@/components/LoginModal";
import { useState } from "react";

const Cart = () => {
  const {
    user,
    cart,
    updateCartQuantity,
    removeFromCart,
    getCartCount,
    router,
  } = useAppContext();

  const [showLogin, setShowLogin] = useState(false);

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen px-6">
          <p className="text-2xl mb-4">Please login to view your cart</p>
          <button
            onClick={() => setShowLogin(true)}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg"
          >
            Login
          </button>
        </div>
        <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      </>
    );
  }

  if (cart.items.length === 0) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen px-6">
          <p className="text-2xl mb-4">Your cart is empty</p>
          <button
            onClick={() => router.push("/all-products")}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg"
          >
            Continue Shopping
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row gap-10 px-6 md:px-16 lg:px-32 pt-14 mb-20">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8 border-b border-gray-500/30 pb-6">
            <p className="text-2xl md:text-3xl text-gray-500">
              Your <span className="font-medium text-orange-600">Cart</span>
            </p>
            <p className="text-lg md:text-xl text-gray-500/80">
              {getCartCount()} Items
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="text-left">
                <tr>
                  <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    Product
                  </th>
                  <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    Price
                  </th>
                  <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    Quantity
                  </th>
                  <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    Subtotal
                  </th>
                  <th className="pb-6 md:px-4 px-1"></th>
                </tr>
              </thead>
              <tbody>
                {cart.items.map((item) => {
                  const imageUrl = item.primary_image
                    ? `${process.env.NEXT_PUBLIC_API_URL}${item.primary_image}`
                    : "/placeholder.jpg";

                  return (
                    <tr key={item.cart_item_id} className="border-b">
                      <td className="flex items-center gap-4 py-4">
                        <div className="bg-gray-100 p-2 rounded-lg">
                          <Image
                            src={imageUrl}
                            alt={item.product_name}
                            width={64}
                            height={64}
                            className="object-cover rounded"
                            unoptimized
                          />
                        </div>
                        <div>
                          <p className="font-medium">{item.product_name}</p>
                          {item.variant_name && (
                            <p className="text-sm text-gray-500">
                              {item.variant_name}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="py-4">${Number(item.price).toFixed(2)}</td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateCartQuantity(
                                item.cart_item_id,
                                item.quantity - 1
                              )
                            }
                            className="w-8 h-8 border rounded flex items-center justify-center"
                          >
                            −
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              updateCartQuantity(
                                item.cart_item_id,
                                parseInt(e.target.value)
                              )
                            }
                            className="w-12 text-center border rounded"
                          />
                          <button
                            onClick={() =>
                              updateCartQuantity(
                                item.cart_item_id,
                                item.quantity + 1
                              )
                            }
                            className="w-8 h-8 border rounded flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4">
                        ${(Number(item.price) * item.quantity).toFixed(2)}
                      </td>

                      <td className="py-4">
                        <button
                          onClick={() => removeFromCart(item.cart_item_id)}
                          className="text-red-600 text-sm"
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

          <button
            onClick={() => router.push("/all-products")}
            className="group flex items-center mt-6 gap-2 text-orange-600"
          >
            <Image
              className="group-hover:-translate-x-1 transition"
              src={assets.arrow_right_icon_colored}
              alt="arrow"
            />
            Continue Shopping
          </button>
        </div>

        <OrderSummary />
      </div>
    </>
  );
};

export default Cart;
