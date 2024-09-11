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
        setProduct(data);
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

  return <img src={product.images[0]} alt={product.title} />;
}
