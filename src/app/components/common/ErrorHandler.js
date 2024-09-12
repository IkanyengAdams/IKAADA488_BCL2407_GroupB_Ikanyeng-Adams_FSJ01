"use client";

export default function ErrorComponent() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center">
      
        <h1 className="text-2xl font-bold text-gray-700 mb-2">
          No product(s) found
        </h1>
        <p className="text-gray-500">
          It seems like there are no products available at the moment.
        </p>
      </div>
    </div>
  );
}
