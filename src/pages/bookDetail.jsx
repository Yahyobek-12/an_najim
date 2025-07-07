// BookDetail.jsx
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ChevronLeft, Heart } from 'lucide-react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CART_KEY = 'cartProducts';
const LIKE_KEY = 'likedProducts';

const BookDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [similarError, setSimilarError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Mahsulotni yuklashda xato');
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!product) return;
    const storedLikes = JSON.parse(localStorage.getItem(LIKE_KEY)) || [];
    const storedCart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    setLiked(storedLikes.some(item => item.id === product.id));
    const existing = storedCart.find(item => item.id === product.id);
    setCartQuantity(existing ? existing.quantity : 0);
  }, [product]);

  useEffect(() => {
    if (!product) return;
    setSimilarError(null);
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        const similars = data.filter(
          item => item.category === product.category && item.id !== product.id
        );
        setSimilarProducts(similars);
      })
      .catch(() => {
        setSimilarError("O'xshash mahsulotlarni yuklashda xato");
      });
  }, [product]);

  const handleAddToCart = () => {
    const stored = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    const existing = stored.find(item => item.id === product.id);
    let updatedCart;

    if (existing) {
      updatedCart = stored.map(item =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
      setCartQuantity(existing.quantity + 1);
    } else {
      updatedCart = [...stored, { ...product, quantity: 1 }];
      setCartQuantity(1);
    }

    localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
    toast.success("Mahsulot savatchaga qo'shildi!");
  };

  const handleIncrement = () => {
    handleAddToCart();
  };

  const handleDecrement = () => {
    const stored = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    const existing = stored.find(item => item.id === product.id);
    if (!existing) return;

    let updatedCart;
    if (existing.quantity === 1) {
      updatedCart = stored.filter(item => item.id !== product.id);
      setCartQuantity(0);
    } else {
      updatedCart = stored.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      setCartQuantity(existing.quantity - 1);
    }

    localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
  };

  const handleLike = () => {
    const stored = JSON.parse(localStorage.getItem(LIKE_KEY)) || [];
    let updated;
    if (liked) {
      updated = stored.filter(item => item.id !== product.id);
    } else {
      updated = [...stored, product];
    }
    localStorage.setItem(LIKE_KEY, JSON.stringify(updated));
    setLiked(!liked);
  };

  if (loading) return <div className='w-full min-h-screen flex items-center justify-center'><div id="loader"></div></div>;
  if (error) return <div className='p-10 text-center text-red-500'>{error}</div>;

  return (
    <div className='w-full min-h-screen py-4 px-2 sm:px-4 bg-gray-50'>
      <div className='w-full h-[50px] flex items-center justify-between mb-4'>
        <div className='flex items-center gap-2'>
          <ChevronLeft /> <Link to='/home' className="text-blue-600 hover:underline">Bosh sahifaga qaytish</Link>
        </div>
        <button
          className={`py-2 px-2 bg-white rounded-[10px] cursor-pointer shadow hover:bg-blue-50 transition ${liked ? 'ring-2 ring-red-400' : ''}`}
          onClick={handleLike}
        >
          <Heart className={liked ? "text-red-500 fill-red-500" : "text-blue-500"} fill={liked ? "#ef4444" : "none"} />
        </button>
      </div>

      <div className='w-full flex flex-col lg:flex-row items-center lg:items-stretch gap-6 rounded-lg p-3 sm:p-6 bg-white shadow'>
        <div className='w-full max-w-xs sm:max-w-sm md:max-w-md lg:w-[380px] flex-shrink-0 flex items-center justify-center bg-gray-100 rounded-[10px] mx-auto lg:mx-0'>
          <img
            src={product.image}
            alt={product.title}
            className='w-[80%] h-[220px] sm:h-[260px] md:h-[300px] object-contain rounded-[10px]'
          />
        </div>
        <div className='flex-1 flex flex-col justify-between'>
          <div>
            <p className='font-bold text-gray-600 text-sm sm:text-base'>{product.category}</p>
            <h1 className='text-[18px] sm:text-[22px] md:text-[25px] font-bold mt-2 text-black'>{product.title}</h1>
            <h2 className='text-[20px] sm:text-[25px] md:text-[30px] font-bold mt-2 text-blue-500'>${product.price}</h2>
            <Disclosure as="div" className="p-2" defaultOpen={true}>
              <DisclosureButton className="group flex w-full items-center justify-between">
                <span className="text-sm/6 text-black font-bold">
                  Kitob haqida
                </span>
                <ChevronDownIcon className="size-5 text-black group-data-open:rotate-180" />
              </DisclosureButton>
              <DisclosurePanel className="mt-2 text-gray-500">
                <p>{product.description.slice(0, 300)}...</p>
              </DisclosurePanel>
            </Disclosure>
          </div>

          {cartQuantity === 0 ? (
            <button
              className='w-full h-[45px] sm:h-[50px] bg-blue-500 text-white rounded-[10px] font-semibold text-base sm:text-lg transition hover:bg-blue-600 mt-4'
              onClick={handleAddToCart}
            >
              Savatga qo'shish
            </button>
          ) : (
            <div className='w-full flex items-center justify-between mt-4'>
              <button
                className='w-10 h-10 bg-gray-200 text-black rounded-lg text-xl'
                onClick={handleDecrement}
              >–</button>
              <span className='text-lg font-semibold'>{cartQuantity}</span>
              <button
                className='w-10 h-10 bg-blue-500 text-white rounded-lg text-xl'
                onClick={handleIncrement}
              >+</button>
            </div>
          )}
        </div>
      </div>

      <div className="w-full min-h-[200px] mt-8 rounded-lg p-3 sm:p-6">
        <h1 className="text-blue-700 font-bold mb-3 text-lg sm:text-xl">O'xshashlari</h1>
        {similarError && <div className="text-red-400 mb-2">{similarError}</div>}
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          {similarProducts.length === 0 && !similarError && (
            <div className="text-blue-400">O'xshash mahsulotlar topilmadi.</div>
          )}
          {similarProducts.map(similar => (
            <div
              key={similar.id}
              onClick={() => navigate(`/book/${similar.id}`)}
              className="w-[130px] sm:w-[150px] h-[180px] sm:h-[200px] flex-shrink-0 bg-white rounded-[10px] flex flex-col items-center justify-between p-2 shadow cursor-pointer hover:shadow-md transition"
            >
              <img
                src={similar.image}
                alt={similar.title}
                className="w-[90%] h-[70%] object-contain rounded-[10px]"
              />
              <p className="mt-2 text-gray-700 text-xs sm:text-sm text-center">
                {similar.title.slice(0, 18)}
              </p>
            </div>
          ))}
        </div>
      </div>


      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default BookDetail;
