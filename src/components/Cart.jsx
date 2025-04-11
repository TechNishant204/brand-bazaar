import React from "react";
import CartItem from "./CartItem";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();

  const calculateSubTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };
  const handlePay = () =>{
    toast.success("Your payment of ${$total} was successfully completed");
  }
  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
    if (cartItems.length === 1) {
      toast.info("Last item is removed. Your cart is empty now");
    } else {
      toast.success("Item removed from cart");
    }
  };

  const handleClearCart = () => {
    clearCart();
    toast.info("Your cart has been cleared");
  };

  const subtotal = calculateSubTotal();
  const discount = subtotal * 0.3;
  const total = subtotal - discount;

  return (
    <div className="flex justify-center py-8">
      <div className="max-w-lg md:max-w-4xl w-full px-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-red-500 text-center md:text-xl">
            Your cart is empty
          </p>
        ) : (
          <>
            <button
              onClick={handleClearCart}
              className="bg-red-500 hover:bg-red-600 hover:scale-105 text-white font-bold py-2 px-4 rounded-lg my-4 md:my-12 block mx-auto"
            >
              Clear Cart
            </button>
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                removeFromCart={handleRemoveFromCart}
                updateQuantity={updateQuantity}
              />
            ))}
            <div className="mt-4 flex justify-between ">
              <p className="font-bold md:text-xl">
                Subtotal: ${subtotal.toFixed(2)}
                <span className="text-red-600 text-xs font-semibold">
                  <p>
                    Final Discount if Checkout now(-30%): -$
                    {discount.toFixed(2)}{" "}
                  </p>
                </span>
              </p>

              <p className="font-bold text-xl md:text-2xl ">
                Total: ${total.toFixed(2)}
              </p>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 px-6 md:px-auto hover:scale-105 text-white font-semibold py-2 rounded-lg my-4 md:my-12 block mx-auto"
              onClick= {handlePay}
              >
              Pay
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
