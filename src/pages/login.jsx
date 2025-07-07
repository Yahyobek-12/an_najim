import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import RegisterBannerImg from '../assets/images/books.world.jpg';
import useAuthStore from '../store/useAuthStore';
import { Home } from 'lucide-react';
import Profile from './profile';

const Login = () => {
  const [phone, setPhone] = useState('+998');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState([]);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  // useEffect(() => {
  //   fetch('http://192.168.80.246:8000/login/')
  //     .then(res => res.json())
  //     .then(data => {
  //       // console.log("Ma'lumotlar:", data);
  //       setData(data)
  //     })
  //     .catch(err => console.error("Xatolik:", err));
  // }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://10.10.2.25:8000/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",  // bu sessionni yuboradi
        body: JSON.stringify({
          phone: phone,
          password: password
        })
      });

      const result = await response.json();

      console.log("Login ma'lumotlari:", { phone, password })

      if (response.ok) {
        // login(result.user) => agar Zustand ishlatsangiz
        navigate('/home');
      } else {
        setError(result.error || "Login xatoligi");
      }
    } catch (err) {
      console.error("Xatolik:", err);
      setError("Serverga ulanishda muammo");
    }
  };


  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row items-center justify-center">
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
