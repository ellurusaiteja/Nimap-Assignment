import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchContext } from '../SearchContext';
import './index.css';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { updateSearchTerm } = useContext(SearchContext);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      updateSearchTerm(searchTerm);
      navigate('/search');
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
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button className="header-search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
    </nav>
  );
};

export default Header;