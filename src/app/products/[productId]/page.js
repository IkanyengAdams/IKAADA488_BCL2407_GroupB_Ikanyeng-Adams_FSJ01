"use client";

import Spinner from "../../components/common/Spinner";
import { useEffect, useState } from "react";

export default function ProductDetail({ params }) {
  const productId = params.productId;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://next-ecommerce-api.vercel.app/products/${productId}`
        );
        const data = await res.json();
        setProduct({
          title: data.title,
          description: data.description,
          category: data.category,
          price: data.price,
          image: data.images[0],
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <Spinner />;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row bg-white p-6 shadow-md rounded-lg">
        <div className="lg:w-1/3 w-full mb-4 lg:mb-0 lg:mr-4">
          <img
            src={product.image}
            alt={product.title}
            className="h-auto w-full object-cover rounded-md"
          />
        </div>

        <div className="lg:w-2/3 w-full">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-gray-500 mb-4">Category: {product.category}</p>
          <p className="text-gray-900 font-bold text-2xl">${product.price}</p>
        </div>
      </div>
    </div>
  );
}
