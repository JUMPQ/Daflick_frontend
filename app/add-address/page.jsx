// app/add-address/page.jsx
"use client";
import { assets } from "@/assets/assets";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const AddAddress = () => {
  const { router } = useAppContext();
  const [address, setAddress] = useState({
    fullName: "",
    phoneNumber: "",
    pincode: "",
    area: "",
    city: "",
    state: "",
  });
  const [isDefault, setIsDefault] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const payload = {
      full_name: address.fullName,
      phone: address.phoneNumber,
      street: address.area,
      city: address.city,
      state: address.state,
      zip_code: address.pincode,
      country: "NG", // Nigeria
      is_default: isDefault ? 1 : 0,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/addresses`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          credentials: "include",
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success("Address saved!");
      router.push("/cart"); // or wherever
    } catch (err) {
      toast.error(err.message || "Failed to save");
    }
  };

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 py-16 flex flex-col md:flex-row justify-between">
        <form onSubmit={onSubmitHandler} className="w-full max-w-lg">
          <p className="text-2xl md:text-3xl text-gray-500">
            Add Shipping{" "}
            <span className="font-semibold text-orange-600">Address</span>
          </p>
          <div className="space-y-3 mt-10">
            <input
              required
              className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
              type="text"
              placeholder="Full name"
              value={address.fullName}
              onChange={(e) =>
                setAddress({ ...address, fullName: e.target.value })
              }
            />
            <input
              required
              className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
              type="text"
              placeholder="Phone number"
              value={address.phoneNumber}
              onChange={(e) =>
                setAddress({ ...address, phoneNumber: e.target.value })
              }
            />
            <input
              required
              className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
              type="text"
              placeholder="Pin code"
              value={address.pincode}
              onChange={(e) =>
                setAddress({ ...address, pincode: e.target.value })
              }
            />
            <textarea
              required
              className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500 resize-none"
              rows={4}
              placeholder="Address (Area and Street)"
              value={address.area}
              onChange={(e) => setAddress({ ...address, area: e.target.value })}
            />
            <div className="flex space-x-3">
              <input
                required
                className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                type="text"
                placeholder="City/District/Town"
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
              />
              <input
                required
                className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                type="text"
                placeholder="State"
                value={address.state}
                onChange={(e) =>
                  setAddress({ ...address, state: e.target.value })
                }
              />
            </div>
            <label className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                checked={isDefault}
                onChange={(e) => setIsDefault(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-600">
                Set as default address
              </span>
            </label>
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-orange-600 text-white py-3 hover:bg-orange-700 uppercase font-medium"
          >
            Save Address
          </button>
        </form>
        <Image
          className="md:mr-16 mt-16 md:mt-0 hidden md:block"
          src={assets.my_location_image}
          alt="location"
        />
      </div>
      <Footer />
    </>
  );
};

export default AddAddress;
