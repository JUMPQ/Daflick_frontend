import logo from "./ii.png";
import search_icon from "./search_icon.svg";
import user_icon from "./user_icon.svg";
import cart_icon from "./cart_icon.svg";
import add_icon from "./add_icon.svg";
import order_icon from "./order_icon.svg";
import instagram_icon from "./instagram_icon.svg";
import facebook_icon from "./facebook_icon.svg";
import twitter_icon from "./twitter_icon.svg";
import box_icon from "./box_icon.svg";
import product_list_icon from "./product_list_icon.svg";
import menu_icon from "./menu_icon.svg";
import arrow_icon from "./arrow_icon.svg";
import increase_arrow from "./increase_arrow.svg";
import decrease_arrow from "./decrease_arrow.svg";
import arrow_right_icon_colored from "./arrow_right_icon_colored.svg";
import my_location_image from "./my_location_image.svg";
import arrow_icon_white from "./arrow_icon_white.svg";
import heart_icon from "./heart_icon.svg";
import star_icon from "./star_icon.svg";
import redirect_icon from "./redirect_icon.svg";
import star_dull_icon from "./star_dull_icon.svg";
import header_fashion_image_1 from "./homp11.png";
import header_fashion_image_2 from "./homp22.png";
import header_fashion_image_3 from "./homp33.png";

import venu_watch_image from "./venu_watch_image.png"
import product_Chic_Crossbody_Bag from "./product-Chic-Crossbody-Bag.jpg";
import product_Classic_Denim_Jacket from "./product-Classic-Denim-Jacket.jpg";
import product_Classic_White_Sneakers from "./product-Classic-White-Sneakers.jpg";
import product_Elegant_Silk_Scarf from "./product-Elegant-Silk-Scarf.png";
import product_Leather_Biker_Jacket from "./product-Leather Biker Jacket.jpg";
import product_Minimalist_Leather_Wallet from "./product-Minimalist-Leather-Wallet.jpg";
import product_Slim_Fit_Chinos from "./product-Slim-Fit-Chinos.jpg";
import product_Stylish_Aviator_Sunglasses from "./product-Stylish-Aviator-Sunglasses.jpg";
import product_Tailored_Wool_Coat from "./product-Tailored-Wool-Coat.jpeg";
import product_Vintage_Crew_Neck_TShirt from "./product-Vintage-Crew-Neck-T-Shirt.jpg";

import upload_area from "./upload_area.png";

import feature1 from "./feat1.jpg";
import feature2 from "./feat2.jpg";
import feature3 from "./feat3.jpg";

import banner1 from "./banner1.png";
import banner2 from "./banner2.png";

import checkmark from "./checkmark.png";
import about_img from "./portrait-young-woman-black-floppy-hat-isolated-white-wall.jpg";


export const assets = {
  logo,
  search_icon,
  user_icon,
  cart_icon,
  add_icon,
  order_icon,
  instagram_icon,
  facebook_icon,
  twitter_icon,
  box_icon,
  product_list_icon,
  menu_icon,
  arrow_icon,
  increase_arrow,
  decrease_arrow,
  arrow_right_icon_colored,
  my_location_image,
  arrow_icon_white,
  heart_icon,
  star_icon,
  redirect_icon,
  star_dull_icon,
  
  header_fashion_image_1,
  header_fashion_image_2,
  header_fashion_image_3,
  about_img,

  venu_watch_image,
  upload_area,
  
  feature1,
  feature2,
  feature3,
  banner1,
  banner2,
  product_Chic_Crossbody_Bag,
  product_Classic_Denim_Jacket,
  product_Classic_White_Sneakers,
  product_Elegant_Silk_Scarf,
  product_Leather_Biker_Jacket,
  product_Minimalist_Leather_Wallet,
  product_Slim_Fit_Chinos,
  product_Stylish_Aviator_Sunglasses,
  product_Tailored_Wool_Coat,
  product_Vintage_Crew_Neck_TShirt,
  checkmark,
};

export const BagIcon = () => {
  return (
    <svg className="w-5 h-5 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 .917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z" />
    </svg>
  )
}

