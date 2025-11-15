// components/Navbar.jsx
"use client";
import React, { useState } from "react";
import { assets } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import LoginModal from "@/components/LoginModal"; // We'll use this

const Navbar = () => {
  const { user, logout, getCartCount, router } = useAppContext();
  const [showLogin, setShowLogin] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const cartCount = getCartCount();

  return (
    <>
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 shadow-lg text-gray-700">
        {/* Logo */}
        <Image
          className="cursor-pointer w-40 md:w-40"
          onClick={() => router.push("/")}
          src={assets.logo}
          alt="logo"
        />

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          <Link href="/" className="hover:text-gray-900 transition font-bold">
            Home
          </Link>
          <Link
            href="/all-products"
            className="hover:text-gray-900 transition font-bold"
          >
            Shop
          </Link>
          <Link
            href="/about"
            className="hover:text-gray-900 transition font-bold"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="hover:text-gray-900 transition font-bold"
          >
            Contact
          </Link>
        </div>

        {/* Right Icons - Desktop */}
        <ul className="hidden md:flex items-center gap-4">
          {/* Search */}
          <button>
            <Image className="w-4 h-4" src={assets.search_icon} alt="search" />
          </button>

          {/* Cart with Badge */}
          <Link href="/cart" className="relative">
            <Image className="w-5 h-5" src={assets.cart_icon} alt="cart" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Profile / Login */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-2 hover:text-gray-900 transition"
              >
                <Image src={assets.user_icon} alt="user" className="w-5 h-5" />
                <span className="font-medium">{user.firstName}</span>
              </button>

              {showProfile && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-50">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setShowProfile(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/orders"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setShowProfile(false)}
                  >
                    My Orders
                  </Link>
                  <hr className="my-1" />
                  <button
                    onClick={() => {
                      logout();
                      setShowProfile(false);
                      router.push("/");
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="flex items-center gap-2 hover:text-gray-900 transition"
            >
              <Image src={assets.user_icon} alt="login" className="w-5 h-5" />
              Login
            </button>
          )}
        </ul>

        {/* Mobile Right Side */}
        <div className="flex items-center md:hidden gap-3">
          {/* Cart */}
          <Link href="/cart" className="relative">
            <Image className="w-5 h-5" src={assets.cart_icon} alt="cart" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Login/Profile */}
          {user ? (
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-1"
            >
              <Image src={assets.user_icon} alt="user" className="w-5 h-5" />
            </button>
          ) : (
            <button onClick={() => setShowLogin(true)}>
              <Image src={assets.user_icon} alt="login" className="w-5 h-5" />
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Profile Dropdown */}
      {showProfile && user && (
        <div className="md:hidden fixed inset-x-0 top-16 bg-white shadow-lg border-t z-50 py-4 px-6">
          <p className="font-medium mb-3">Hi, {user.firstName}!</p>
          <Link
            href="/profile"
            className="block py-2"
            onClick={() => setShowProfile(false)}
          >
            My Profile
          </Link>
          <Link
            href="/orders"
            className="block py-2"
            onClick={() => setShowProfile(false)}
          >
            My Orders
          </Link>
          <hr className="my-2" />
          <button
            onClick={() => {
              logout();
              setShowProfile(false);
              router.push("/");
            }}
            className="text-red-600 py-2 w-full text-left"
          >
            Logout
          </button>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
};

export default Navbar;
