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
}
