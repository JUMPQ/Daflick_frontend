// app/payment/[order_id]/page.jsx
"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { toast } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

const PaymentPage = () => {
  const { order_id } = useParams();
  const { router, currency } = useAppContext();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paystackRef, setPaystackRef] = useState(null);

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
        if (!res.ok) throw new Error(data.message);
        setOrder(data);
      } catch (err) {
        toast.error(err.message);
        router.push("/cart");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [order_id]);

  const handlePayment = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payments/initialize`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order_id }),
          credentials: "include",
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setPaystackRef(data.reference);

      // Open Paystack popup
      const handler = PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY, // Add to .env
        email: order.customer_email, // From order
        amount: Math.round(order.total * 100), // kobo
        ref: data.reference,
        onClose: () => {
          toast.error("Payment cancelled");
        },
        callback: (response) => {
          // Verify on backend
          window.location.href = `/payment/${order_id}/verify?reference=${response.reference}`;
        },
        metadata: {
          order_id: order_id,
        },
      });

      handler.openIframe();
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  if (!order) return null;

  return (
    <>
      <Script src="https://js.paystack.co/v1/inline.js" />
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 py-16 min-h-screen">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Complete Your Payment
          </h1>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between">
              <span>Order ID:</span>
              <span className="font-medium">{order.order_number}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Amount:</span>
              <span className="text-xl font-bold text-orange-600">
                {currency}
                {order.total.toFixed(2)}
              </span>
            </div>
          </div>

          <button
            onClick={handlePayment}
            className="w-full bg-orange-600 text-white py-4 rounded-lg hover:bg-orange-700 transition text-lg font-medium"
          >
            Pay Now with Paystack
          </button>

          <p className="text-sm text-gray-500 text-center mt-4">
            Secure payment via Paystack. You'll be redirected in a popup.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentPage;
