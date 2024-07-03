import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { BsCart4 } from "react-icons/bs";
import { useSelector } from 'react-redux';

export const MedicineNavbar = () => {


  const cartItems = useSelector((state) => state.medicines.items);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <nav className='fixed w-full z-10  flex justify-between items-center py-6 px-14 max-[524px]:px-4 bg-[#02474d]'>
        <div className='flex items-center gap-6'>
        
          <div className='flex items-center gap-2'>
            <Link to={'/buymedicines'} className='text-2xl font-semibold text-white'>MEDI<span className='text-[#59ce8f]'>STORE</span></Link>

            <img src="/store.png" alt="" className='w-8' />
          </div>
          <Link to={'/'} className='text-2xl font-semibold text-white '>Home</Link>
        </div>
        <div className='text-white'>
          <Link to={'cart'} className='text-2xl text-slate-200 relative'>
            <BsCart4 />
          {totalItems > 0 && (
              <span className="bg-red-500 text-sm text-white rounded-full absolute -top-2 -right-2 px-2">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </nav>
      <Outlet />
    </>
  )
}
