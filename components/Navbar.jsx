// components/Navbar.jsx
"use client";
import React from "react";
import { assets } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";

const Navbar = () => {
  const { getCartCount, router } = useAppContext();
  const cartCount = getCartCount();

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 shadow-lg text-gray-700 sticky top-0 bg-white z-40">
      {/* Logo */}
      <Image
        className="cursor-pointer w-36 md:w-40"
        onClick={() => router.push("/")}
        src={assets.logo}
        alt="logo"
        priority
      />

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6 lg:gap-10 font-medium">
        <Link href="/" className="hover:text-black transition">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-black transition">
          Shop
        </Link>
        <Link href="/contact" className="hover:text-black transition">
          Contact
        </Link>
      </div>

      {/* Right Side - Cart Only (Desktop + Mobile) */}
      <div className="flex items-center gap-5">
        {/* Cart Icon with Badge */}
        <Link href="/cart" className="relative">
          <Image
            src={assets.cart_icon}
            alt="cart"
            width={24}
            height={24}
            className="w-6 h-6"
          />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
              {cartCount}
            </span>
          )}
        </Link>

        {/* Optional: Mobile Menu Icon (if you have a hamburger menu later) */}
        {/* <button className="md:hidden">
          <Image src={assets.menu_icon} alt="menu" className="w-6 h-6" />
        </button> */}
      </div>
    </nav>
  );
};

export default Navbar;
