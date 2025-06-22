// src/pages/Home.jsx
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

const Home = () => {
  const { user, logout, deleteAccount } = useAuthStore();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Error qo‘shildi

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
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

  return (
    <div className='w-full min-h-screen bg-gray-50'>
      <div className='w-full py-4 px-4 bg-white shadow-sm sticky top-0 z-10'>
        <h1 className='text-[20px] font-semibold text-gray-800'>
          Hi, {user?.name || 'Guest'}
        </h1>
        <p className='mt-2 text-gray-500 flex items-center'>
          <MapPin className='w-4 h-4 mr-2' /> Tokyo, Shibuya
        </p>
        {/* <div className='mt-4'>
          <button className='px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'>
            All
          </button>
        </div> */}
      </div>

      <div className='p-4 md:pb-6 pb-[5.3rem]'>
        {error && (
          <p className='text-red-500 mb-4'>{error}</p>
        )}
        {loading ? (
          <div className='w-full flex justify-center items-center h-[50vh]'>
            <div id="loader"></div>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {products.map(product => (
              <div
                key={product.id}
                className='bg-white shadow-sm rounded-xl overflow-hidden transition duration-300'
              >
                <div className='w-full h-[250px] flex items-center justify-center'>
                  <img
                    src={product.image}
                    alt={product.title}
                    className='max-h-[220px] object-contain'
                  />
                </div>
                <div className='p-4'>
                  <h2 className='text-sm font-semibold text-gray-800 mb-2'>
                    {product.title.length > 60
                      ? product.title.slice(0, 60) + '...'
                      : product.title}
                  </h2>
                  <p className='text-blue-600 font-bold text-lg'>
                    ${product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
