import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LOCAL_KEY = 'searchHistory';

const Search = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [history, setHistory] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(LOCAL_KEY));
    setHistory(Array.isArray(stored) ? stored : []);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    const newHistory = [trimmed, ...history.filter(item => item !== trimmed)].slice(0, 5);
    setHistory(newHistory);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(newHistory));
    setFiltered(products.filter(p => p.title.toLowerCase().includes(trimmed.toLowerCase())));
    setShowResults(true);
  };

  const handleHistoryClick = (item) => {
    setQuery(item);
    setFiltered(products.filter(p => p.title.toLowerCase().includes(item.toLowerCase())));
    setShowResults(true);
  };

  const handleDeleteHistory = (item) => {
    const newHistory = history.filter(h => h !== item);
    setHistory(newHistory);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(newHistory));
  };

  const handleClearAll = () => {
    setHistory([]);
    localStorage.removeItem(LOCAL_KEY);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 py-6 px-4 md:px-10 lg:px-16 mb-12">
      <div className="">
        <form onSubmit={handleSearch} className="mb-6 overflow-x-hidden">
          <div className="relative flex w-full max-w-full rounded-lg shadow-sm">
            <input
              type="text"
              value={query}
              onChange={e => {
                setQuery(e.target.value);
                setShowResults(false);
              }}
              placeholder="Mahsulot qidirish..."
              className="min-w-0 w-full h-12 pl-12 pr-4 rounded-l-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none transition text-sm sm:text-base"
            />
            <button
              type="submit"
              className="px-6 bg-blue-500 text-white rounded-r-lg font-semibold hover:bg-blue-600 transition"
            >
              Qidirish
            </button>
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
            </div>
          </div>
        </form>


        {/* Search history */}
        {history.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <div className="text-gray-500 text-sm">Oxirgi qidiruvlar:</div>
              <button
                onClick={handleClearAll}
                className="text-xs text-red-500 hover:underline"
              >
                Barchasini o'chirish
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {history.map((item, idx) => (
                <div key={idx} className="flex items-center bg-gray-200 px-3 py-1 rounded-full text-sm">
                  <button
                    type="button"
                    onClick={() => handleHistoryClick(item)}
                    className="hover:text-blue-600 transition"
                  >
                    {item}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteHistory(item)}
                    className="ml-2 text-red-400 hover:text-red-600 text-xs font-bold"
                    title="O'chirish"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {showResults && (
          <div className="flex flex-col gap-4">
            {filtered.length === 0 && (
              <div className="text-gray-400 text-center">Hech narsa topilmadi.</div>
            )}
            {filtered.map(product => (
              <div
                key={product.id}
                onClick={() => navigate(`/book/${product.id}`)}
                className="flex flex-col sm:flex-row w-full bg-white rounded-lg shadow p-3 gap-4 cursor-pointer hover:opacity-90 transition"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full sm:w-24 h-32 object-contain sm:h-24"
                />
                <div className="flex flex-col justify-between flex-1">
                  <div className="font-semibold text-sm sm:text-base text-gray-800">
                    {product.title.length > 60
                      ? product.title.slice(0, 60) + '...'
                      : product.title}
                  </div>
                  <div className="text-blue-500 font-bold text-sm sm:text-base">${product.price}</div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>

  );
};

export default Search;
