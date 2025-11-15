// app/payment/[order_id]/verify/page.jsx
"use client";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAppContext } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const VerifyPayment = () => {
  const { order_id } = useParams();
  const { router } = useAppContext();
  const query = new URLSearchParams(window.location.search);
  const reference = query.get("reference");

  useEffect(() => {
    if (!reference) {
      toast.error("No payment reference");
      router.push("/cart");
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/payments/verify?reference=${reference}`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        toast.success("Payment successful! Order confirmed.");
        router.push(`/order-success/${order_id}`);
      } catch (err) {
        toast.error(err.message || "Payment verification failed");
        router.push("/cart");
      }
    };

    verify();
  }, [reference, order_id]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl">Verifying your payment...</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VerifyPayment;
