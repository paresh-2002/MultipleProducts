import { MdClose } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { db } from "../FirebaseConfig";
import { ref as dbRef, set } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import LoadingSpinner from "./LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Cashout = ({
  setIsOpen,
  isOpen,
  finalPayment,
  totalItemQty,
  shoppingCart,
}) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const closeModal = () => setIsOpen(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [orderData, setOrderData] = useState({
    number: "",
    address: "",
    status: "confirmed",
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  useEffect(() => {
    if (Array.isArray(shoppingCart)) {
      const extractedProducts = shoppingCart.map((product) => ({
        id:product.id,
        category: product.category,
        productQty: product.qty || "",
        productName: product.productName || "",
        productImg: product.productImg || "",
        productPrice: product.productPrice || "",
      }));
      setProducts(extractedProducts);
    }
  }, [shoppingCart]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setOrderData((prev) => ({ ...prev, [id]: value }));
  };

  const isValidNumber = (number) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(number);
  };
  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { number, address, status, date } = orderData;

    const userName = currentUser?.name;
    const email = currentUser?.email;
    const userId = currentUser?.uid
    
    if (!userName || !email || !number || !address) {
      setError("All fields must be filled correctly.");
      setLoading(false);
      return;
    }

    if (!isValidNumber(number)) {
      setError("The number must be a valid 10-digit number.");
      setLoading(false);
      return;
    }
    const productId = uuidv4();
    try {
      const productData = {
        id: productId,
        userName,
        email,
        number: Number(number),
        products,
        finalPayment,
        totalItemQty,
        address,
        status,
        date,
        userId
      };
      await set(dbRef(db, `orderUserData/${productId}`), productData);
      setOrderData({ number: "", address: "" });
      setError("");
      toast.success(
        "Your order has been placed successfully. Thanks for visiting us"
      );
      closeModal();
      navigate("/");
      // window.location.reload();
    } catch (error) {
      console.error("Error adding product:", error);
      setError(error.message || "Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            aria-hidden="true"
            onClick={closeModal}
          />
          <div
            className="fixed inset-0 flex items-center justify-center z-50"
            role="dialog"
            aria-labelledby="modal-title"
            tabIndex="-1"
          >
            <div className="bg-white border shadow-sm rounded-xl w-full max-w-lg mx-auto relative">
              <div className="flex justify-end items-center gap-x-2 py-3 px-4">
                <button
                  type="button"
                  className="inline-flex items-center gap-x-2 text-2xl font-medium border-none text-gray-800 focus:outline-none"
                  onClick={closeModal}
                >
                  <MdClose />
                </button>
              </div>
              <h3 className="text-center">CashOut</h3>
              <div className="max-w-md mx-auto mt-2 p-3">
                <form
                  autoComplete="off"
                  onSubmit={addProduct}
                  className="space-y-4"
                >
                  <div>
                    <label
                      htmlFor="userName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      UserName
                    </label>
                    <input
                      type="text"
                      id="userName"
                      className="form-control w-full mb-3 border-2 border-gray-300 rounded-md p-2 outline-none focus:border-cyan-500 focus:ring focus:ring-cyan-200 focus:ring-opacity-50"
                      value={currentUser.name}
                      readOnly
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control w-full mb-3 border-2 border-gray-300 rounded-md p-2 outline-none focus:border-cyan-500 focus:ring focus:ring-cyan-200 focus:ring-opacity-50"
                      value={currentUser.email}
                      readOnly
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="number"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>
                    <input
                      type="number"
                      id="number"
                      className="form-control w-full mb-3 border-2 border-gray-300 rounded-md p-2 outline-none focus:border-cyan-500 focus:ring focus:ring-cyan-200 focus:ring-opacity-50"
                      value={orderData.number}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <textarea
                      id="address"
                      className="form-control w-full mb-3 border-2 border-gray-300 rounded-md p-2 outline-none focus:border-cyan-500 focus:ring focus:ring-cyan-200 focus:ring-opacity-50"
                      value={orderData.address}
                      onChange={handleInputChange}
                    />
                  </div>

                  <button
                    className="block w-full md:w-1/3 mx-auto p-2 rounded-md bg-cyan-800 text-white hover:bg-cyan-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50"
                    type="submit"
                  >
                    {loading ? <LoadingSpinner /> : "SUBMIT"}
                  </button>
                </form>
                {error && (
                  <span className="text-red-500 mt-5 block text-center">
                    {error}
                  </span>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cashout;
