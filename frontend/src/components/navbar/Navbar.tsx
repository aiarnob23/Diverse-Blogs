import { Link, NavLink } from "react-router-dom";
import "../navbar/Navbar.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

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
    <div className="flex justify-center items-center gap-4">
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/user/following">Following</NavLink>
      </li>
      <li>
        <NavLink to="/user/blogs/search">Search</NavLink>
      </li>
      <li>
        <NavLink to="/user/create-blog">Write</NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/user/profile">Profile</NavLink>
        </li>
      )}
    </div>
  );

  return (
    <div className="bg-transparent bg-white backdrop-blur-sm bg-opacity-30 shadow-sm">
      <div className="navbar max-w-[1280px] mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              id="navs"
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {NavLinks}
            </ul>
          </div>
          <Link to="/">
            <div className="text-xl font-bold text-[#2B3440]">Diverse</div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul
            id="navs"
            className="menu menu-horizontal text-xl font-[500] px-1"
          >
            {NavLinks}
          </ul>
        </div>
        <div className="navbar-end">
          {!user ? (
            <NavLink to="/auth/login">
              <button className="bg-blue-600 text-white py-2 px-6 rounded-full font-semibold shadow-md hover:bg-blue-700 transition duration-300">
                Login
              </button>
            </NavLink>
          ) : (
            <button
              onClick={handleLogOut}
              className="bg-blue-600 text-white py-2 px-6 rounded-full text-sm font-semibold shadow-md hover:bg-blue-700 transition-all duration-300 flex items-center space-x-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H3"
                ></path>
              </svg>
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
