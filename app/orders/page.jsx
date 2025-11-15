// app/orders/page.jsx
"use client";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "react-hot-toast";

const OrdersPage = () => {
  const { user, currency, router } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setOrders(data.orders);
      }
    } catch (err) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId) => {
    if (!confirm("Cancel this order?")) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders/cancel/${orderId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.ok) {
        toast.success("Order cancelled");
        fetchOrders();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Failed to cancel");
    }
  };

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    fetchOrders();
  }, [user, router]);

  if (!user) return null;

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 py-16 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">My Orders</h1>

          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : orders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No orders yet</p>
              <button
                onClick={() => router.push("/all-products")}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.order_id}
                  className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                  onClick={() => router.push(`/orders/${order.order_id}`)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-lg">#{order.order_number}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.created_at).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-xl">
                        {currency}
                        {order.total}
                      </p>
                      <p
                        className={`text-sm font-medium capitalize ${
                          order.status === "pending"
                            ? "text-orange-600"
                            : order.status === "confirmed"
                            ? "text-green-600"
                            : "text-gray-600"
                        }`}
                      >
                        {order.status}
                      </p>
                    </div>
                  </div>

                  {order.status === "pending" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        cancelOrder(order.order_id);
                      }}
                      className="mt-4 text-red-600 text-sm hover:underline"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrdersPage;
