"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Spinner from "./components/common/Spinner";
import ErrorHandler from "./components/common/ErrorHandler"; 

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const productsPerPage = 20;

  const fetchProducts = async (page) => {
    setLoading(true);
    const skip = (page - 1) * productsPerPage;
    try {
      const res = await fetch(
        `https://next-ecommerce-api.vercel.app/products?limit=${productsPerPage}&skip=${skip}`
      );
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
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
        <Spinner />
      ) : products.length === 0 ? (
        <ErrorHandler />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 shadow-md rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg"
            >
              <ImageCarousel images={product.images} />
              <h2 className="text-xl font-semibold mb-2 text-black">{product.title}</h2>
              <p className="text-gray-800">{product.category}</p>
              <p className="text-gray-900 font-bold">${product.price}</p>

              <Link href={`/products/${product.id}`}>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  View Details
                </button>
              </Link>
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

function ImageCarousel({ images }) {
  const [currentImage, setCurrentImage] = useState(0);

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative">
      <img
        src={images[currentImage]}
        alt={`Product Image ${currentImage + 1}`}
        className="h-80 w-full object-cover mb-4"
      />
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrevImage}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded-full"
          >
            &#8249;
          </button>
          <button
            onClick={handleNextImage}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded-full"
          >
            &#8250;
          </button>
        </>
      )}
    </div>
  );
}
