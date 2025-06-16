import { useEffect } from 'react'
import RegisterBannerImg from '../assets/images/books.world.jpg'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className="w-full h-screen flex items-center lg:justify-between justify-center">
        <div className="w-[50%] h-[100%] lg:block hidden">
          <img src={RegisterBannerImg} alt="register-banner-img" className='w-full h-full object-cover' />
        </div>
        <form className='lg:w-[50%] md:w-[60%] sm:w-[70%] w-full sm:h-[80%] h-[100%] flex items-center justify-center'>
          <div className='xl:w-[60%] sm:w-[90%] w-[100%] h-[100%] bg-white sm:rounded-2xl rounded-none relative overflow-hidden'>
              <div className='w-[100%] sm:h-[20%] h-[30%] flex items-center justify-center'>
                <h1 className='text-2xl text-blue-500 font-bold text-center'>Ro'yxatdan o'tish</h1>
              </div>
              <div className='w-[100%] sm:h-[80%] h-[70%] bg-[#2970ff] absolute bottom-0 rounded-tl-[5rem] py-12 px-6'>
                  <div>
                    <label className='text-white'>Ismingiz:</label>
                    <br />
                    <input type="text" placeholder='Abdurahmon' className='w-[100%] h-[35px] bg-white px-2 rounded-[5px] mt-2 outline-none ' />
                  </div>
                  <div className='mt-4'>
                    <label className='text-white'>Familyangiz:</label>
                    <br />
                    <input type="text" placeholder='Eshonov' className='w-[100%] h-[35px] bg-white px-2 rounded-[5px] mt-2 outline-none ' />
                  </div>
                  <div className='mt-4'>
                    <label className='text-white'>Telefon raqamingiz:</label>
                    <br />
                    <input type="text" value="+998" placeholder='Eshonov' className='w-[100%] h-[35px] bg-white px-2 rounded-[5px] mt-2 outline-none ' />
                  </div>
                  <div className='mt-4'>
                    <label className='text-white'>Parol yarating:</label>
                    <br />
                    <input type="password" placeholder='********' className='w-[100%] h-[35px] bg-white px-2 rounded-[5px] mt-2 outline-none ' />
                  </div>
                  <div className='mt-6'>
                    <Link to="/login"><button className='w-[100%] h-[35px] bg-white text-[#2970ff] font-bold rounded-[5px] cursor-pointer'>Ro'yhatdan o'tish</button></Link>
                  </div>
                  <p className='mt-5 text-gray-300'>Agar accauntingiz bolsa: <Link to="/login" className='text-black underline'>Tizimga kirish</Link></p>
              </div>
          </div>
        </form>
    </div>
  )
}

export default Register