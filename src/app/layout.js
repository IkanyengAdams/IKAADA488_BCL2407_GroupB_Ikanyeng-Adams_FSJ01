import "../app/global.css";

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-gray-800 p-4 fixed top-0 left-0 w-full z-50">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <img
                src="/online-shop.png"
                alt="Shop Logo"
                className="h-8 mr-2"
              />
              <h1 className="text-white text-2xl font-bold">SwiftCart</h1>
            </a>
          </div>
        </nav>
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
