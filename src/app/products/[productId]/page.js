"use client";

import Spinner from "../../components/common/Spinner";
import { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useRouter } from "next/navigation";
import ErrorHandler from "../../components/common/ErrorHandler";

export default function ProductDetail({ params }) {
  const productId = params.productId;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

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
          rating: data.rating,
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

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-500" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-500" />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-500" />);
    }

    return stars;
  };

  if (loading) return <Spinner />;
  if (!product) return <ErrorHandler />;

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

          <p className="text-gray-500 mb-2">Category: {product.category}</p>

          <div className="flex items-center mb-4">
            <p className="text-gray-500 mr-2">Rating:</p>
            <div className="flex">{renderStars(product.rating)}</div>
          </div>
          <p className="text-gray-900 font-bold text-2xl">${product.price}</p>

          <button
            onClick={() => router.push("/")}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Back to Products
          </button>
        </div>
      </div>
    </div>
  );
}
