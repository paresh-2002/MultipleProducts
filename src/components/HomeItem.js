import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import AddItemModel from "./Model";
import { useNavigate } from "react-router-dom";
import { OrderActions } from "../store/orderSlice";

const HomeItem = ({ item }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const { shoppingCart } = useSelector((store) => store.order);
  const existingItem = shoppingCart.find(cartItem => cartItem.id === item.id);
  const [isOpen, setIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
console.log(existingItem);

  const handleAddToOrder = () => {
    if (!currentUser) {
      toast.info("Please Login to add Order");
      navigate('/users/sign_in');
    } else {
      dispatch(OrderActions.addToOrder({ id: item.id, item }));
    }
  };

  const handleEdit = () => {
    setCurrentItem(item);
    setIsOpen(true);
  };

  return (
    <div className="card w-[18rem]">
      <div className="h-[70%]">
        <img
          className="card-img-top"
          src={item.productImg}
          alt={item.productName}
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">{item.productName}</h5>
        <p className="m-0">₹{item.productPrice}</p>
      </div>
      <div className="flex justify-between items-center m-2 gap-2">
        <button
          className={`btn w-full btn-primary ${existingItem && 'disabled'}`}
          onClick={handleAddToOrder}
        >
          {existingItem ? "Go to Bag" : "Add to Bag"}
        </button>
        {currentUser && (
          <>
            <AddItemModel
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              item={currentItem}
            />
            <button
              type="button"
              className="btn btn-success py-2 cursor-pointer"
              onClick={handleEdit}
            >
              <MdEdit />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default HomeItem;
