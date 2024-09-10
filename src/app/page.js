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
            </div>
          ))}
        </div>
      )}

      
    </div>
  );
}
