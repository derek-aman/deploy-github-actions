import React,{useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'

const UpdateProduct = () => {
      const [name, setName] = useState("");
      const [price, setPrice] = useState("");
      const [category, setCategory] = useState("");
      const [company, setCompany] = useState("");
      const params = useParams()
      const navigate = useNavigate();

      useEffect(() => {
        
        getProductDetails();
      }, [])
    
    const getProductDetails = async () => {
        console.log(params);
        let result = await fetch(`http://localhost:5000/product/${params.id}`);
        result = await result.json();
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)


    }

      const updateProduct = async (e) => {
        e.preventDefault();
        console.log(name, price, category, company)
        let result =await fetch(`http://localhost:5000/product/${params.id}`,
            {
                method : 'PUT',
            body : JSON.stringify({name, price, category, company}),
            headers: {
                'Content-Type': 'application/json'
            }
            }
        );
        result = await result.json()
        navigate('/products')

      }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 px-4">
      <div className="w-full max-w-lg bg-gray-100 rounded-xl shadow-2xl p-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
         Update Product
        </h2>

        <form onSubmit={updateProduct} className="space-y-5">
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
            Update Product
          </button>
         
        </form>
      </div>
    </div>
  )
}

export default UpdateProduct
