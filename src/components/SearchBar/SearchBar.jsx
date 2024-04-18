import React, { useState } from "react";
import styles from "./SearchBar.module.css";

function SearchBar({ onSearch }) {
  const [userInput, setUserInput] = useState("");

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const search = () => {
    onSearch(userInput);
  };

  return (
    <>
      <div className={styles.div}>
        <input
          className={styles.input}
          placeholder="Enter a Song, Album or Artist"
          onChange={handleInputChange}
        />
        <button className={styles.button} onClick={search}>
          Search
        </button>
      </div>
    </>
  );
}

export default SearchBar;
