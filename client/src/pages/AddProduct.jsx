import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const navigate = useNavigate();

  const handleAddProduct = async (e) => {
    e.preventDefault();

    // 👇 get logged in user id from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user && user._id;

    console.log("🟢 Sending:", { name, price, category, company, userId });

    try {
      const result = await fetch("http://localhost:5000/add-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        // 👇 now also sending userId
        body: JSON.stringify({ name, price, category, company, userId }),
      });

      const response = await result.json();
      console.log("✅ Response:", response);

      if (response) {
        alert("Product added successfully!");
        setName("");
        setPrice("");
        setCategory("");
        setCompany("");
        navigate('/products')
        
      }
    } catch (error) {
      console.error("❌ Add Product Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 px-4">
      <div className="w-full max-w-lg bg-gray-100 rounded-xl shadow-2xl p-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          ➕ Add New Product
        </h2>

        <form onSubmit={handleAddProduct} className="space-y-5">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all"
          >
            Add Product
          </button>
         
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
