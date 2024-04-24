import React from "react";
import "./TrackList.css";

import Track from "../Track/Track";

function TrackList({ tracks, onRemove, onAdd }) {
  return (
    <div className="TrackList">
      {tracks.map((track) => (
        <Track key={track.id} track={track} onRemove={onRemove} onAdd={onAdd} />
      ))}
    </div>
  );
}

export default TrackList;
