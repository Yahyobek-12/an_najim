import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'

const BookDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load product');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className='w-full h-screen flex items-center justify-center'><div id="loader"></div></div>;
  if (error) return <div className='p-10 text-center text-red-500'>{error}</div>;

  return (
    <div className='w-full h-screen py-4 px-4'>
      <div className='w-[190px] h-[50px] flex items-center justify-between'>
        <ChevronLeft /> <Link to='/home'>Bosh sahifaga qaytish</Link>
      </div>

      <div className='w-full sm:h-[60vh] h-[50vh] md:flex block items-center mt-4'>
        <div className='sm:w-[380px] w-[100%] h-[100%] flex items-center justify-center bg-white rounded-[10px]'>
          <img src={product.image} alt={product.title} className='w-[90%] h-[90%] rounded-[10px] object-fit' />
        </div>
        <div className='sm:w-[50%] w-[100%] h-[100%] md:ml-6 ml-0 md:mt-0 mt-6'>
          <p className=' font-bold'>{product.category}</p>
          <h1 className='sm:text-[25px] text-[18px] font-bold mt-2'>{product.title}</h1>
          <h2 className='sm:text-[30px] text-[20px] font-bold mt-2'>${product.price}</h2>
          <Disclosure as="div" className="p-2" defaultOpen={false}>
            <DisclosureButton className="group flex w-full items-center justify-between">
              <span className="text-sm/6 text-black font-bold">
                Kitob haqida
              </span>
              <ChevronDownIcon className="size-5 text-black group-data-open:rotate-180" />
            </DisclosureButton>
            <DisclosurePanel className="mt-2 text-gray-500">
              <p>{product.description}</p>
            </DisclosurePanel>
          </Disclosure>
          <Link to={`/cart/${product.id}`}>
            <button className='w-full h-[50px] bg-blue-500 text-white rounded-[10px] mt-4'>Savatga qo'shish</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
