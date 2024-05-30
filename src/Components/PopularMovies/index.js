import { Component } from "react";

import Header from "../Header/index.js";

import "./index.css";

class PopularMovies extends Component {
  render() {
    return (
      <div className="popular-movies-conntainer">
        <Header />
        <div className="popular-route-container">
          <h1>Popular Movies Route</h1>
        </div>
      </div>
    );
  }
}

export default PopularMovies;
