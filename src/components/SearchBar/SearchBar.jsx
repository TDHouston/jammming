import React, { useState } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [userInput, setUserInput] = useState("");

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const search = () => {
    onSearch(userInput);
  };

  return (
    <div className="SearchBar">
      <input
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
