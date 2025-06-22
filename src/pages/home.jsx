// src/pages/Home.jsx
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

const Home = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all categories
  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  // Fetch products based on selectedCategory
  useEffect(() => {
    setLoading(true);
    const url =
      selectedCategory === 'all'
        ? 'https://fakestoreapi.com/products'
        : `https://fakestoreapi.com/products/category/${selectedCategory}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch products.');
        setLoading(false);
      });
  }, [selectedCategory]);

  return (
    <div className='w-full min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='w-full md:h-[150px] h-[130px] py-2 px-2 bg-white shadow-sm sticky top-0 z-10'>
        <h1 className='text-[20px] font-semibold text-gray-800'>
          Hi, {user?.name || 'Guest'}
        </h1>
        <p className='mt-2 text-gray-500 flex items-center'>
          <MapPin className='w-4 h-4 mr-2' /> Tokyo, Shibuya
        </p>

        {/* Category Buttons */}
        <div className='overflow-x-auto whitespace-nowrap scrollbar-hide mt-4'>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`w-[100px] h-[35px] rounded-full border cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`w-[150px] h-[35px] ml-2 rounded-full border cursor-pointer capitalize ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className='p-4 md:pb-6 pb-[5rem]'>
        {error && (
          <div className='w-full h-[70vh] flex justify-center items-center'>
            <p className='text-red-500 mb-4'>{error}</p>
          </div>
        )}
        {loading ? (
          <div className='w-full flex justify-center items-center h-[70vh]'>
            <div id="loader"></div>
          </div>
        ) : (
          <div className='grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
            {products.map((product) => (
              <div
                key={product.id} onClick={() => navigate(`/book/${product.id}`)}
                className=' bg-white shadow-sm rounded-xl overflow-hidden transition duration-300 cursor-pointer'
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
                    {product.title.length > 30
                      ? product.title.slice(0, 30) + '...'
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
