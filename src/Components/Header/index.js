import { Link } from "react-router-dom";
import { useState } from "react";

import "./index.css";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handelInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearch = async () => {
    if (searchTerm.trim() !== "") {
      const API_KEY = "b069e111d85aacad7f4343d91ee8d3a4";
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=1`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        const searchResults = data.results;
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <nav className="header-container">
      <div>
        <Link to="/" className="header-link">
          <p className="header-heading">MovieDb</p>
        </Link>
      </div>
      <div className="header-content">
        <Link className="header-link mob-view" to="/popular">
          <p>Popular</p>
        </Link>
        <Link to="/top-rated-movies" className="header-link mob-view">
          <p>Top Rated</p>
        </Link>
        <Link to="/upcoming-movies" className="header-link mob-view">
          <p>Upcoming</p>
        </Link>
        <input
          className="header-input"
          placeholder="Movie Name"
          type="search"
          onChange={handelInputChange}
          value={searchTerm}
        />

        <button className="header-search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
    </nav>
  );
};

export default (Header);
