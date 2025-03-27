import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Import icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-gray-900 text-white py-4 px-6 md:px-20 flex items-center justify-between">
      {/* Logo */}
      <p className="text-xl font-bold">Sulphur Springs Farmers Market</p>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-6">
        <li>
          <Link to="/" className="text-xl hover:text-[#D4AF37]">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="text-xl hover:text-[#D4AF37]">
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" className="text-xl hover:text-[#D4AF37]">
            Contact
          </Link>
        </li>
        <li>
          <Link to="/vendor" className="text-xl hover:text-[#D4AF37]">
            Vendors
          </Link>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <ul className="absolute top-16 left-0 w-full bg-gray-900 text-white flex flex-col items-center space-y-4 py-6 md:hidden">
          <li>
            <Link to="/" className="text-xl hover:text-[#D4AF37]" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-xl hover:text-[#D4AF37]" onClick={() => setIsOpen(false)}>
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-xl hover:text-[#D4AF37]" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </li>
          <li>
            <Link to="/vendor" className="text-xl hover:text-[#D4AF37]" onClick={() => setIsOpen(false)}>
              Vendors
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;