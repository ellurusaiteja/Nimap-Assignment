import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/index.js";
import MovieInDetails from "./Components/Movie/index.js";
import PopularMovies from "./Components/PopularMovies/index.js";
import TopRatedMovies from "./Components/TopRatedMovies/index.js";
import UpcomingMovies from "./Components/UpcomingMovies/index.js";

import "./index.css";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/movies/:id" element={<MovieInDetails />} />
      <Route exact path="/popular" element={<PopularMovies />} />
      <Route exact path="/top-rated-movies" element={<TopRatedMovies />} />
      <Route exact path="upcoming-movies" element={<UpcomingMovies />} />
    </Routes>
  </BrowserRouter>
);

export default App;