export const CartIcon = () => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.75 0.75H3.75L5.76 10.7925C5.82858 11.1378 6.01643 11.448 6.29066 11.6687C6.56489 11.8895 6.90802 12.0067 7.26 12H14.55C14.902 12.0067 15.2451 11.8895 15.5193 11.6687C15.7936 11.448 15.9814 11.1378 16.05 10.7925L17.25 4.5H4.5M7.5 15.75C7.5 16.1642 7.16421 16.5 6.75 16.5C6.33579 16.5 6 16.1642 6 15.75C6 15.3358 6.33579 15 6.75 15C7.16421 15 7.5 15.3358 7.5 15.75ZM15.75 15.75C15.75 16.1642 15.4142 16.5 15 16.5C14.5858 16.5 14.25 16.1642 14.25 15.75C14.25 15.3358 14.5858 15 15 15C15.4142 15 15.75 15.3358 15.75 15.75Z" stroke="#4b5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <rect width="18" height="18" fill="white" />
      </defs>
    </svg>

  )
}

export const BoxIcon = () => (
  <svg className="w-5 h-5 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 21v-9m3-4H7.5a2.5 2.5 0 1 1 0-5c1.5 0 2.875 1.25 3.875 2.5M14 21v-9m-9 0h14v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8ZM4 8h16a1 1 0 0 1 1 1v3H3V9a1 1 0 0 1 1-1Zm12.155-5c-3 0-5.5 5-5.5 5h5.5a2.5 2.5 0 0 0 0-5Z" />
  </svg>
);

export const HomeIcon = () => (
  <svg className="w-5 h-5 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5" />
  </svg>
);

export const productsDummyData = [
  {
    "_id": "67a1f4e43f34a77b6dde9144",
    "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    "name": "Classic Denim Jacket",
    "description": "This timeless denim jacket offers a perfect blend of comfort and style. Its versatile design and premium material make it a wardrobe staple for any season.",
    "price": 79.99,
    "offerPrice": 59.99,
    "image": [product_Classic_Denim_Jacket],
    "category": "Outerwear",
    "date": 1738667236865,
    "__v": 0
  },
  {
    "_id": "67a1f52e3f34a77b6dde914a",
    "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    "name": "Leather Biker Jacket",
    "description": "The leather biker jacket exudes edgy style with its smooth, durable material. Perfect for adding a bold touch to any outfit, this jacket is a must-have for fashion-forward individuals.",
    "price": 149.99,
    "offerPrice": 129.99,
    "image": [product_Leather_Biker_Jacket],
    "category": "Outerwear",
    "date": 1738667310300,
    "__v": 0
  },
  {
    "_id": "67a1f5663f34a77b6dde914c",
    "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    "name": "Slim Fit Chinos",
    "description": "These slim-fit chinos are crafted from high-quality cotton fabric for a comfortable, stylish look. Perfect for casual outings or business casual settings, they offer a modern silhouette with flexibility.",
    "price": 59.99,
    "offerPrice": 49.99,
    "image": [product_Slim_Fit_Chinos],
    "category": "Bottoms",
    "date": 1738667366224,
    "__v": 0
  },
  {
    "_id": "67a1f5993f34a77b6dde914e",
    "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    "name": "Vintage Crew Neck T-Shirt",
    "description": "This vintage-inspired crew neck t-shirt is designed for casual comfort. Made with soft cotton fabric, it provides a relaxed fit and comes in various trendy colors.",
    "price": 29.99,
    "offerPrice": 24.99,
    "image": [product_Vintage_Crew_Neck_TShirt],
    "category": "Tops",
    "date": 1738667417511,
    "__v": 0
  },
  {
    "_id": "67a1f5ef3f34a77b6dde9150",
    "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    "name": "Stylish Aviator Sunglasses",
    "description": "Add a touch of sophistication with these stylish aviator sunglasses. Their timeless design and high-quality lenses provide both UV protection and unmatched style.",
    "price": 119.99,
    "offerPrice": 99.99,
    "image": [product_Stylish_Aviator_Sunglasses],
    "category": "Accessories",
    "date": 1738667503075,
    "__v": 0
  },
  {
    "_id": "67a1f70c3f34a77b6dde9156",
    "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    "name": "Minimalist Leather Wallet",
    "description": "This minimalist leather wallet is designed for style and practicality. Its slim, sleek design fits comfortably in your pocket while offering plenty of space for your essentials.",
    "price": 59.99,
    "offerPrice": 49.99,
    "image": [product_Minimalist_Leather_Wallet],
    "category": "Accessories",
    "date": 1738667788883,
    "__v": 0
  },
  {
    "_id": "67a1f7c93f34a77b6dde915a",
    "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    "name": "Chic Crossbody Bag",
    "description": "This chic crossbody bag is perfect for any occasion. Made with premium leather, it combines function and style with multiple compartments to keep your essentials organized.",
    "price": 139.99,
    "offerPrice": 119.99,
    "image": [product_Chic_Crossbody_Bag],
    "category": "Bags",
    "date": 1738667977644,
    "__v": 0
  },
  {
    "_id": "67a1f8363f34a77b6dde915c",
    "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    "name": "Classic White Sneakers",
    "description": "These classic white sneakers are designed for ultimate comfort and style. Perfect for any casual look, they pair effortlessly with jeans, chinos, or shorts.",
    "price": 69.99,
    "offerPrice": 59.99,
    "image": [product_Classic_White_Sneakers],
    "category": "Footwear",
    "date": 1738668086331,
    "__v": 0
  },
  {
    "_id": "67a1f85e3f34a77b6dde915e",
    "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    "name": "Elegant Silk Scarf",
    "description": "This elegant silk scarf adds a luxurious touch to any outfit. Its soft fabric and exquisite design make it the perfect accessory for both casual and formal occasions.",
    "price": 49.99,
    "offerPrice": 39.99,
    "image": [product_Elegant_Silk_Scarf],
    "category": "Accessories",
    "date": 1738668126660,
    "__v": 0
  },
  {
    "_id": "67a1fa4b3f34a77b6dde9166",
    "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    "name": "Tailored Wool Coat",
    "description": "This tailored wool coat is designed for both warmth and sophistication. Perfect for colder months, it features a classic cut and premium wool material for a refined look.",
    "price": 199.99,
    "offerPrice": 169.99,
    "image": [product_Tailored_Wool_Coat],
    "category": "Outerwear",
    "date": 1738668619198,
    "__v": 0
  }
];

