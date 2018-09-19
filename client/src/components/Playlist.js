import React from "react";
import "../styles/Playlist.css";
import { Image } from "react-bootstrap";
import Helpers from "../helpers";

const Playlist = props => (
  <div className="playlist__container">
    <div id="video__container" />
    {props.highlights.map((highlight, i) => {
      return (
        <div
          className="single-highlight"
          key={i}
          onClick={() => Helpers.showVideo(highlight.title, highlight.video)}
        >
          <Image
            className="thumbnail"
            src={highlight.thumbnail}
            alt="Thumbnail not found"
            responsive
          />
          <p className="title"> HIGHLIGHT #{i + 1} </p>
        </div>
      );
    })}
  </div>
);

export default Playlist;
