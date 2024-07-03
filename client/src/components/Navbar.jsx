// import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { FaBarsStaggered } from "react-icons/fa6";
import {  useLocation } from "react-router-dom";
import NavLinks from "./NavLinks";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsCart4 } from "react-icons/bs";

const Navbar = () => {

  const location = useLocation();
  console.log(location.pathname)
  const cartItems = useSelector((state) => state.medicines.items);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-teal-50 px-6">
      <div className="navbar align-element">
        <div className="navbar-start">
          {/* TITLE */}
          <Link
            to="/"
            className=""
          >
            <img src="logo.png" className="w-16 rounded" alt="" />
          </Link>
          {/* DROPDOWN */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FaBarsStaggered className="h-6 w-6" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-teal-50 rounded-box w-52 border border-gray-200 "
            >
              <NavLinks />
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal">
            <NavLinks />
          </ul>
        </div>
        <div className="navbar-end">
         
          {
            location.pathname.includes("buymedicines") ? (
              <div className="text-white">
                <Link to={'/buymedicines/cart'} className='text-2xl text-slate-700 relative'>
                  <BsCart4 />
                  {totalItems > 0 && (
                    <span className="bg-red-500 text-sm text-white rounded-full absolute -top-2 -right-2 px-2">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </div>

            ) : (
              ""
            )
          }
        
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
