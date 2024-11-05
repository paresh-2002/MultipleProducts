import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { get, ref, remove } from "firebase/database";
import { db } from "../../FirebaseConfig";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner";
import AddItemModel from "../Model";
import { MdAddCircle, MdEdit } from "react-icons/md";
import { itemsActions } from "../../store/itemsSlice";
import { RiDeleteBin5Fill } from "react-icons/ri";

const ProductDetail = () => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [getAllProduct, setGetAllProduct] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const dbRef = ref(db, "products/");
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          const data = Object.values(snapshot.val());
          dispatch(itemsActions.addInitialItems(data));
          setGetAllProduct(data);
        } else {
          console.error("Fetched data is empty.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
      }
    };
    getAllProducts();
  }, []);
  // navigate
  const navigate = useNavigate();

  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsOpen(true);
  };
  // Delete product
  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      const dbRef = ref(db, `products/${id}`);
      await remove(dbRef);
      toast.success("Product removed successfully");
      dispatch(itemsActions.removeProduct(id));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <div>
      <div className="py-5 flex justify-between items-center">
        {/* text  */}
        <h1 className=" text-xl text-pink-300 font-bold">All Product</h1>
        {/* Add Product Button  */}
        <Link
          to={"/add_item"}
          className="px-5 py-2 bg-pink-50 border border-pink-100 no-underline rounded-lg text-gray-700"
        >
          <button className=" flex justify-center items-center gap-1">
            <MdAddCircle />
            Add Product
          </button>
        </Link>
      </div>

      {/* table  */}
      <div className="w-full overflow-x-auto mb-5">
        <table className="w-full text-left border border-collapse sm:border-separate border-pink-100 text-pink-400">
          <tbody>
            <tr>
              <th
                scope="col"
                className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara"
              >
                S.No.
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara"
              >
                Image
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"
              >
                Title
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"
              >
                Price
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"
              >
                Category
              </th>
              {/* <th
                scope="col"
                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"
              >
                {" "}
                Date
              </th> */}
              <th
                scope="col"
                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"
              >
                Action
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"
              >
                Action
              </th>
            </tr>
            {getAllProduct.map((item, index) => {
              const { id, productName, productPrice, category, productImg } =
                item;
              return (
                <tr key={index} className="text-pink-300">
                  <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 ">
                    {index + 1}.
                  </td>
                  <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                    <div className="flex justify-center">
                      <img className="w-20 " src={productImg} alt="" />
                    </div>
                  </td>
                  <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                    {productName}
                  </td>
                  <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                    ₹{productPrice}
                  </td>
                  <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                    {category}
                  </td>
                  {/* <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                    {date}
                  </td> */}
                  <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 text-green-500 cursor-pointer ">
                    <AddItemModel
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      item={currentItem}
                    />
                    <button
                      type="button"
                      className="btn btn-success py-2 cursor-pointer"
                      onClick={() => handleEdit(item)}
                    >
                      <MdEdit />
                    </button>
                  </td>
                  <td
                    onClick={() => deleteProduct(id)}
                    className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 text-red-500 cursor-pointer "
                  >
                    <button
                      type="button"
                      className="btn btn-danger py-2 cursor-pointer"
                    >
                      <RiDeleteBin5Fill />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="w-full m-auto">
          {loading ? (
            <div className="flex justify-center mt-5">
              <LoadingSpinner />
            </div>
          ) : (
            getAllProduct.length === 0 && (
              <div className="flex justify-center mt-5">
                <p>Order Not Found</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
