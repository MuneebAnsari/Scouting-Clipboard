import React from "react";
import "../styles/SearchForm.css";
import Helpers from "../helpers";

const SearchForm = props => (
  <form
    onSubmit={e => {
      Helpers.hideVideo();
      props.getPlayerData(e);
      props.getHighlights(e);
      Helpers.config();
    }}
  >
    <input
      className="search"
      type="text"
      placeholder="Search for NBA player..."
      name="player"
    />
    <button> Go! </button>
  </form>
);

export default SearchForm;
