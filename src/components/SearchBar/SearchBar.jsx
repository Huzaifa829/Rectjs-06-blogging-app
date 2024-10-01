// src/components/SearchBar.js

import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'; // Search icon

function SearchBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative">
      {/* Search bar for large screens */}
      <div className="hidden md:flex">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-48 lg:w-64"
        />
      </div>

      {/* Search icon for mobile screens */}
      <div className="md:hidden">
        <FaSearch className="text-xl cursor-pointer" onClick={toggleDropdown} />
      </div>

      {/* Dropdown search bar for mobile */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 p-2 bg-white shadow-lg rounded-md">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-full"
          />
        </div>
      )}
    </div>
  );
}

export default SearchBar;
