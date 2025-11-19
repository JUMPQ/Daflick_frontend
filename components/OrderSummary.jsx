// components/OrderSummary.jsx → GUEST ONLY (NO ADDRESSES!)
import { useAppContext } from "@/context/AppContext";
import React from "react";
import { useRouter } from "next/navigation";

const OrderSummary = () => {
  const { getCartCount, getCartTotal, cart } = useAppContext();
  const router = useRouter();

  const subtotal = getCartTotal();
  const tax = Math.round(subtotal * 0.05); // 5% tax or whatever you want
  const shipping = 0; // Free shipping
  const grandTotal = subtotal + tax + shipping;

  return (
    <div className="w-full lg:w-96 bg-white rounded-xl shadow-lg p-6 sticky top-24">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

      {/* Cart Items Preview */}
      <div className="space-y-3 mb-6 max-h-64 overflow-y-auto border-b pb-4">
        {cart?.items?.map((item) => (
          <div
            key={item.cart_item_id}
            className="flex justify-between text-sm text-gray-600"
          >
            <span className="truncate max-w-xs">
              {item.product_name} × {item.quantity}
            </span>
            <span className="font-medium">
              ₦{(item.price * item.quantity).toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {/* Breakdown */}
      <div className="space-y-3 text-gray-700">
        <div className="flex justify-between">
          <span>Subtotal ({getCartCount()} items)</span>
          <span className="font-medium">₦{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="text-green-600 font-medium">Free</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>₦{tax.toLocaleString()}</span>
        </div>
      </div>

      <div className="border-t-2 border-gray-200 mt-5 pt-5">
        <div className="flex justify-between text-xl font-bold text-gray-800">
          <span>Total</span>
          <span>₦{grandTotal.toLocaleString()}</span>
        </div>
      </div>

      {/* Proceed Button */}
      <button
        onClick={() => router.push("/checkout")}
        className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-lg transition text-lg"
      >
        Proceed to Checkout
      </button>

      <p className="text-xs text-gray-500 text-center mt-4">
        Secure payment powered by Paystack
      </p>
    </div>
  );
};

export default OrderSummary;
