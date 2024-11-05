import { useDispatch } from "react-redux";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { OrderActions } from "../store/orderSlice";
import { useNavigate } from "react-router-dom";

const OrderItems = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRemoveItem = () => {
    try {
      dispatch(OrderActions.removeFromOrder({ id: item.id }));
    } catch (error) {
      console.error('Error removing product:', error.message);
    }
  };

  const handleDecrement = () => {
    try {
      dispatch(OrderActions.decrement({ id: item.id }));
    } catch (error) {
      console.error('Error decreasing quantity:', error.message);
    }
  };

  const handleIncrement = () => {
    try {
      dispatch(OrderActions.increment({ id: item.id }));
    } catch (error) {
      console.error('Error increasing quantity:', error.message);
    }
  };

  return (
    <div className="text-sm border rounded relative mb-2 pt-3 pb-0 px-3 border-solid border-[#eaeaec] bg-white">
      <div className="absolute h-[148px] w-[111px] bg-[#fff2df]">
        <img className="card-img-top" src={item.productImg} alt={item.productName} onClick={() => {navigate(`/productInfo/${item.id}`)}}/>
      </div>
      <div className="relative min-h-[148px] ml-[111px] mb-3 pl-3">
        <div className="text-[#1a1b20] text-2xl leading-none overflow-hidden text-ellipsis whitespace-nowrap font-normal my-0">
          {item.productName}
        </div>
        <div className="price-container">
          <span className="text-xl font-bold text-[#282c3f]">Rs {item.productPrice}</span>
        </div>
        <div className="flex items-center justify-start gap-2 mt-2">
          <button className="text-sm btn btn-success" onClick={handleDecrement} disabled={item.qty <= 1}>-</button>
          <span className="text-xl">{item.qty}</span>
          <button className="text-sm btn btn-success" onClick={handleIncrement}>+</button>
        </div>
      </div>
      <div 
        className="absolute text-[25px] w-3.5 h-3.5 cursor-pointer right-4 top-2.5" 
        onClick={handleRemoveItem}
      >
        <RiDeleteBin5Fill />
      </div>
    </div>
  );
};

export default OrderItems;
