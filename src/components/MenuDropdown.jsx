import { MdAddCircle, MdHome, MdListAlt, MdShoppingCart } from "react-icons/md";
import { IoMdLogIn, IoMdPerson } from "react-icons/io";
import { useSelector } from "react-redux";
import { IoMdLogOut } from "react-icons/io";

const MenuDropdown = ({ navigate, handleLogout, shoppingCart, setIsMenuOpen }) => {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className="absolute right-0 bg-amber-50 font-semibold text-black  rounded-lg shadow w-max  overflow-hidden transition-all">
      <ul className="text-sm  ">
        <li onClick={() => {navigate("/"); setIsMenuOpen(false)}}>
          <span className="flex items-center px-5 py-3 hover:bg-amber-100 ">
            <MdHome className="text-lg me-3" /> Home
          </span>
        </li>
        <li onClick={() => {navigate("/all-products") ; setIsMenuOpen(false)}}>
          <span className="flex items-center px-5 py-3 hover:bg-amber-100 ">
            <MdListAlt className="text-lg me-3" /> AllProducts
          </span>
        </li>
        {currentUser ? (
          <>
            <li onClick={() => {navigate("/orders"); setIsMenuOpen(false)}}>
              <span className="flex items-center px-5 py-3 hover:bg-amber-100 ">
                <MdShoppingCart className="text-lg me-3" /> Orders
                <span className="bg-[#f16565] whitespace-nowrap text-center leading-[18px] h-[18px] relative text-xs text-white font-bold cursor-pointer px-1.5 py-0 rounded-[50%] right-1 top-[-8px]">
                  {shoppingCart.length}
                </span>
              </span>
            </li>
            {currentUser?.role === "admin" ? (
              <>
                <li onClick={() => {navigate("/add-item") ; setIsMenuOpen(false)}}>
                  <span className="flex items-center px-5 py-3 hover:bg-amber-100 ">
                    <MdAddCircle className="text-lg me-3" /> Add Item
                  </span>
                </li>

                <li onClick={() => navigate("/admin-dashboard")}>
                  <span className="flex items-center px-5 py-3 hover:bg-amber-100 ">
                    <IoMdPerson className="text-lg me-3" /> Admin
                  </span>
                </li>
              </>
            ) : (
              <li onClick={() => navigate("/user-dashboard")}>
                <span className="flex items-center px-5 py-3 hover:bg-amber-100 ">
                  <IoMdPerson className="text-lg me-3" /> User
                </span>
              </li>
            )}

            <li onClick={() => navigate("/users/sign-in")}>
              <span
                className="flex items-center px-5 py-3 hover:bg-amber-100 "
                onClick={handleLogout}
              >
                <IoMdLogOut className="text-lg me-3" />
                Logout
              </span>
            </li>
          </>
        ) : (
          <>
            <li onClick={() => navigate("/users/sign-in")}>
              <span className="flex items-center px-5 py-3 hover:bg-amber-100 ">
                <IoMdLogIn className="text-lg me-3" /> Login
              </span>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default MenuDropdown;
