import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ChevronLeft, Heart } from 'lucide-react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';

const BookDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [similarError, setSimilarError] = useState(null);

  // Mahsulotni olish
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

  // O‘xshash mahsulotlarni olish
  useEffect(() => {
    if (!product) return;
    setSimilarError(null);
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        const similars = data.filter(
          (item) => item.category === product.category && item.id !== product.id
        );
        setSimilarProducts(similars);
      })
      .catch(() => {
        setSimilarError('O‘xshash mahsulotlarni yuklashda xato');
      });
  }, [product]);

  if (loading) return <div className='w-full min-h-screen flex items-center justify-center'><div id="loader"></div></div>;
  if (error) return <div className='p-10 text-center text-red-500'>{error}</div>;

  return (
    <div className='w-full min-h-screen py-4 px-2 sm:px-4'>
      {/* Yuqori panel */}
      <div className='w-full h-[50px] flex items-center justify-between mb-4'>
        <div className='flex items-center gap-2'>
          <ChevronLeft /> <Link to='/home'>Bosh sahifaga qaytish</Link>
        </div>
        <div className='py-2 px-2 bg-white rounded-[10px] cursor-pointer shadow'>
          <Heart />
        </div>
      </div>

      {/* Mahsulot tafsilotlari */}
      <div className='w-full flex flex-col lg:flex-row items-center lg:items-stretch gap-6 rounded-lg p-3 sm:p-6'>
        <div className='w-full max-w-xs sm:max-w-sm md:max-w-md lg:w-[380px] flex-shrink-0 flex items-center justify-center bg-white rounded-[10px] mx-auto lg:mx-0'>
          <img
            src={product.image}
            alt={product.title}
            className='w-[80%] h-[220px] sm:h-[260px] md:h-[300px] object-contain rounded-[10px]'
          />
        </div>
        <div className='flex-1 flex flex-col justify-between'>
          <div>
            <p className='font-bold text-blck text-sm sm:text-base'>{product.category}</p>
            <h1 className='text-[18px] sm:text-[22px] md:text-[25px] font-bold mt-2 text-black'>{product.title}</h1>
            <h2 className='text-[20px] sm:text-[25px] md:text-[30px] font-bold mt-2 text-blue-500'>${product.price}</h2>
            <Disclosure as="div" className="p-2" defaultOpen={true}>
              <DisclosureButton className="group flex w-full items-center justify-between">
                <span className="text-sm/6 text-black font-bold">
                  Kitob haqida
                </span>
                <ChevronDownIcon className="size-5 text-blck group-data-open:rotate-180" />
              </DisclosureButton>
              <DisclosurePanel className="mt-2 text-gray-500">
                <p>{product.description.slice(0, 300)}...</p>
              </DisclosurePanel>
            </Disclosure>
          </div>
          <Link to={`/cart/${product.id}`}>
            <button className='w-full h-[45px] sm:h-[50px] bg-blue-500 text-white rounded-[10px] font-semibold text-base sm:text-lg transition hover:bg-blue-600'>
              Savatga qo'shish
            </button>
          </Link>
        </div>
      </div>

      {/* O'xshash mahsulotlar */}
      <div className="w-full min-h-[200px] mt-8 rounded-lg p-3 sm:p-6">
        <h1 className="text-black font-bold mb-3 text-lg sm:text-xl">O'xshashlari</h1>
        {similarError && (
          <div className="text-red-200 mb-2">{similarError}</div>
        )}
        <div
          id="similar-products"
          className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
          style={{ WebkitOverflowScrolling: 'touch' }} // iOS uchun silliq scroll
        >
          {similarProducts.length === 0 && !similarError && (
            <div className="text-white">O'xshash mahsulotlar topilmadi.</div>
          )}
          {similarProducts.map(similar => (
            <div
              key={similar.id}
              className="w-[130px] sm:w-[150px] h-[180px] sm:h-[200px] flex-shrink-0 bg-white rounded-[10px] flex flex-col items-center justify-between p-2 shadow"
            >
              <img
                src={similar.image}
                alt={similar.title}
                className="w-[90%] h-[70%] object-contain rounded-[10px]"
              />
              <p className="mt-2 text-gray-700 text-xs sm:text-sm text-center">{similar.title.slice(0, 18)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
