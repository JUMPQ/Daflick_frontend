'use client'
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsLetter from "@/components/NewsLetter";

const ContactUs = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center px-6 md:px-16 lg:px-32 bg-gray-50">
        {/* Hero Section */}
        <section className="pt-16 pb-24 w-full text-center bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg shadow-lg">
          <h1 className="text-4xl md:text-5xl font-bold">Get in Touch with Fashion</h1>
          <p className="mt-4 text-xl md:text-2xl">We’d love to hear from you. Whether you have a question or just want to say hello, we’re here to help!</p>
        </section>

        {/* Contact Info Section */}
        <section className="mt-16 md:mt-24 text-center lg:text-left grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col items-center lg:items-start bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto lg:mx-0">
            <h2 className="text-3xl font-semibold text-gray-800">Contact Information</h2>
            <div className="w-16 h-1 bg-orange-600 rounded-full my-4"></div>
            <p className="text-lg md:text-xl text-gray-700 mb-6">
              If you have any inquiries or need assistance, feel free to reach out to us. Our customer support team is available 24/7 and ready to assist with any of your concerns.
            </p>
            <div className="text-gray-700">
              <p className="text-lg">Email: support@fashion.com</p>
              <p className="text-lg">Phone: +1 (123) 456-7890</p>
              <p className="text-lg">Address: 123 Fashion Street, City, Country</p>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="flex flex-col items-center lg:items-start bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto lg:mx-0">
            <h2 className="text-3xl font-semibold text-gray-800">Send Us a Message</h2>
            <div className="w-16 h-1 bg-orange-600 rounded-full mx-auto my-4"></div>
            <form className="w-full space-y-6">
              <div>
                <label htmlFor="name" className="block text-lg text-gray-800 mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-lg text-gray-800 mb-2">Your Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-lg text-gray-800 mb-2">Your Message</label>
                <textarea
                  id="message"
                  className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg"
                  rows="6"
                  placeholder="Write your message here"
                  required
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="text-white bg-orange-600 py-3 px-8 rounded-lg text-lg hover:bg-orange-500 transition duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Call to Action Section */}
       
      </div>
      <div className="px-6 md:px-16 lg:px-32 py-5">
      <NewsLetter /> 
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
