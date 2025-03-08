import React, { useState } from "react";

const CartItem = ({ item, removeFromCart, updateQuantity }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    updateQuantity(item.id, newQuantity);
  };

  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="flex item-center">
        <img
          src={item.image}
          alt={item.title}
          className="h-16 w-16 object-contain mr-4"
        />
        <div>
          <h3 className="font-semibold md:text-lg">{item.title}</h3>
          <p className="text-gray-600">${item.price}</p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-center">
          <button
            onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}
            className="bg-gray-200 hover:bg-red-500 text-gray-600 py-1 px-2 rounded"
            disabled={quantity === 1}
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10))}
            className="mx-2 w-8 text-center"
            min="1"
          />
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            className="mx-2 w-12 text-center hover:bg-green-400 rounded"
          >
            +
          </button>
        </div>
        <div className="flex align-center justify-center pt-2">
          <button
            onClick={() => removeFromCart(item.id)}
            className="btn border-2 border-red-500 rounded-lg  mb-4 px-2 py-1 text-red-500 hover:bg-red-600 hover:scale-110 hover:text-white transition duration-300"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
