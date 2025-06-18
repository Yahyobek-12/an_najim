// components/Navbar.jsx
import { NavLink } from 'react-router-dom';
import { House, Search, ShoppingCart, Heart, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed z-50 flex items-center justify-center md:px-2 px-0 md:w-[80px] md:h-full md:right-0 md:top-0 md:flex-col w-full h-[70px] left-0 bottom-0 flex-row md:left-auto md:bottom-auto">
      <ul
        id="navbar"
        className="w-full md:h-[34%] h-full bg-white md:rounded-[10px] rounded-0 justify-center text-center md:py-2 py-0 md:px-2 px-0 shadow-xl flex md:flex-col flex-row items-center"
      >
        <NavLink to="/home" className="flex items-center justify-center py-2 px-2 rounded-[10px] mx-2 md:mx-0 mt-0 md:mt-2 border-[1px] border-blue-500"><House className="text-blue-500" id="icon" /></NavLink>
        <NavLink to="/search" className="flex items-center justify-center py-2 px-2 rounded-[10px] mx-2 md:mx-0 mt-0 md:mt-2 border-[1px] border-blue-500"><Search className="text-blue-500" id="icon" /></NavLink>
        <NavLink to="/cart" className="flex items-center justify-center py-2 px-2 rounded-[10px] mx-2 md:mx-0 mt-0 md:mt-2 border-[1px] border-blue-500"><ShoppingCart className="text-blue-500" id="icon" /></NavLink>
        <NavLink to="/like" className="flex items-center justify-center py-2 px-2 rounded-[10px] mx-2 md:mx-0 mt-0 md:mt-2 border-[1px] border-blue-500"><Heart className="text-blue-500" id="icon" /></NavLink>
        <NavLink to="/profile" className="flex items-center justify-center py-2 px-2 rounded-[10px] mx-2 md:mx-0 mt-0 md:mt-2 border-[1px] border-blue-500"><User className="text-blue-500" id="icon" /></NavLink>
      </ul>
    </nav>
  );
};

export default Navbar;
