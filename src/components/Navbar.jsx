import { useCart } from "../context/CartContext";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"; // Import the Link component

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const bodyRef = useRef(null);

  const { cartItems } = useCart();
  const calculateTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      bodyRef.current.style.overflow = "hidden";
    } else {
      bodyRef.current.style.overflow = "auto";
    }
  }, [mobileMenuOpen]);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div ref={bodyRef}>
      <nav className="bg-black text-white text-lg px-4 sm:pl-4 md:px-4 lg:px-2 py-4 flex justify-between lg:justify-around items-center shadow-md relative">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/images/logo.png"
            alt="logo"
            className="w-10 h-10 object-fill lg:w-15 lg:h-auto lg:object-fill"
          />
          <h2 className="text-white text-xl lg:text-2xl font-bold">
            BrandBazaar
          </h2>
        </div>

        {/* Navigation Links (Desktop) */}
        <ul
          style={{ fontFamily: "poppins,sans-serif" }}
          className="hidden tracking-widest md:flex gap-1 md:gap-8 items-center"
        >
          <li>
            <Link to="/" className="text-white hover:text-blue-300 transition">
              Home
            </Link>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-500 cursor-not-allowed pointer-events-none"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-500 cursor-not-allowed pointer-events-none"
            >
              Sell
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-500 cursor-not-allowed pointer-events-none"
            >
              Return&Orders
            </a>
          </li>
        </ul>
        {/* Cart and Hamburger Section */}
        <div className="flex items-center gap-5">
          {/* Cart Icon with Badge */}
          <Link to="/cart" className="relative flex items-center">
            <FontAwesomeIcon
              icon={faCartPlus}
              className="text-white text-xl md:text-2xl hover:text-gray-300 transition"
            />
            {cartItems.length > 0 && (
              <span className="absolute -top-3 -right-3 bg-blue-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </Link>
          {/* Total Price */}
          {/* <span className="text-white font-medium">
            ${calculateTotalPrice()}
          </span> */}
          {/* Hamburger Menu Button (Mobile) */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md hover:bg-gray-700 focus:outline-none"
          >
            <FontAwesomeIcon
              icon={faBars}
              className="text-white text-xl transition-all duration-300"
            />
          </button>
        </div>
        {/* Mobile Menu */}
        <div
          ref={mobileMenuRef}
          className={`fixed top-15 rounded-md pl-6 right-0 h-auto w-auto bg-black/90 backdrop-blur-2xl shadow-lg transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden`}
          style={{ zIndex: 1000 }}
        >
          <div className="p-3 space-y-4">
            <ul className="space-y-4 ">
              <li>
                <Link
                  to="/"
                  className="text-white hover:text-gray-300 block py-2 "
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 cursor-not-allowed pointer-events-none block py-2"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 cursor-not-allowed pointer-events-none block py-2"
                >
                  Contact
                </a>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="text-white hover:text-gray-300 block py-2"
                >
                  Cart
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 cursor-not-allowed pointer-events-none block py-2"
                >
                  Customer Service
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
