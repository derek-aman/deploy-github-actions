import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(""); // search state

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      let results = await fetch("http://localhost:5000/products");
      results = await results.json();
      setProducts(results);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const result = await fetch(`http://localhost:5000/product/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });
      const response = await result.json();
      console.log("Deleted:", response);

      // Update UI after delete
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // 🔍 Filtered Products based on search
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase()) ||
    p.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-950 py-10 px-4">
      <h1 className="text-3xl font-bold text-white text-center mb-10">
        🛍️ Products
      </h1>

      {/* Search Box */}
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-md">
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search Product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 
                       bg-white/90 backdrop-blur-sm shadow-md 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                       text-gray-700 placeholder-gray-400 transition-all"
          />
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-gray-400 text-center">No Products Found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-gray-800 rounded-xl p-6 shadow-lg hover:scale-105 transform transition-all duration-300 relative"
            >
              <h2 className="text-xl font-semibold text-white mb-2">{product.name}</h2>
              <p className="text-gray-300 mb-1">
                💰 Price: <span className="text-green-400">{product.price}</span>
              </p>
              <p className="text-gray-300 mb-1">🏷️ Category: {product.category}</p>
              <p className="text-gray-300 mb-1">🏢 Company: {product.company}</p>

              {/* Delete Button */}
              <button
                onClick={() => deleteProduct(product._id)}
                className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm transition-all"
              >
                Delete
              </button>

              {/* Update Button */}
              <button className="absolute bottom-3 right-3">
                <Link
                  to={`/update/${product._id}`}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm transition-all"
                >
                  Update
                </Link>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
