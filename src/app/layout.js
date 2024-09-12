import "../app/global.css";
import { FaHeart, FaShoppingCart, FaBalanceScale, FaUser } from "react-icons/fa";

export default function Layout({ children }) {
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

          
            <div className="flex items-center space-x-4">
              <FaHeart className="text-white text-xl cursor-pointer" />
              <FaBalanceScale className="text-white text-xl cursor-pointer" />
              <FaShoppingCart className="text-white text-xl cursor-pointer" />
              <FaUser className="text-white text-xl cursor-pointer" />
            </div>
          </div>
        </nav>
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
