import React, { use, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../store/slices/userSlice";

const Navbar = () => {
  const token = useSelector(state =>state.user.token)
  const user = useSelector(state =>state.user.user)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const logout = () =>{
    dispatch(setToken({data : ""}))
    localStorage.removeItem('token')
    navigate('/')
  }


  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <h1 onClick={()=>{navigate('/')}} className="md:text-3xl text-2xl font-semibold leading-tight cursor-pointer">MediConnect</h1>
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to={"/"}>
          <li className="py-1">Home</li>
          <hr className="border-none outline-none h-0.5 bg-primary m-auto hidden" />
        </NavLink>
        <NavLink to={"/doctors"}>
          <li className="py-1">All Doctors</li>
          <hr className="border-none outline-none h-0.5 bg-primary  m-auto hidden" />
        </NavLink>
        <NavLink to={"/about"}>
          <li className="py-1">About</li>
          <hr className="border-none outline-none h-0.5 bg-primary  m-auto hidden" />
        </NavLink>
        <NavLink to={"/contact"}>
          <li className="py-1">Contact</li>
          <hr className="border-none outline-none h-0.5 bg-primary  m-auto hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img src={user.image} alt="" className="w-8 rounded-full" />
            <img src={assets.dropdown_icon} alt="" className="w-2.5" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p onClick={()=>(navigate('my-profile'))} className="hover:text-black cursor-pointer">My Profile</p>
                <p onClick={()=>(navigate('my-appointments'))} className="hover:text-black cursor-pointer">My Appointmens</p>
                <p onClick={()=>logout()} className="hover:text-black cursor-pointer">Log out</p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create Account
          </button>
        )}
        <img src={assets.menu_icon} className="w-6 md:hidden" alt="" onClick={()=>{setShowMenu(true)}}/>
        {/* mobile menu */}
        <div className={`${showMenu? 'fixed w-full': 'h-0 w-0'} 'md:hidden top-0 right-0 bottom-0 z-20 overflow-hidden bg-white transition-all'`}>
          <div className="flex items-center  justify-between px-5 py-6">
            <p onClick={()=>{navigate('/')}} className="md:text-3xl text-2xl font-semibold leading-tight cursor-pointer">MediConnect</p>
            <img src={assets.cross_icon} alt="" onClick={()=>setShowMenu(false)} className="w-7"/>
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium ">
            <NavLink onClick={()=>setShowMenu(false)} to='/'><p className='px-4 py-2 inline-block rounded'>Home</p></NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to='/doctors'><p className='px-4 py-2 inline-block rounded'>All Doctors</p></NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to='/about'><p className='px-4 py-2 inline-block rounded'>About</p></NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to='/contact'><p >Contact Us</p></NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
