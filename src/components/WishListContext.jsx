import { createContext, useContext, useEffect, useState } from "react";

// Create context for wishlist
const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage when component mounts
  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Add product to wishlist if not already present
  const addToWishlist = (product) => {
    console.log("Adding to wishlist:", product);
    setWishlist((prev) => {
      const exists = prev.find((item) => item.productId === product.productId);
      if (exists) {
        console.log("Already in wishlist:", product.productId);
        return prev;
      }
      console.log("Added to wishlist:", product.productId);
      return [...prev, product];
    });
  };

  // Remove product from wishlist by productId
  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.productId !== productId));
  };

  // Clear all wishlist items
  const clearWishlist = () => setWishlist([]);

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, clearWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

// Custom hook to use wishlist context
export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
