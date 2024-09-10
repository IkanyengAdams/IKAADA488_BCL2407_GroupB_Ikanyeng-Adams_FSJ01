"use client";

import { useState, useEffect } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const productsPerPage = 20;

  const fetchProducts = async (page) => {
    setLoading(true);
    const skip = (page - 1) * productsPerPage;
    const res = await fetch(
      `https://next-ecommerce-api.vercel.app/products?limit=${productsPerPage}&skip=${skip}`
    );
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 shadow-md rounded-lg">
              <img
                src={product.images[0]}
                alt={product.title}
                className="h-80 w-full object-cover mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
              <p className="text-gray-700">{product.category}</p>
              <p className="text-gray-900 font-bold">${product.price}</p>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between mt-4">
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded"
          onClick={handlePrevPage}
          disabled={page === 1}
        >
          Previous Page
        </button>
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded"
          onClick={handleNextPage}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}