export const userDummyData = {
  "_id": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
  "name": "GreatStack",
  "email": "admin@example.com",
  "imageUrl": "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18ycnlnUnFiUDBYT2dEZ2h1ZmRXcGlpdWV5OXoiLCJyaWQiOiJ1c2VyXzJzWkZIUzFVSUl5c0p5RFZ6Q3BRaFVoVElodyJ9",
  "cartItems": {
    // "67a1f4e43f34a77b6dde9144": 3
  },
  "__v": 0
}

export const orderDummyData = [
  {
    "_id": "67a20934b3db72db5cc77b2b",
    "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    "items": [
      {
        "product": {
          "_id": "67a1f4e43f34a77b6dde9144",
          "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
          "name": "Apple AirPods Pro",
          "description": "Apple AirPods Pro (2nd Gen) with MagSafe Case (USB-C) provide excellent sound, active noise cancellation, and a comfortable fit. The USB-C case ensures quick charging, and they pair seamlessly with Apple devices for an effortless audio experience.",
          "price": 499.99,
          "offerPrice": 399.99,
          "image": [
            "https://res.cloudinary.com/djbvf02yt/image/upload/v1738667237/lrllaprpos2pnp5c9pyy.png",
            "https://res.cloudinary.com/djbvf02yt/image/upload/v1738667238/jqotgy2rvm36vfjv6lxl.png",
            "https://res.cloudinary.com/djbvf02yt/image/upload/v1738667238/niw7tqxvjsxt7wcehxeo.png",
            "https://res.cloudinary.com/djbvf02yt/image/upload/v1738667237/h8cq4x9cfzqzwaiarvpk.png"
          ],
          "category": "Earphone",
          "date": 1738667236865,
          "__v": 0
        },
        "quantity": 1,
        "_id": "67a20934b3db72db5cc77b2c"
      }
    ],
    "amount": 406.99,
    "address": {
      "_id": "67a1e4233f34a77b6dde9055",
      "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
      "fullName": "GreatStack",
      "phoneNumber": "0123456789",
      "pincode": 654321,
      "area": "Main Road , 123 Street, G Block",
      "city": "City",
      "state": "State",
      "__v": 0
    },
    "status": "Order Placed",
    "date": 1738672426822,
    "__v": 0
  },
  {
    "_id": "67a20949b3db72db5cc77b2e",
    "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    "items": [
      {
        "product": {
          "_id": "67a1f52e3f34a77b6dde914a",
          "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
          "name": "Bose QuietComfort 45",
          "description": "The Bose QuietComfort 45 headphones are engineered for exceptional sound quality and unparalleled noise cancellation. With a 24-hour battery life and comfortable, lightweight design, these headphones deliver premium audio for any environment. Whether on a flight, in the office, or at home, the Bose QC45 blocks out distractions, offering an immersive listening experience.",
          "price": 429.99,
          "offerPrice": 329.99,
          "image": [
            "https://res.cloudinary.com/djbvf02yt/image/upload/v1738667311/m16coelz8ivkk9f0nwrz.png"
          ],
          "category": "Headphone",
          "date": 1738667310300,
          "__v": 0
        },
        "quantity": 1,
        "_id": "67a20949b3db72db5cc77b2f"
      }
    ],
    "amount": 335.99,
    "address": {
      "_id": "67a1e4233f34a77b6dde9055",
      "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
      "fullName": "GreatStack",
      "phoneNumber": "0123456789",
      "pincode": 654321,
      "area": "Main Road , 123 Street, G Block",
      "city": "City",
      "state": "State",
      "__v": 0
    },
    "status": "Order Placed",
    "date": 1738672448031,
    "__v": 0
  },
  {
    "_id": "67a209bab3db72db5cc77b34",
    "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    "items": [
      {
        "product": {
          "_id": "67a1f4e43f34a77b6dde9144",
          "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
          "name": "Apple AirPods Pro",
          "description": "Apple AirPods Pro (2nd Gen) with MagSafe Case (USB-C) provide excellent sound, active noise cancellation, and a comfortable fit. The USB-C case ensures quick charging, and they pair seamlessly with Apple devices for an effortless audio experience.",
          "price": 499.99,
          "offerPrice": 399.99,
          "image": [
            "https://res.cloudinary.com/djbvf02yt/image/upload/v1738667237/lrllaprpos2pnp5c9pyy.png",
            "https://res.cloudinary.com/djbvf02yt/image/upload/v1738667238/jqotgy2rvm36vfjv6lxl.png",
            "https://res.cloudinary.com/djbvf02yt/image/upload/v1738667238/niw7tqxvjsxt7wcehxeo.png",
            "https://res.cloudinary.com/djbvf02yt/image/upload/v1738667237/h8cq4x9cfzqzwaiarvpk.png"
          ],
          "category": "Earphone",
          "date": 1738667236865,
          "__v": 0
        },
        "quantity": 1,
        "_id": "67a209bab3db72db5cc77b35"
      }
    ],
    "amount": 406.99,
    "address": {
      "_id": "67a1e4233f34a77b6dde9055",
      "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
      "fullName": "GreatStack",
      "phoneNumber": "0123456789",
      "pincode": 654321,
      "area": "Main Road , 123 Street, G Block",
      "city": "City",
      "state": "State",
      "__v": 0
    },
    "status": "Order Placed",
    "date": 1738672560698,
    "__v": 0
  }
]

export const addressDummyData = [
  {
    "_id": "67a1e4233f34a77b6dde9055",
    "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    "fullName": "GreatStack",
    "phoneNumber": "0123456789",
    "pincode": 654321,
    "area": "Main Road , 123 Street, G Block",
    "city": "City",
    "state": "State",
    "__v": 0
  }
]