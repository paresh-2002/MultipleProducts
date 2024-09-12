import React, { useState } from "react";
import {  useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../FirebaseConfig";
import { MdShoppingCart,  MdAddCircle, MdHome } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { userActions } from "../store/userSlice";

const Navbar = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {shoppingCart} = useSelector((state) => state.order);
  const [showTooltip, setShowTooltip] = useState(false);
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(userActions.logout());
        navigate("/users/sign_in");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <>
      <header className="p-3  bg-cyan-900 sticky top-0 z-10 lg:flex-row">
        <div className="container pl-2 ">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start ml-5 mr-5">
            <Link
              to="/"
              className="d-flex align-items-center mb-2 gap-2 mb-lg-0 text-white text-decoration-none "
            >
              <img src="/Images/card.png" alt="" width="60" height="60" />
            </Link>
            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 ml-5">
            <li>
                    <Link
                      to="/"
                      className="nav-link px-2 text-white hover:underline hover:underline-white "
                    >
                      <div className="flex items-center justify-center gap-1">
                        <MdHome />
                        Home
                      </div>
                    </Link>
                  </li>

              {currentUser && (
                <>
                  <li>
                    <Link
                      to="/orders"
                      className="nav-link px-2 text-white hover:underline hover:underline-white "
                    >
                      <div className="flex items-center justify-center gap-1">
                        <MdShoppingCart />
                        Orders
                        <span className="bg-[#f16565] whitespace-nowrap text-center leading-[18px] h-[18px] relative text-xs text-white font-bold cursor-pointer px-1.5 py-0 rounded-[50%] right-1 top-[-8px]">
                          {shoppingCart.length}
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/add_item"
                      className="nav-link px-2 text-white hover:underline hover:underline-white"
                    >
                      <div className="flex items-center justify-center gap-1">
                        <MdAddCircle />
                        Add Item
                      </div>
                    </Link>
                  </li>
                </>
              )}
            </ul>

            <div className="text-end flex">
              {currentUser ? (
                <div className="flex items-center justify-center gap-2">
                  <Link to="/users/sign_in" className="nav-link text-white">
                    <button
                      type="button"
                      className="btn btn-outline-light me-2"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </Link>
                  <div className="relative">
                    <h3 className="text-white text-sm m-0">
                      <FaUserCircle
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                        className="cursor-pointer w-6 h-6"
                      />
                    </h3>
                    {showTooltip && (
                      <div className="absolute left-1/2 transform  mt-1 p-2 bg-gray-800 text-white text-sm rounded">
                        {currentUser.name}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center ">
                  <Link to="/users/sign_in" className="nav-link text-white">
                    <button
                      type="button"
                      className="btn btn-outline-light me-2"
                    >
                      Login
                    </button>
                  </Link>
                  <Link to="/users/sign_up" className="nav-link text-white">
                    <button type="button" className="btn btn-warning">
                      Sign-up
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
