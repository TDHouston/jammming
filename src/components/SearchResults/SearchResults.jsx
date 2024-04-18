import React from "react";
import styles from "./SearchResults.module.css";
import TrackList from "../TrackList/Tracklist";

function SearchResults({ searchResults, onAdd }) {
  return (
    <>
      <div>
        <h2>Search Results</h2>
        <TrackList tracks={searchResults} onAdd={onAdd} />
      </div>
    </>
  );
}

export default SearchResults;
