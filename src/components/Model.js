import { MdClose } from "react-icons/md";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "./LoadingSpinner";
import itemsService from "../services/ItemsService";

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

const AddItemModel = ({ setIsOpen, isOpen, item }) => {
  const closeModal = () => setIsOpen(false);
  const [formData, setFormData] = useState({
    productName: "",
    productPrice: "",
    category: "",
  });
  const [productImg, setProductImg] = useState(null);
  const [existingImg, setExistingImg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData({
        productName: item.productName,
        productPrice: item.productPrice,
        category: item.category,
      });
      setExistingImg(item.productImg);
    }
  }, [item]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setProductImg(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { productName, productPrice } = formData;
    if (!productName || !productPrice) {
      setError("All fields must be filled correctly.");
      return;
    }
    try {

      const res = await itemsService.updateProduct({item,existingImg,formData, productImg})
      if(res){
        if(productImg){
          toast.success("Product updated successfully");
        }else{
          toast.success("Product added successfully");
        }
      }
      setFormData({ productName: "", productPrice: "" });
      setProductImg(null);
      setExistingImg("");
      setError("");
      closeModal();
      document.getElementById("productImg").value = "";
      window.location.reload();
    } catch (error) {
      setError("Failed to handle product. Please try again.");
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
              <h3 className="text-center">
                {item ? "Edit Product" : "Add Product"}
              </h3>
              <div className="max-w-md mx-auto mt-2 p-3">
                <form
                  autoComplete="off"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div>
                    <label
                      htmlFor="productName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Product Name
                    </label>
                    <input
                      type="text"
                      id="productName"
                      className="form-control w-full mb-3 border-2 border-gray-300 rounded-md p-2 outline-none focus:border-cyan-500 focus:ring focus:ring-cyan-200 focus:ring-opacity-50"
                      value={formData.productName}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="productPrice"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Product Price
                    </label>
                    <input
                      type="number"
                      id="productPrice"
                      className="form-control w-full mb-3 border-2 border-gray-300 rounded-md p-2 outline-none focus:border-cyan-500 focus:ring focus:ring-cyan-200 focus:ring-opacity-50"
                      value={formData.productPrice}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="product_price"
                      className="mb-2 block text-sm  font-medium text-gray-700"
                    >
                      Product Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="form-control w-full mb-3 border-2 cursor-pointer border-gray-300 rounded-md p-2 outline-none focus:border-cyan-500 focus:ring focus:ring-cyan-200 focus:ring-opacity-50"
                    >
                      <option disabled>Select Product Category</option>
                      {categoryList.map((value, index) => (
                        <option key={index} value={value.name}>
                          {value.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="productImg"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Product Image
                    </label>
                    {item && existingImg && !productImg && (
                      <div className="mb-3">
                        <img
                          src={existingImg}
                          alt="Current Product"
                          className="w-full h-32 object-cover rounded-md"
                        />
                      </div>
                    )}
                    <input
                      type="file"
                      id="productImg"
                      className="form-control w-full mb-3 border-2 border-gray-300 rounded-md p-2 outline-none focus:border-cyan-500 focus:ring focus:ring-cyan-200 focus:ring-opacity-50"
                      onChange={handleFileChange}
                    />
                  </div>

                  <button
                    className="block w-full md:w-1/3 mx-auto p-2 rounded-md bg-cyan-800 text-white hover:bg-cyan-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50"
                    type="submit"
                  >
                    {loading ? <LoadingSpinner /> : item ? "Update" : "Add"}
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

export default AddItemModel;
