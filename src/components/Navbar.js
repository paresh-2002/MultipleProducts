import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../FirebaseConfig";
import { MdShoppingCart, MdAddCircle, MdHome, MdListAlt } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { userActions } from "../store/userSlice";
import { RxHamburgerMenu } from "react-icons/rx";
import MenuDropdown from "./MenuDropdown";

const Navbar = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shoppingCart } = useSelector((state) => state.order);
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
      <header className="p-3  bg-cyan-900 sticky top-0 z-10">
        <div className="container ">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="d-flex align-items-center mb-2 gap-2 mb-lg-0 text-white text-decoration-none "
            >
              <img src="/Images/card.png" alt="" width="60" height="60" />
            </Link>
            <ul className="hidden md:flex justify-between text-sm ps-1 ">
              <li>
                <Link
                  to="/"
                  className="nav-link px-2 relative text-white hover:underline hover:underline-white "
                >
                  <div className="flex items-center justify-center gap-1">
                    <MdHome />
                    Home
                  </div>
                </Link>
              </li>

              <li>
                <Link
                  to="/all-products"
                  className="nav-link px-2 relative text-white hover:underline hover:underline-white"
                >
                  <div className="flex items-center justify-center gap-1">
                    <MdListAlt />
                    AllProducts
                  </div>
                </Link>
              </li>
              {currentUser && (
                <>
                  <li>
                    <Link
                      to="/orders"
                      className="nav-link px-2 relative text-white hover:underline hover:underline-white "
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
                </>
              )}
              {/* Admin */}
              {currentUser?.role === "admin" && (
                <>
                  <li>
                    <Link
                      to="/add-item"
                      className="nav-link relative px-2 text-white hover:underline hover:underline-white"
                    >
                      <div className="flex items-center justify-center gap-1">
                        <MdAddCircle />
                        Add Item
                      </div>
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={"/admin-dashboard"}
                      className="nav-link relative px-2 text-white hover:underline hover:underline-white"
                    >
                      <div className="flex items-center justify-center gap-1">
                        Admin
                      </div>
                    </Link>
                  </li>
                </>
              )}
              {currentUser?.role === "user" && (
                <li>
                  <Link
                    to={"/user-dashboard"}
                    className="nav-link px-2 text-white hover:underline hover:underline-white"
                  >
                    <div className="flex items-center justify-center gap-1">
                      User
                    </div>
                  </Link>
                </li>
              )}
            </ul>

            <div className="hidden md:flex text-end ">
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
                  <Link to="/users/sign-in" className="nav-link text-white">
                    <button
                      type="button"
                      className="btn btn-outline-light me-2"
                    >
                      Login
                    </button>
                  </Link>
                  <Link to="/users/sign-up" className="nav-link text-white">
                    <button type="button" className="btn btn-warning">
                      Sign-up
                    </button>
                  </Link>
                </div>
              )}
            </div>
            <section className="md:hidden cursor-pointer relative z-10000 text-white">
              <RxHamburgerMenu
                className="text-lg"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
              {isMenuOpen && (
                <MenuDropdown
                  navigate={navigate}
                  handleLogout={handleLogout}
                  shoppingCart={shoppingCart}
                />
              )}
            </section>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
