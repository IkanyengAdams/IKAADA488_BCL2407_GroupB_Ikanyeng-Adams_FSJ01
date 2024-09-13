"use client";

import "../app/global.css";
import { FaHeart, FaShoppingCart, FaUser, FaBars } from "react-icons/fa";
import { useState } from "react";

export default function Layout({ children }) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <html lang="en">
      <body>
        <nav className="bg-gray-800 p-4 fixed top-0 left-0 w-full z-50">
          <div className="flex items-center justify-between">
            
            <a href="/" className="flex items-center">
              <img
                src="/online-shop.png"
                alt="Shop Logo"
                className="h-8 mr-2"
              />
              <h1 className="text-white text-2xl font-bold">SwiftCart</h1>
            </a>

            
            <button onClick={toggleNav}>
  <FaBars />
</button>

<div>
  <div>
    <FaHeart />
    <span>Wishlist</span>
  </div>
  <div>
    <FaShoppingCart />
    <span>Cart</span>
  </div>
  <div>
    <FaUser />
    <span>Login</span>
  </div>
</div>

<div>
  {isNavOpen && (
    <div>
      <div>
        <FaHeart />
        <span>Wishlist</span>
      </div>
      <div>
        <FaShoppingCart />
        <span>Cart</span>
      </div>
      <div>
        <FaUser />
        <span>Login</span>
      </div>
    </div>
  )}


            </div>
          </div>
        </nav>

        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
