import React, { useState } from "react";
import styles from "./SearchBar.module.css";

function SearchBar(props) {
  const [userInput, setUserInput] = useState("");

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const Search = () => {
    props.onSearch(userInput);
  };

  return (
    <>
      <div className={styles.div}>
        <input className={styles.input} placeholder="Enter a Song" onChange={handleInputChange} />
        <button className={styles.button} onClick={Search}>Search</button>
      </div>
    </>
  );
}

export default SearchBar;
