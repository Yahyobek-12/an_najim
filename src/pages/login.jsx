import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import RegisterBannerImg from '../assets/images/books.world.jpg';
import useAuthStore from '../store/useAuthStore';

const Login = () => {
  const [phone, setPhone] = useState('+998');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!storedUser) {
      setError("Siz hali ro'yxatdan o'tmagansiz.");
      return;
    }

    if (storedUser.phone !== phone) {
      setError("Telefon raqam noto‘g‘ri.");
      return;
    }

    if (storedUser.password !== password) {
      setError("Parol noto‘g‘ri.");
      return;
    }

    // Agar to‘g‘ri bo‘lsa:
    const fakeToken = 'LOGGED_IN_TOKEN_456';
    login(storedUser, fakeToken);
    navigate('/');
  };

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row items-center justify-center">
      {/* O'ng taraf - Forma */}
      <form onSubmit={handleLogin} className="w-full lg:w-1/2 flex items-center justify-center bg-gray-100 py-10">
        <div className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[75%] xl:w-[60%] bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="py-6 px-4 flex justify-center">
            <h1 className="text-2xl text-blue-500 font-bold text-center">Tizimga kirish</h1>
          </div>

          <div className="bg-[#2970ff] rounded-tl-[3rem] py-8 px-4 sm:px-6">
            {error && <p className="text-red-200 mb-4 text-center">{error}</p>}

            <div className="mb-4">
              <label className="text-white block">Telefon raqamingiz:</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder='Telefon raqam'
                className='w-full h-[40px] bg-white px-3 mt-2 rounded-md outline-none'
                required
              />
            </div>

            <div className="mb-6">
              <label className="text-white block">Parolingiz:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='********'
                className='w-full h-[40px] bg-white px-3 mt-2 rounded-md outline-none'
                required
              />
            </div>

            <button
              type="submit"
              className="w-full h-[40px] bg-white text-[#2970ff] font-bold rounded-md cursor-pointer"
            >
              Tizimga kirish
            </button>

            <p className="mt-5 text-gray-300 text-sm text-center">
              Akkountingiz yo‘qmi? <Link to="/register" className="text-white underline">Ro'yxatdan o'tish</Link>
            </p>
          </div>
        </div>
      </form>

      {/* Chap taraf - Rasm */}
      <div className="hidden lg:block lg:w-1/2 w-[50%] h-screen">
        <img
          src={RegisterBannerImg}
          alt="register-banner-img"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
