import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Pokémon Battle Game</h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:underline">Home</Link>
          </li>
          <li>
            <Link to="/roster" className="hover:underline">My Roster</Link>
          </li>
          <li>
            <Link to="/battle" className="hover:underline">Battle</Link>
          </li>
          <li>
            <Link to="/leaderboard" className="hover:underline">Leaderboard</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
