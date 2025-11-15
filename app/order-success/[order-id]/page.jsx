// app/order-success/[order_id]/page.jsx
"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const OrderSuccess = () => {
  const { order_id } = useParams();
  const { router } = useAppContext();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/orders/${order_id}`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        if (res.ok) {
          setOrder(data);
        } else {
          router.push("/orders");
        }
      } catch (err) {
        router.push("/orders");
      }
    };
    fetchOrder();
  }, [order_id]);

  if (!order) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 py-16 min-h-screen">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-green-600 text-2xl">✓</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Order Confirmed!
          </h1>
          <p className="text-gray-600 mb-6">Thank you for your purchase.</p>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="font-medium mb-2">Order Details</h3>
            <p>
              <strong>Order ID:</strong> {order.order_number}
            </p>
            <p>
              <strong>Total:</strong> ${order.total.toFixed(2)}
            </p>
            <p>
              <strong>Status:</strong> {order.status}
            </p>
          </div>

          <button
            onClick={() => router.push("/orders")}
            className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition"
          >
            View Order
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderSuccess;
