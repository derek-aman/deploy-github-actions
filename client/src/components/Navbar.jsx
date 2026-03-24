import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-black/80 backdrop-blur-lg fixed top-0 left-0 w-full z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Brand */}
        <Link
          to="/"
          className="text-2xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent hover:opacity-90 transition duration-300"
        >
          MyApp
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-8">
          {/* Always visible */}
          <Link
            to="/"
            className="relative text-gray-300 tracking-tighter hover:text-white transition-colors duration-300 group"
          >
            Home
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          {/* If logged in */}
          {auth && (
            <>
              <Link
                to="/add"
                className="relative text-gray-300 tracking-tighter hover:text-white transition-colors duration-300 group"
              >
                Add Product
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <Link
                to="/update"
                className="relative text-gray-300 tracking-tighter hover:text-white transition-colors duration-300 group"
              >
                Update Product
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <Link
                to="/profile"
                className="relative text-gray-300 tracking-tighter hover:text-white transition-colors duration-300 group"
              >
                Profile
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/products"
                className="relative text-gray-300 tracking-tighter hover:text-white transition-colors duration-300 group"
              >
                Products
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <button
                onClick={handleLogout}
                className="relative text-gray-300 tracking-tighter hover:text-white transition-colors duration-300 group"
              >
                Logout
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
            </>
          )}

          {/* If not logged in */}
          {!auth && (
            <>
              <Link
                to="/signup"
                className="relative text-gray-300 tracking-tighter hover:text-white transition-colors duration-300 group"
              >
                Sign Up
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <Link
                to="/login"
                className="relative text-gray-300 tracking-tighter hover:text-white transition-colors duration-300 group"
              >
                Login
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
