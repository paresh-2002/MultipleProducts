import { Link } from "react-router-dom";
import bannerImg from "../../assets/bannerImg.png";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import LoadingSpinner from "../LoadingSpinner";
import HomeItem from "../HomeItem";
import { BiFilter } from "react-icons/bi";
import itemsService from "../../services/ItemsService";
import { itemsActions } from "../../store/itemsSlice";

const categoryList = [
  { name: "fashion" },
  { name: "shirt" },
  { name: "jacket" },
  { name: "mobile" },
  { name: "laptop" },
  { name: "shoes" },
  { name: "home" },
  { name: "books" },
];
const HeroSection = () => {
  const [searchVal, setSearchVal] = useState("home");
  const [items,setItems] =useState();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const res = await itemsService.getAllProducts();
      dispatch(itemsActions.addInitialItems(res));
      setItems(res);
    })();
}, [dispatch]);
  const filteredProducts = items?.filter((product) =>
    product?.category?.toLowerCase().includes(searchVal.toLowerCase())
);
const [fetchStatus, setFetchStatus] = useState(true);

 useEffect(() => {
  setTimeout(() => {
    setFetchStatus(false);
  }, 2000);
 },[]);
  const handleSearch = (e) => {
    setSearchVal(e.target.value);
  };
  return (
    <div className="container mx-auto px-4">
      <section className="h-[500px] bg-hero bg-no-repeat bg-cover bg-center py-20">
        <div className="container mx-auto flex justify-around h-full">
          {/* text */}
          <div className="flex items-center justify-between">
            <div className="">
              <div className="font-semibold flex items-center uppercase">
                <div className="w-10 h-[2px] mr-3 bg-cyan-700"></div>Hot Trend
              </div>
              <h1 className="uppercase text-[55px] md:text-[70px] leading-[1.1] font-semibold mb-4">
                Fresh Fashion Finds
                <br />
                <span className="font-light">new collection</span>
              </h1>
              <Link
                to={"/all-products"}
                className="self-start uppercase font-semibold border-b-2 border-primary"
              >
                Discover More
              </Link>
            </div>
            <div className="w-1/2">
              <img src={bannerImg} alt="bannerImg" className="w-2/3 h-full" />
            </div>
          </div>
        </div>
      </section>
      <div className="container mx-auto px-4 ">
        <div className="bg-white z-1 top-[92px] sticky">
          <div className="flex flex-col lg:flex-row justify-between items-center m-2">
            <h2 className="text-2xl font-semibold mb-2 lg:mb-0">PRODUCTS</h2>
            <div className="flex lg:flex-row items-center w-full lg:w-auto">
              <div
                className="lg:mb-0 lg:mr-3 flex-grow lg:flex-grow-0"
                role="search"
              >
                <button
                  className={`flex justify-end py-1 px-2 rounded-md shadow-md items-center gap-1 hover:bg-[--primary-text-color] hover:text-black hover:shadow-lg 
                   text-white" `}
                  onChange={handleSearch}
                >
                  <span className="text-sm relative">
                    <select
                      value={searchVal}
                      className="form-control border-0 cursor-pointer rounded-md py-2 outline-none "
                    >
                      <option disabled>Select Product Category</option>
                      {categoryList?.map((value, index) => (
                        <option key={index} value={value.name}>
                          {value.name}
                        </option>
                      ))}
                    </select>
                  </span>
                  <BiFilter className="text-lg absolute" />
                </button>
              </div>
            </div>
          </div>
          <hr className="my-2" />
        </div>

        {filteredProducts?.length === 0 ? (
          <div className="flex items-center justify-center py-4">
            {fetchStatus ? (
              <LoadingSpinner />
            ) : (
              <p>No products found</p>
            )}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 justify-center">
            {filteredProducts?.map((item) => (
              <HomeItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
