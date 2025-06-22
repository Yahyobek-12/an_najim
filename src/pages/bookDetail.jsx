import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

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

  if (loading) return <div className='p-10 text-center'>Loading...</div>;
  if (error) return <div className='p-10 text-center text-red-500'>{error}</div>;

  return (
    <div className='p-6 max-w-3xl mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>{product.title}</h1>
      <img
        src={product.image}
        alt={product.title}
        className='w-[300px] mx-auto mb-4'
      />
      <p className='text-gray-700 mb-4'>{product.description}</p>
      <p className='text-blue-600 font-bold text-xl'>${product.price}</p>
    </div>
  );
};

export default BookDetail;
