import React, { useEffect, useState } from 'react';

const LOCAL_KEY = 'likedProducts';

const Like = () => {
  const [likedProducts, setLikedProducts] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(LOCAL_KEY));
    setLikedProducts(Array.isArray(stored) ? stored : []);
  }, []);

  const handleRemove = (id) => {
    const updated = likedProducts.filter(item => item.id !== id);
    setLikedProducts(updated);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 py-10 px-4 sm:px-6 md:px-10 md:pb-0 pb-22">
      <h1 className="text-2xl font-bold mb-8">Yoqtirgan Mahsulotlar</h1>

      {likedProducts.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">Sizda yoqtirilgan mahsulotlar yo‘q.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {likedProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300 relative overflow-hidden flex flex-col border border-gray-200"
            >
              <button
                onClick={() => handleRemove(product.id)}
                className="absolute top-2 right-2 bg-gray-100 text-gray-600 hover:bg-gray-200 w-7 h-7 flex items-center justify-center rounded-full font-bold z-10"
                title="Yoqtirishdan olib tashlash"
              >
                ×
              </button>

              <img
                src={product.images?.[2] || product.images?.[0] || product.image || 'https://via.placeholder.com/250x250?text=No+Image'}
                alt={product.title}
                className="w-full h-48 object-contain p-3"
              />

              <div className="p-4 flex flex-col flex-1">
                <h2 className="font-semibold text-gray-800 text-[15px] mb-2 line-clamp-2">
                  {product.title}
                </h2>
                <p className="text-blue-600 font-bold text-lg">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Like;
