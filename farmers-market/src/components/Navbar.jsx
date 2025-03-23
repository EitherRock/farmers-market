import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    // <nav className="w-full flex justify-between pt-8 pb-4 pl-20 pr-20 ">
    <nav className="w-full pt-8 pb-4 pl-20 pr-20 ">

      {/* <p className="flex justify-start text-xl text-white space-x-4">Sulphur Springs Farmers Market</p> */}
      <ul className="flex justify-end space-x-4">
        <li>
          <Link to="/" className="text-xl text-white hover:text-[#D4AF37]">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className=" text-xl text-white hover:text-[#D4AF37]">
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" className="text-xl text-white hover:text-[#D4AF37]">
            Contact
          </Link>
        </li>
        <li>
          <Link to="/vendor" className="text-xl text-white hover:text-[#D4AF37]">
            Vendors
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;