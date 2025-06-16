import { useEffect } from 'react'
import RegisterBannerImg from '../assets/images/books.world.jpg'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className="w-full h-screen flex flex-col lg:flex-row">
      
      {/* Left Image */}
      <div className="hidden lg:block lg:w-1/2 h-[300px] lg:h-full">
        <img 
          src={RegisterBannerImg} 
          alt="register-banner-img" 
          className="w-full h-full object-cover" 
        />
      </div>

      {/* Right Form */}
      <form className="w-full lg:w-1/2 h-full flex items-center justify-center bg-[#f2f2f2]">
        <div className="w-[90%] sm:w-[70%] md:w-[60%] lg:w-[80%] xl:w-[60%] h-[90%] sm:h-[85%] bg-white rounded-2xl relative overflow-hidden shadow-lg">

          {/* Title */}
          <div className="w-full h-[20%] flex items-center justify-center">
            <h1 className="text-2xl sm:text-3xl text-blue-500 font-bold text-center">Ro'yxatdan o'tish</h1>
          </div>

          {/* Inputs */}
          <div className="w-full h-[80%] bg-[#2970ff] absolute bottom-0 rounded-tl-[3rem] py-8 px-4 sm:px-6 overflow-y-auto">
            
            {/* Ism */}
            <div className="mb-4">
              <label className="text-white text-sm sm:text-base">Ismingiz:</label>
              <input 
                type="text" 
                placeholder="Abdurahmon" 
                className="w-full h-[40px] bg-white px-3 mt-2 rounded-md outline-none"
              />
            </div>

            {/* Familya */}
            <div className="mb-4">
              <label className="text-white text-sm sm:text-base">Familyangiz:</label>
              <input 
                type="text" 
                placeholder="Eshonov" 
                className="w-full h-[40px] bg-white px-3 mt-2 rounded-md outline-none"
              />
            </div>

            {/* Telefon */}
            <div className="mb-4">
              <label className="text-white text-sm sm:text-base">Telefon raqamingiz:</label>
              <input 
                type="text" 
                value="+998" 
                placeholder="Telefon raqam" 
                className="w-full h-[40px] bg-white px-3 mt-2 rounded-md outline-none"
              />
            </div>

            {/* Parol */}
            <div className="mb-4">
              <label className="text-white text-sm sm:text-base">Parol yarating:</label>
              <input 
                type="password" 
                placeholder="********" 
                className="w-full h-[40px] bg-white px-3 mt-2 rounded-md outline-none"
              />
            </div>

            {/* Button */}
            <div className="mt-6">
              <Link to="/login">
                <button className="w-full h-[40px] bg-white text-[#2970ff] font-bold rounded-md cursor-pointer">
                  Ro'yxatdan o'tish
                </button>
              </Link>
            </div>

            {/* Kirishga yo'naltirish */}
            <p className="mt-5 text-gray-300 text-sm">
              Accauntingiz bormi? <Link to="/login" className="text-white underline">Tizimga kirish</Link>
            </p>
          </div>

        </div>
      </form>
    </div>
  )
}

export default Register
