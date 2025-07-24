const BASE_URL = "http://localhost:5042"; // Base URL for the API

export const ENDPOINTS = {
  AUTH: {
    // Authentication endpoints
    REGISTER: `${BASE_URL}/auth/register`,
    LOGIN: `${BASE_URL}/auth/login`,
    REFRESH: `${BASE_URL}/auth/refreshtoken`,
  },

  USER: {
    // User endpoints
    GET_ALL: `${BASE_URL}/User/GetUsers`,
    GET_BY_ID: (userId) => `${BASE_URL}/User/GetUsers?userId=${userId}`,
    UPSERT: `${BASE_URL}/User/UpsertUser`,
    DELETE: (userId) => `${BASE_URL}/User/Delete/${userId}`,
    UPDATE: (userId) => `${BASE_URL}/User/Update/${userId}`,
  },

  ARTIST: {
    // Artist endpoints
    GET_ALL: `${BASE_URL}/Artist/GetArtists`,
    GET_BY_ID: (artistId) =>
      `${BASE_URL}/Artist/GetArtist?artistId=${artistId}`,
    UPSERT: `${BASE_URL}/Artist/UpsertArtist`,
    DELETE: (artistId) => `${BASE_URL}/Artist/Delete/${artistId}`,
    UPDATE: (artistId) => `${BASE_URL}/Artist/Update/${artistId}`,
  },

  CUSTOMER: {
    // Customer endpoints
    GET_ALL: `${BASE_URL}/Customer/GetCustomers`,
    GET_BY_ID: (customerId) =>
      `${BASE_URL}/Customer/GetCustomer?customerId=${customerId}`,
    UPSERT: `${BASE_URL}/Customer/UpsertCustomer`,
    DELETE: (customerId) => `${BASE_URL}/Customer/Delete/${customerId}`,
    UPDATE: (customerId) => `${BASE_URL}/Customer/Update/${customerId}`,
  },

  PRODUCT: {
    // Product endpoints
    GET_ALL: `${BASE_URL}/Product/GetProducts`,
    GET_BY_ID: (productId) =>
      `${BASE_URL}/Product/GetProducts?productId=${productId}`,
    SEARCH: ({ productId, searchTerm, categoryId, artistId }) => {
      const params = new URLSearchParams();

      if (productId) params.append("productId", productId);
      if (searchTerm) params.append("searchTerm", searchTerm);
      if (categoryId) params.append("categoryId", categoryId);
      if (artistId) params.append("artistId", artistId);

      return `${BASE_URL}/Product/GetProducts?${params.toString()}`;
    },
    UPSERT: `${BASE_URL}/Product/UpsertProduct`,
    DELETE: (productId) => `${BASE_URL}/Product/Delete/${productId}`,
    UPDATE: (productId) => `${BASE_URL}/Product/Update/${productId}`,
  },

  CATEGORY: {
    // Category endpoints
    GET_ALL: `${BASE_URL}/Category/GetCategories`,
    GET_BY_ID: (categoryId) =>
      `${BASE_URL}/Category/GetCategory?categoryId=${categoryId}`,
    UPSERT: `${BASE_URL}/Category/UpsertCategory`,
    DELETE: (categoryId) => `${BASE_URL}/Category/Delete/${categoryId}`,
    UPDATE: (categoryId) => `${BASE_URL}/Category/Update/${categoryId}`,
  },

  ORDER: {
    // Order endpoints
    GET_ALL: `${BASE_URL}/Order/GetOrders`,
    GET_BY_ID: (orderId) => `${BASE_URL}/Order/GetOrder?orderId=${orderId}`,
    UPSERT: `${BASE_URL}/Order/UpsertOrder`,
    DELETE: (orderId) => `${BASE_URL}/Order/Delete/${orderId}`,
    UPDATE: (orderId) => `${BASE_URL}/Order/Update/${orderId}`,
  },

  ORDER_ITEM: {
    // Order Item endpoints
    GET_BY_ID: (orderId) => `${BASE_URL}/Order/${orderId}/Items`,
    UPSERT: (orderId) => `${BASE_URL}/Order/${orderId}/Items`,
    DELETE: (orderItemId) => `${BASE_URL}/Order/Items/Delete/${orderItemId}`,
  },

  CART: {
    // Cart endpoints
    GET_ALL: `${BASE_URL}/Cart/GetCarts`,
    GET_BY_ID: (userId) => `${BASE_URL}/Cart/${userId}/Items`,
    UPSERT: (userId) => `${BASE_URL}/Cart/${userId}/Items`,
    DELETE: (cartId) => `${BASE_URL}/Cart/Items/Delete/${cartId}`,
    UPDATE: (userId) => `${BASE_URL}/Cart/Clear/${userId}`,
  },

  PAYMENT: {
    // Payment endpoints
    GET_ALL: `${BASE_URL}/Payment/Methods`,
    UPSERT: `${BASE_URL}/Payment/Pay`,
    GET_BY_ID: (orderId) => `${BASE_URL}/Payment/Order/${orderId}`,
  },
};
