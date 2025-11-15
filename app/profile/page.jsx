// app/profile/page.jsx
"use client";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { assets } from "@/assets/assets";

const ProfilePage = () => {
  const { user, currency, router } = useAppContext();
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const fetchRecentOrders = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/orders`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        if (res.ok) {
          setRecentOrders(data.orders.slice(0, 3));
        }
      } catch (err) {
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchRecentOrders();
  }, [user, router]);

  if (!user) return null;

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 py-16 min-h-screen">
        <div className="max-w-5xl mx-auto">
          {/* User Info */}
          <div className="bg-white p-8 rounded-lg shadow mb-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-orange-600">
                  {user.name?.[0]?.toUpperCase() || "U"}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {user.name}
                </h1>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500">
                  Customer ID: {user.customer_id}
                </p>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white p-8 rounded-lg shadow">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
              <button
                onClick={() => router.push("/orders")}
                className="text-orange-600 hover:underline font-medium"
              >
                See All Orders
              </button>
            </div>

            {loading ? (
              <p className="text-gray-500">Loading orders...</p>
            ) : recentOrders.length === 0 ? (
              <p className="text-gray-500">
                No orders yet.{" "}
                <span
                  className="text-orange-600 cursor-pointer hover:underline"
                  onClick={() => router.push("/all-products")}
                >
                  Start shopping!
                </span>
              </p>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.order_id}
                    className="flex justify-between items-center p-4 border rounded-lg hover:shadow-md transition cursor-pointer"
                    onClick={() => router.push(`/orders/${order.order_id}`)}
                  >
                    <div>
                      <p className="font-medium text-gray-800">
                        #{order.order_number}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {currency}
                        {order.total}
                      </p>
                      <p
                        className={`text-sm capitalize ${
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
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
