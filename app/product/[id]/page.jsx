// app/product/[id]/page.jsx
"use client";
import { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";

const Product = () => {
  const { id } = useParams();
  const { products, addToCart, router } = useAppContext();

  const [mainImage, setMainImage] = useState("");
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const product = products.find((p) => p.id === parseInt(id));
    if (product) {
      setProductData(product);
      setMainImage(`${process.env.NEXT_PUBLIC_API_URL}${product.primaryImage}`);
    }
  }, [id, products]);

  if (!productData) return <Loading />;

  const otherImages =
    productData.images?.filter((img) => img !== productData.primaryImage) || [];

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Images */}
          <div className="px-5 lg:px-16 xl:px-20">
            <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4">
              <Image
                src={mainImage}
                alt={productData.name}
                className="w-full h-auto object-cover"
                width={1280}
                height={720}
                unoptimized
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {[productData.primaryImage, ...otherImages].map((img, i) => {
                const src = `${process.env.NEXT_PUBLIC_API_URL}${img}`;
                return (
                  <div
                    key={i}
                    onClick={() => setMainImage(src)}
                    className="cursor-pointer rounded-lg overflow-hidden bg-gray-500/10"
                  >
                    <Image
                      src={src}
                      alt=""
                      className="w-full h-auto object-cover"
                      width={200}
                      height={200}
                      unoptimized
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-medium text-gray-800/90 mb-4">
              {productData.name}
            </h1>

            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Image
                    key={i}
                    className="h-4 w-4"
                    src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                    alt="star"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">(4.5)</p>
            </div>

            <p className="text-gray-600 mt-3 mb-6">
              {productData.description || "No description available."}
            </p>

            <p className="text-3xl font-medium mt-6">₦{productData.price}</p>

            <hr className="my-6" />

            <div className="overflow-x-auto mb-8">
              <table className="table-auto w-full max-w-72">
                <tbody>
                  <tr>
                    <td className="text-gray-600 font-medium pr-4">Brand</td>
                    <td className="text-gray-800/60">Generic</td>
                  </tr>
                  <tr>
                    <td className="text-gray-600 font-medium pr-4">Category</td>
                    <td className="text-gray-800/60">
                      {productData.category_name}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => addToCart(productData.id)}
                className="flex-1 py-3.5 bg-gray-100 text-gray-800 hover:bg-gray-200 transition font-medium"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  addToCart(productData.id);
                  router.push("/cart");
                }}
                className="flex-1 py-3.5 bg-orange-500 text-white hover:bg-orange-600 transition font-medium"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center mb-8">
            <p className="text-3xl font-medium">
              Featured <span className="text-orange-600">Products</span>
            </p>
            <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full">
            {products
              .filter((p) => p.id !== productData.id)
              .slice(0, 5)
              .map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
          </div>

          <button className="mt-8 px-8 py-2 border rounded text-gray-500 hover:bg-gray-100 transition">
            See more
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
