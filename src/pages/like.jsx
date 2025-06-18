import React, { useEffect, useState } from 'react';

const LOCAL_KEY = 'likedProducts';

const Like = () => {
  const [likedProducts, setLikedProducts] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(LOCAL_KEY));
      setLikedProducts(Array.isArray(stored) ? stored : []);
    } catch {
      setLikedProducts([]);
    }
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Liked Products</h1>
      {likedProducts.length === 0 && (
        <div className="text-gray-500">You have not liked any products yet.</div>
      )}
      <div className="flex flex-wrap gap-4">
        {likedProducts.map((product) => (
          <div key={product.id} className="w-[250px] h-[350px] bg-blue-500 rounded-[10px] p-2 flex flex-col justify-between">
            <h2 className="text-[15px] text-white font-semibold mb-2">{product.title}</h2>
            <img
              src={product.images?.[2] || product.images?.[0] || 'https://via.placeholder.com/250x280?text=No+Image'}
              alt={product.title}
              className="w-full h-[70%] object-cover rounded mb-2"
            />
            <p className="text-white font-bold text-lg">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Like;