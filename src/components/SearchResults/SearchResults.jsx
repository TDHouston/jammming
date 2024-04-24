import React from "react";
import "./SearchResults.css";
import TrackList from "../TrackList/Tracklist";

function SearchResults({ searchResults, onAdd }) {
  return (
    <>
      <div className="SearchResults">
        <h2>Search Results</h2>
        <TrackList tracks={searchResults} onAdd={onAdd} />
      </div>
    </>
  );
}

export default SearchResults;
