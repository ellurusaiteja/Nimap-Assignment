import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SearchProvider } from "./Components/SearchContext/index.js";

import Home from "./Components/Home/index.js";
import MovieInDetails from "./Components/Movie/index.js";
import PopularMovies from "./Components/PopularMovies/index.js";
import TopRatedMovies from "./Components/TopRatedMovies/index.js";
import UpcomingMovies from "./Components/UpcomingMovies/index.js";
import SearchedMovies from "./Components/SearchedMovies/index.js";

import "./index.css";

const App = () => {
  return (
    <Router>
      <SearchProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/:id" element={<MovieInDetails />} />
          <Route path="/popular" element={<PopularMovies />} />
          <Route path="/top-rated-movies" element={<TopRatedMovies />} />
          <Route path="/upcoming-movies" element={<UpcomingMovies />} />
          <Route path="/search" element={<SearchedMovies />} />
        </Routes>
      </SearchProvider>
    </Router>
  );
};

export default App;
