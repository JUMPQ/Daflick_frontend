// app/orders/[id]/page.jsx
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const OrderDetail = () => {
  const { id } = useParams();
  const { currency } = useAppContext();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders/${id}`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.ok) setOrder(data);
    };
    fetchOrder();
  }, [id]);

  if (!order) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 py-16">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-6">Order Details</h1>
          <p>
            <strong>ID:</strong> #{order.order_number}
          </p>
          <p>
            <strong>Date:</strong> {new Date(order.created_at).toLocaleString()}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span className="capitalize">{order.status}</span>
          </p>
          <p>
            <strong>Total:</strong> {currency}
            {order.total}
          </p>

          <h3 className="mt-6 font-bold">Items</h3>
          <div className="space-y-2">
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between">
                <span>
                  {item.product_name} × {item.quantity}
                </span>
                <span>
                  {currency}
                  {(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderDetail;
