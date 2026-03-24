import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import PrivateComponents from './components/PrivateComponents';
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import Login from "./pages/Login";
import Products from './pages/Products';
import UpdateProduct from './pages/UpdateProduct';

function App() {
  return (
    <BrowserRouter>
      <div className="bg-black min-h-screen text-white">
        <Navbar />
        <div className="pt-20 px-6"> {/* Padding so Navbar doesn’t overlap */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<PrivateComponents />}>
              <Route path="/products" element={<Products />} />
              <Route path="/add" element={<AddProduct />} />
              <Route path="/update/:id" element={<UpdateProduct/>} />
              <Route path="/logout" element={<h1>Logout Components</h1>} />
              <Route path="/profile" element={<h1>Profile Components</h1>} />
            </Route>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
