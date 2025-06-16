import RegisterBannerImg from '../assets/images/books.world.jpg'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row items-center justify-center">

      {/* O'ng taraf - Forma */}
      <form className="w-full lg:w-1/2 flex items-center justify-center bg-gray-100 py-10">
        <div className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[75%] xl:w-[60%] bg-white rounded-2xl shadow-md overflow-hidden">
          
          {/* Header */}
          <div className="py-6 px-4 flex justify-center">
            <h1 className="text-2xl text-blue-500 font-bold text-center">Tizimga kirish</h1>
          </div>

          {/* Form Inputs */}
          <div className="bg-[#2970ff] rounded-tl-[3rem] py-8 px-4 sm:px-6">

            <div className="mb-4">
              <label className="text-white block">Telefon raqamingiz:</label>
              <input type="text" value="+998" placeholder='Telefon raqam' className='w-full h-[40px] bg-white px-3 mt-2 rounded-md outline-none' />
            </div>

            <div className="mb-6">
              <label className="text-white block">Parol yarating:</label>
              <input type="password" placeholder='********' className='w-full h-[40px] bg-white px-3 mt-2 rounded-md outline-none' />
            </div>

            <Link to="/login">
              <button className="w-full h-[40px] bg-white text-[#2970ff] font-bold rounded-md cursor-pointer">
                Ro'yhatdan o'tish
              </button>
            </Link>

            <p className="mt-5 text-gray-300 text-sm text-center">
              Accauntingiz bormi? <Link to="/" className="text-white underline">Ro'yxatdan o'tish</Link>
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
  )
}

export default Login
