// components/Navbar.jsx
import { Link, NavLink } from 'react-router-dom';
import { House, Search, ShoppingCart, Heart, User } from 'lucide-react';

const Navbar = () => {
  return (
    <div>
      <nav className='w-[80px] h-full fixed top-0 right-0 flex items-center justify-center px-2 z-50 bg-white'>
        <ul id='navbar' className='w-full h-[34%] bg-white rounded-[10px] justify-center text-center py-2 px-2 shadow-xl'>
          <NavLink to='/home' className='flex items-center justify-center py-2 px-2 rounded-[10px] mt-2 border-[1px] border-blue-500'><House id='icon' className='text-blue-500' /></NavLink>
          <NavLink to='/search' className='flex items-center justify-center py-2 px-2 rounded-[10px] mt-2 border-[1px] border-blue-500'><Search id='icon' className='text-blue-500' /></NavLink>
          <NavLink to='/cart' className='flex items-center justify-center py-2 px-2 rounded-[10px] mt-2 border-[1px] border-blue-500'><ShoppingCart id='icon' className='text-blue-500' /></NavLink>
          <NavLink to='/like' className='flex items-center justify-center py-2 px-2 rounded-[10px] mt-2 border-[1px] border-blue-500'><Heart id='icon' className='text-blue-500' /></NavLink>
          <NavLink to='/profile' className='flex items-center justify-center py-2 px-2 rounded-[10px] mt-2 border-[1px] border-blue-500'><User id='icon' className='text-blue-500' /></NavLink>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
