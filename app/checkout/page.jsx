// app/checkout/page.jsx
"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Checkout = () => {
  const { cart, getCartTotal, emptyCartAfterOrder } = useAppContext();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "Nigeria", // change if needed
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const required = [
      "name",
      "email",
      "phone",
      "street",
      "city",
      "state",
      "zip",
    ];
    for (let field of required) {
      if (!formData[field].trim()) {
        toast.error(`Please fill in ${field.replace("_", " ")}`);
        return;
      }
    }

    setLoading(true);

    try {
      // Step 1: Create Order (with guest details)
      const orderResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders/create`,
        {
          method: "POST",
          credentials: "include", // important for session
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            street: formData.street,
            city: formData.city,
            state: formData.state,
            zip: formData.zip,
            country: formData.country,
          }),
        }
      );

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(orderData.message || "Failed to create order");
      }

      toast.success("Order created! Redirecting to payment...");

      // Step 2: Initialize Paystack Payment
      const paymentResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/initialize`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order_id: orderData.order_id }),
        }
      );

      const paymentData = await paymentResponse.json();

      if (!paymentResponse.ok) {
        throw new Error(paymentData.message || "Payment failed to start");
      }

      // Redirect to Paystack
      window.location.href = paymentData.authorization_url;
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
      setLoading(false);
    }
  };

  if (!cart || cart.items.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl mb-4">Your cart is empty</p>
            <button
              onClick={() => router.push("/all-products")}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 px-6 md:px-16 lg:px-32 py-14">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Checkout
        </h1>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          {/* Shipping Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Shipping Details</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-orange-500"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-orange-500"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number (e.g. 08012345678)"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-orange-500"
                required
              />
              <input
                type="text"
                name="street"
                placeholder="Street Address"
                value={formData.street}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-orange-500"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="px-4 py-3 border rounded-lg focus:outline-none focus:border-orange-500"
                  required
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  className="px-4 py-3 border rounded-lg focus:outline-none focus:border-orange-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="zip"
                  placeholder="Postal Code"
                  value={formData.zip}
                  onChange={handleChange}
                  className="px-4 py-3 border rounded-lg focus:outline-none focus:border-orange-500"
                  required
                />
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="px-4 py-3 border rounded-lg bg-gray-100"
                  disabled
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg rounded-lg transition disabled:opacity-70"
              >
                {loading ? "Processing..." : "Proceed to Payment"}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-lg p-8 h-fit">
            <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {cart.items.map((item) => (
                <div
                  key={item.cart_item_id}
                  className="flex justify-between text-sm"
                >
                  <span>
                    {item.product_name} × {item.quantity}
                  </span>
                  <span>₦{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>₦{getCartTotal().toLocaleString()}</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              You will be redirected to Paystack to complete your payment
              securely.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
