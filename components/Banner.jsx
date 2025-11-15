import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between md:pl-20 py-14 md:py-0 bg-[#E0D7FF] my-16 rounded-xl overflow-hidden">
      <Image
        className="max-w-60"
        src={assets.banner2}
        alt="banner2"
      />
      <div className="flex flex-col items-center justify-center text-center space-y-2 px-2 md:px-0">
        <h2 className="text-2xl md:text-3xl font-semibold max-w-[290px]">
          Fashion for Everyone
        </h2>
        <p className="max-w-[343px] font-medium text-gray-800/60">
        From bold styles to perfect fits—everything you need to stand out.
        
        </p>
        <button className="group flex items-center justify-center gap-1 px-12 py-2.5 bg-orange-600 rounded text-white">
          Buy now
          <Image className="group-hover:translate-x-1 transition" src={assets.arrow_icon_white} alt="arrow_icon_white" />
        </button>
      </div>
      <Image
        className="hidden md:block max-w-80"
        src={assets.banner1}
        alt="banner1"
      />
      <Image
        className="md:hidden"
        src={assets.banner1}
        alt="sm_controller_image"
      />
    </div>
  );
};

export default Banner;