import axios from "axios";
import { ENDPOINTS } from "../Constant";

export const uploadProduct = async (productData) => {
  const payload = {
    productId: productData.productId || 0,
    productName: productData.productName,
    categoryId: productData.categoryId,
    productDesc: productData.productDesc,
    actualPrice: productData.actualPrice,
    sellingPrice: productData.sellingPrice,
    quantity: productData.quantity,
    artistId: productData.artistId,
    productImage: productData.productImage, // already a URL
  };

  const response = await axios.post(ENDPOINTS.PRODUCT.UPSERT, payload);
  return response.data;
};
