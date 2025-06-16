import { Link, NavLink } from "react-router-dom";
import "../navbar/Navbar.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Menu, PenTool, Search, Heart, Home, User, LogOut } from 'lucide-react';

export default function Navbar() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is not provided.");
  }
  const { user, logOut } = authContext;

  const handleLogOut = async () => {
    await logOut();
    setTimeout(() => {
      window.location.replace('/');
    }, 300);
  }

  const NavLinks = (
    <div className="flex flex-col lg:flex-row justify-center items-start lg:items-center gap-2 lg:gap-4 w-full lg:w-auto">
      <li className="w-full lg:w-auto">
        <NavLink 
          to="/" 
          className="block w-full text-left py-3 px-4 lg:py-0 lg:px-0 text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent hover:text-blue-600 rounded-lg lg:rounded-none transition-all duration-200 font-medium flex items-center gap-2"
        >
          <Home className="w-4 h-4 lg:w-5 lg:h-5" />
          <span>Home</span>
        </NavLink>
      </li>
      <li className="w-full lg:w-auto">
        <NavLink 
          to="/user/following"
          className="block w-full text-left py-3 px-4 lg:py-0 lg:px-0 text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent hover:text-blue-600 rounded-lg lg:rounded-none transition-all duration-200 font-medium flex items-center gap-2"
        >
          <Heart className="w-4 h-4 lg:w-5 lg:h-5" />
          <span>Following</span>
        </NavLink>
      </li>
      <li className="w-full lg:w-auto">
        <NavLink 
          to="/user/blogs/search"
          className="block w-full text-left py-3 px-4 lg:py-0 lg:px-0 text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent hover:text-blue-600 rounded-lg lg:rounded-none transition-all duration-200 font-medium flex items-center gap-2"
        >
          <Search className="w-4 h-4 lg:w-5 lg:h-5" />
          <span>Search</span>
        </NavLink>
      </li>
      <li className="w-full lg:w-auto">
        <NavLink 
          to="/user/create-blog"
          className="block w-full text-left py-3 px-4 lg:py-0 lg:px-0 text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent hover:text-blue-600 rounded-lg lg:rounded-none transition-all duration-200 font-medium flex items-center gap-2"
        >
          <PenTool className="w-4 h-4 lg:w-5 lg:h-5" />
          <span>Write</span>
        </NavLink>
      </li>
      {user && (
        <li className="w-full lg:w-auto">
          <NavLink 
            to="/user/profile"
            className="block w-full text-left py-3 px-4 lg:py-0 lg:px-0 text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent hover:text-blue-600 rounded-lg lg:rounded-none transition-all duration-200 font-medium flex items-center gap-2"
          >
            <User className="w-4 h-4 lg:w-5 lg:h-5" />
            <span>Profile</span>
          </NavLink>
        </li>
      )}
    </div>
  );

  return (
    <div className="bg-transparent bg-white backdrop-blur-sm bg-opacity-30 shadow-sm sticky top-0 z-50">
      <div className="navbar max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Mobile menu button and logo */}
        <div className="navbar-start flex items-center">
          <div className="dropdown lg:hidden mr-3">
            <div 
              tabIndex={0} 
              role="button" 
              className="btn btn-ghost p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <Menu className="h-6 w-6" />
            </div>
            <ul
              id="navs"
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white rounded-xl z-[1] mt-3 w-72 sm:w-80 p-4 shadow-lg border border-gray-100"
            >
              {NavLinks}
            </ul>
          </div>
          <Link to="/">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#2B3440] hover:text-blue-600 transition-colors duration-200">
              Diverse
            </div>
          </Link>
        </div>
        
        {/* Desktop menu */}
        <div className="navbar-center hidden lg:flex flex-1">
          <ul
            id="navs"
            className="menu menu-horizontal text-lg font-medium px-1 space-x-6"
          >
            {NavLinks}
          </ul>
        </div>
        
        {/* Auth buttons */}
        <div className="navbar-end">
          {!user ? (
            <NavLink to="/auth/login">
              <button className="bg-blue-600 text-white py-2 px-4 sm:px-6 rounded-full text-sm sm:text-base font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                Login
              </button>
            </NavLink>
          ) : (
            <button
              onClick={handleLogOut}
              className="bg-blue-600 text-white py-2 px-3 sm:px-4 lg:px-6 rounded-full text-xs sm:text-sm font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center space-x-1 sm:space-x-2"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}