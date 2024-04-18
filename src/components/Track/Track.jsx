import React from "react";
import styles from "./Track.module.css";

function Track({ track, onRemove, onAdd }) {
  return (
    <>
      <div>
        <h3>{track.name}</h3>
        <p>
          {track.artist} - {track.album}
          {onAdd && <button onClick={() => onAdd(track)}>Add</button>}
          {onRemove && <button onClick={() => onRemove(track)}>Remove</button>}
        </p>
      </div>
    </>
  );
}

export default Track;
