import { NavLink } from "react-router-dom";
import "../navbar/Navbar.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is not provided. ");
  }
  const { user, logOut } = authContext;


  const NavLinks = (
    <div className="flex justify-center items-center gap-4">
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/user/following">Following</NavLink>
      </li>
      <li>
        <NavLink to="/search">Search</NavLink>
      </li>
      { user &&
        <li>
          <NavLink to="/user/profile">Profile</NavLink>
        </li>
      }
    </div>
  );
  return (
    <div className=" bg-transparent bg-white backdrop-blur-sm bg-opacity-30 shadow-sm">
      <div className="navbar max-w-[1280px] mx-auto ">
        <div className="navbar-start ">
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
          <a className="btn text-xl">Diverse</a>
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
            <>
              <a href="/auth/login" className="btn">
                Login
              </a>
            </>
          ) : (
            <>
              <button onClick={logOut}>Logout</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
