'use client'
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsLetter from "@/components/NewsLetter";
import { assets } from "@/assets/assets";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center px-6 md:px-16 lg:px-32 bg-gray-50">
        {/* Hero Section */}
        <section className="pt-16 pb-24 w-full text-center bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg shadow-lg">
          <h1 className="text-4xl md:text-5xl font-bold">Welcome to Fashion</h1>
          <p className="mt-4 text-xl md:text-2xl">Where style meets sophistication and quality meets affordability.</p>
        </section>

        {/* Our Story Section */}
        <section className="mt-16 md:mt-24 text-center">
          <h2 className="text-3xl font-semibold text-gray-800">Our Story</h2>
          <div className="w-16 h-1 bg-orange-600 rounded-full mx-auto my-4"></div>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Fashion was born out of a passion for stylish and affordable clothing. Our mission is simple: to make high-quality fashion accessible to everyone. We carefully curate collections that reflect the latest trends while ensuring every piece feels as good as it looks.
          </p>
          <div className="mt-8">
                <Image className="h-100 w-full" src={assets.about_img} alt="star_icon" />
          </div>
        </section>

        {/* Our Values Section */}
        <section className="mt-16 md:mt-24 text-center px-6 lg:px-0">
          <h2 className="text-3xl font-semibold text-gray-800">Our Values</h2>
          <div className="w-16 h-1 bg-orange-600 rounded-full mx-auto my-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {/* Value 1: Quality */}
            <div className="flex flex-col items-center">
            <p className="text-xl font-bold text-gray-800 mb-4">Quality First</p>
            <p className="text-gray-600 text-sm md:text-base">We source only the finest materials to ensure durability and comfort in every product.</p>
            </div>

            {/* Value 2: Sustainability */}
            <div className="flex flex-col items-center">
            <p className="text-xl font-bold text-gray-800 mb-4">Sustainability</p>
            <p className="text-gray-600 text-sm md:text-base">Committed to a greener future, we incorporate eco-friendly materials and sustainable practices in our designs.</p>
            </div>

            {/* Value 3: Customer Satisfaction */}
            <div className="flex flex-col items-center">
            <p className="text-xl font-bold text-gray-800 mb-4">Customer Satisfaction</p>
            <p className="text-gray-600 text-sm md:text-base">Our customers are at the heart of everything we do, and we strive to offer excellent service and easy returns.</p>
            </div>

            {/* Value 4: Style for All */}
            <div className="flex flex-col items-center">
            <p className="text-xl font-bold text-gray-800 mb-4">Style for Everyone</p>
            <p className="text-gray-600 text-sm md:text-base">From everyday essentials to standout pieces, we have something for every occasion, every personality.</p>
            </div>

          </div>
        </section>

      </div>
      <div className="px-6 md:px-16 lg:px-32 py-10">
      <NewsLetter /> 
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
