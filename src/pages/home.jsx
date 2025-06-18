// src/pages/Home.jsx
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { MapPin, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

const LOCAL_KEY = 'likedProducts';

const Home = () => {
  const { user, logout, deleteAccount } = useAuthStore();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [liked, setLiked] = useState([]);

  // Load liked products from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(LOCAL_KEY));
    setLiked(Array.isArray(stored) ? stored : []);
  }, []);

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Something went wrong while fetching products.");
        setLoading(false);
      });
  }, []);

  // Save liked products to localStorage when changed
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(liked));
  }, [liked]);

  const handleLike = (id) => {
    setLiked((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDelete = () => {
    const confirmed = window.confirm("Aka, hisobingizni butunlay o‘chirishni istaysizmi?");
    if (confirmed) {
      deleteAccount();
      navigate('/register');
    }
  };

  return (
    <div className='w-full min-h-screen py-4 px-4 bg-gray-50'>
      <div className='w-full h-[90px] bg-red-500 fixed top-0 left-0 py-3 px-3 flex flex-col justify-center z-10'>
        <h1 className='text-3xl text-white'>Hi {user?.name || 'Guest'}</h1>
        <p className='mt-2 text-gray-200 flex items-center'>
          <MapPin className='w-4 h-4 mr-2' />
          {user?.address ? user.address : 'No address'} Tokio, Shibuya
        </p>
        <div className="mt-2 flex gap-2">
          <button onClick={handleLogout} className="bg-white text-red-500 px-3 py-1 rounded hover:bg-red-100 transition">Logout</button>
          <button onClick={handleDelete} className="bg-white text-red-700 px-3 py-1 rounded hover:bg-red-200 transition">Delete Account</button>
        </div>
      </div>
      <div className='w-full pt-[7rem]'>
        {loading && <div className="text-center text-lg text-gray-700">Loading products...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}
        <div className='w-full flex flex-wrap justify-between items-center gap-2'>
          {!loading && !error && products.map((product) => (
            <div key={product.id} className='w-[250px] h-[350px] bg-blue-500 mt-2 rounded-[10px] p-2 flex flex-col justify-between relative'>
              <button
                onClick={() => handleLike(product.id)}
                className="absolute top-2 right-2 z-10"
                aria-label={liked.includes(product.id) ? "Unlike" : "Like"}
              >
                <Heart
                  className={`w-6 h-6 transition ${
                    liked.includes(product.id) ? "fill-red-500 text-red-500" : "text-white"
                  }`}
                  fill={liked.includes(product.id) ? "#ef4444" : "none"}
                />
              </button>
              <h1 className='text-[15px] text-white font-semibold mb-2'>{product.title}</h1>
              <img
                src={product.images?.[2] || product.images?.[0] || 'https://via.placeholder.com/250x280?text=No+Image'}
                alt={product.title}
                className='w-full h-[70%] object-cover rounded mb-2'
              />
              <p className='text-white font-bold text-lg'>${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
