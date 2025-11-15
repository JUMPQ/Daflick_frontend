import React from "react";

const NewsLetter = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center bg-gray-800 text-white py-16">
      <h1 className="text-4xl font-semibold md:text-5xl">
        Subscribe Now & Get 10% Off!
      </h1>
      <p className="text-lg md:text-xl text-gray-300 mt-4 mb-8 max-w-lg mx-auto">
        Join the Fashion revolution! Get the latest trends, exclusive offers, and more. Sign up and get a 10% discount on your first purchase.
      </p>

      {/* Subscription Form */}
      <div className="flex items-center justify-center w-full max-w-md mx-auto space-x-4">
        <input
          className="w-full px-6 py-3 text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-600"
          type="email"
          placeholder="Enter your email address"
        />
        <button className="px-8 py-3 text-white bg-orange-600 rounded-lg hover:bg-orange-500 transition duration-300">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default NewsLetter;

