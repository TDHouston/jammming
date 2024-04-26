import React, { useState } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch, searchTerm, setSearchTerm }) {
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const search = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="SearchBar">
      <input
        value={searchTerm}
        placeholder="Enter a Song, Album or Artist"
        onChange={handleInputChange}
      />
      <button className="SearchButton" onClick={search}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
