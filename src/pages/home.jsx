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
          <MapPin className='w-4 h-4 mr-2' /> Tokio, Shibuya
        </p>
      </div>
    </div>
  );
};

export default Home;
