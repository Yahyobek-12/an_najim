import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterBannerImg from '../assets/images/books.world.jpg';
import useAuthStore from '../store/useAuthStore';

const Register = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+998');
  const [password, setPassword] = useState('');
  const { user, login } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = { name, phone, password };
    const fakeToken = 'REGISTERED_TOKEN_123';

    login(newUser, fakeToken);
    navigate('/');
  };

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row items-center justify-center">
      <div className="hidden lg:block lg:w-1/2 w-[50%] h-screen">
        <img
          src={RegisterBannerImg}
          alt="register-banner-img"
          className="w-full h-full object-cover"
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full lg:w-1/2 flex items-center justify-center bg-gray-100 py-10"
      >
        <div className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[75%] xl:w-[60%] bg-white rounded-2xl shadow-md overflow-hidden">
          {/* Header */}
          <div className="py-6 px-4 flex justify-center">
            <h1 className="text-2xl text-blue-500 font-bold text-center">Ro'yxatdan o'tish</h1>
          </div>

          {/* Form Inputs */}
          <div className="bg-[#2970ff] rounded-tl-[3rem] py-8 px-4 sm:px-6">

            <div className="mb-4">
              <label className="text-white block">Ismingiz:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ismingiz"
                className="w-full h-[40px] bg-white px-3 mt-2 rounded-md outline-none"
                required
              />
            </div>

            <div className="mb-4">
              <label className="text-white block">Telefon raqamingiz:</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Telefon raqam"
                className="w-full h-[40px] bg-white px-3 mt-2 rounded-md outline-none"
                required
              />
            </div>

            <div className="mb-6">
              <label className="text-white block">Parol yarating:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full h-[40px] bg-white px-3 mt-2 rounded-md outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full h-[40px] bg-white text-[#2970ff] font-bold rounded-md cursor-pointer"
            >
              Ro'yxatdan o'tish
            </button>

            <p className="mt-5 text-gray-300 text-sm text-center">
              Accauntingiz bormi?{' '}
              <a href="/login" className="text-white underline">Tizimga kirish</a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
