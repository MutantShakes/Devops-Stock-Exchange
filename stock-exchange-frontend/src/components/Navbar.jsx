import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-xl font-bold">Stock Exchange</Link>
        <div className="flex space-x-4">
          <Link to="/" className="hover:underline">Market Trends</Link>
          <Link to="/analysis" className="hover:underline">Analysis</Link>
          <Link to="/register-stock" className="hover:underline">Register Stock</Link>
          <Link to="/transactions" className="hover:underline">Transactions</Link>
          <Link to="/register-user" className="hover:underline">Register User</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
