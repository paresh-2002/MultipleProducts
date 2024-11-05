import { get, ref } from "firebase/database";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { db } from "../../FirebaseConfig";
import LoadingSpinner from "../LoadingSpinner";

const UserDashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [userOrderList, setUserOrderList] = useState([]);
  console.log(userOrderList);

  useEffect(() => {
    const fetchUserOrders = async () => {
      setLoading(true);
      try {
        const dbRef = ref(db, `orderUserData/`);
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          const userOrderData = Object.values(snapshot.val());
          setUserOrderList(userOrderData);
        } else {
          console.log("No order found for the provided ID.");
        }
      } catch (error) {
        console.error(`Error fetching order: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, []);

  return (
    <>
      <div className=" container mx-auto px-4 py-5 lg:py-8">
        <div className="top">
          <div className="bg-slate-50 py-5 w-full m-auto rounded-b-xl border-0 shadow-xl border-pink-100">
            <div className="flex justify-center">
              <img
                src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
                alt=""
                className="h-24 w-24"
              />
            </div>
            <div className="">
              <h1 className="text-center text-lg">
                <span className="font-bold">Name: </span>
                {currentUser?.name}
              </h1>
              <h1 className="text-center text-lg">
                <span className="font-bold">Email: </span>
                {currentUser?.email}
              </h1>
              <h1 className="text-center text-lg">
                <span className="font-bold">Role: </span>
                {currentUser?.role}
              </h1>
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
            <h2 className=" text-2xl lg:text-3xl font-bold">Order Details</h2>
            <div className="flex justify-center relative top-10">
              {loading && (
                <div className="flex justify-center mt-5">
                  <LoadingSpinner />
                </div>
              )}
            </div>
            {userOrderList.length === 0 && (
              <div className="flex justify-center mt-5">
                <p>Order Not Found</p>
              </div>
            )}
            {userOrderList
              .filter((obj) => obj.userId === currentUser?.uid)
              .map((order, index) => {
                return (
                  <div key={index}>
                    {order.products.map((item, index) => {
                      // console.log('item', item);
                      const {
                        productQty,
                        productName,
                        productImg,
                        productPrice,
                      } = item;
                      // console.log('order', order)
                      const { status, id, date } = order;
                      return (
                        <div
                          key={index}
                          className="mt-5 flex flex-col overflow-hidden rounded-xl border border-pink-100 md:flex-row"
                        >
                          <div className="w-full border-r border-pink-100 bg-pink-50 md:max-w-xs">
                            <div className="p-8">
                              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
                                <div className="mb-4">
                                  <div className="text-sm font-semibold text-black">
                                    Order Id
                                  </div>
                                  <div className="text-sm font-medium text-gray-900">
                                    #{id}
                                  </div>
                                </div>
                                <div className="mb-4">
                                  <div className="text-sm font-semibold">
                                    Date
                                  </div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {date}
                                  </div>
                                </div>
                                <div className="mb-4">
                                  <div className="text-sm font-semibold">
                                    Total Amount
                                  </div>
                                  <div className="text-sm font-medium text-gray-900">
                                    ₹ {productPrice * productQty}
                                  </div>
                                </div>

                                <div className="mb-4">
                                  <div className="text-sm font-semibold">
                                    Order Status
                                  </div>
                                  <div className="text-sm font-medium text-green-800 first-letter:uppercase">
                                    {status}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="p-8">
                              <ul className="-my-7 divide-y divide-gray-200">
                                <li className="flex flex-col justify-between space-x-5 py-7 md:flex-row">
                                  <div className="flex flex-1 items-stretch">
                                    <div className="flex-shrink-0">
                                      <img
                                        className="h-40 w-40 rounded-lg border border-gray-200 object-contain"
                                        src={productImg}
                                        alt="img"
                                      />
                                    </div>

                                    <div className="ml-5 flex flex-col justify-between">
                                      <div className="flex-1">
                                        <p className="text-sm font-bold text-gray-900">
                                          {productName}
                                        </p>
                                      </div>

                                      <p className="mt-4 text-sm font-medium text-gray-500">
                                        x {productQty}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="ml-auto flex flex-col items-end justify-between">
                                    <p className="text-right text-sm font-bold text-gray-900">
                                      ₹ {productPrice}
                                    </p>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
