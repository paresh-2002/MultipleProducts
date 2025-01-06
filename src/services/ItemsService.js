import { db, storage } from "../FirebaseConfig";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { ref as dbRef1, get, remove, set, update } from "firebase/database";
import { v4 as uuidv4 } from "uuid";

class ItemsService {
  addProduct = async ({ product, productImg }) => {
    const { productName, productPrice, category } = product;
    try {
      const productId = uuidv4();
      const imageRef = storageRef(storage, `images/${productId}`);
      await uploadBytes(imageRef, productImg);
      const url = await getDownloadURL(imageRef);

      const productData = {
        id: productId,
        productName,
        productPrice: Number(productPrice),
        productImg: url,
        category,
      };

      await set(dbRef1(db, `products/${productId}`), productData);
      return true;
    } catch (error) {
      console.error("Error adding product:", error.message);
      return false;
    }
  };

  getAllProducts = async () => {
    try {
      const dbRef = dbRef1(db, "products/");
      const snapshot = await get(dbRef);

      if (snapshot.exists()) {
        const data = Object.values(snapshot.val());
        return data;
      } else {
        console.error("No products found in the database.");
        return [];
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  deleteProduct = async (id) => {
    try {
      const dbRef = dbRef1(db, `products/${id}`);
      const snapshot = await get(dbRef);

      if (!snapshot.exists()) {
        console.error("Product not found.");
        return false;
      }

      await remove(dbRef);
      return true;
    } catch (error) {
      console.error("Error deleting product:", error);
      return false;
    }
  };

  updateProduct = async ({item,formData, existingImg,productImg}) => {
    const { productName, productPrice, category } = formData;
    try {
          if (item) {
            let imageUrl = existingImg;
            if (productImg) {
              const imageRef = storageRef(storage, `images/${item.id}`);
              await uploadBytes(imageRef, productImg);
              imageUrl = await getDownloadURL(imageRef);
            }
            await update(dbRef1(db, `products/${item.id}`), {
              productName,
              productPrice: Number(productPrice),
              category,
              productImg: imageUrl,
            });
          } else {
            const productId = uuidv4();
            const imageRef = storageRef(storage, `images/${productId}`);
            await uploadBytes(imageRef, productImg);
            const url = await getDownloadURL(imageRef);
    
            const productData = {
              id: productId,
              productName,
              productPrice: Number(productPrice),
              category,
              productImg: url,
            };
    
            await set(dbRef1(db, `products/${productId}`), productData);
            console.log(productData)
            return productData
          }
          
          document.getElementById("productImg").value = "";
        } catch (error) {
          console.error("Error handling product:", error.message);
        }
  }

  fetchUserOrders = async () => {
    try {
      const dbRef = dbRef1(db, `orderUserData/`);
      const snapshot = await get(dbRef);

      if (snapshot.exists()) {
        const userOrderData = Object.values(snapshot.val());
        return userOrderData;
      } else {
        console.log("No order found for the provided ID.");
        return []
      }
    } catch (error) {
      console.error(`Error fetching order: ${error.message}`);
      return [];
    }
  };

  userDetails = async () => {
    try {
      const dbRef = dbRef1(db, `userData/`);
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const userOrderData = Object.values(snapshot.val());
        return userOrderData;
      } else {
        console.log("No order found for the provided ID.");
        return[]
      }
    } catch (error) {
      console.error(`Error fetching order: ${error.message}`);
    }
  };

  deleteUserOrders = async (id) => {
    try {
      const dbRef = dbRef1(db, `orderUserData/${id}`);
      await remove(dbRef);
      return true;
    } catch (error) {
      console.error("Error deleting order:", error);
      return false;
    }
  };

  getProduct = async ({ id }) => {
    const dbRef = dbRef1(db, `products/${id}`);
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return data;
    }
  };
}

const itemsService = new ItemsService();
export default itemsService;
