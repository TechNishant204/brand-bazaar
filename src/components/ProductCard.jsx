import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const isProductInCart = cartItems.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    if (isProductInCart) {
      removeFromCart(product.id);
      toast.info("Item removed from the cart");
    } else {
      const result = addToCart(product);
      if (result.error) {
        toast.error(result.message || "Item already in the cart");
      } else {
        toast.success("Item added to the cart");
      }
    }
  };

  const titleClass = showFullDescription
    ? "text-lg font-semibold mb-2"
    : "text-lg font-semibold mb-2 truncate";

  return (
    <div className="border-2 border-gray-300 overflow-hidden shadow-lg bg-white group-hover:scale-y-110 transition-all">
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-36 py-2 object-contain hover:scale-110 hover:rotate-y-6  transition-transform duration-300"
        />
        {/* Sale Badge */}
        <div className="absolute top-2 left-2 bg-pink-600 text-white px-2 py-1 rounded-lg text-sm hover:scale-105 hover:-rotate-z-6 ">
          Sale 30% off
        </div>
      </div>

      <div className="p-4">
        <h2 className={titleClass}>{product.title}</h2>
        <p className="text-gray-700 text-xs ">
          {showFullDescription ? product.description : product.shortDescription}
        </p>
        <button
          onClick={() => setShowFullDescription(!showFullDescription)}
          className="text-blue-500 text-base hover:underline mt-2"
        >
          {showFullDescription ? "Show less" : "Read More"}
        </button>
        <div className="flex justify-between items-center mt-4">
          <div>
            <span className="text-gray-400 line-through mr-2">
              ${(product.price * 1.2).toFixed(2)}
            </span>
            <span className="text-xl font-bold text-black">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            className={`rounded-lg px-5 py-2 shadow-md ${
              isProductInCart
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white transition-colors`}
          >
            {isProductInCart ? "Remove" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
