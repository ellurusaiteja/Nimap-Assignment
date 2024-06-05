import React, { Component } from "react";
import Header from "../Header/index.js";
import MovieDetails from "../MovieDetails/index.js";
import "./index.css";

class TopRatedMovies extends Component {
  state = {
    topRated: [],
    currentPage: 1,
    itemsPerPage: 12,
  };

  componentDidMount() {
    this.getTopRatedMovies();
  }

  getTopRatedMovies = async () => {
    const topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=b069e111d85aacad7f4343d91ee8d3a4&language=en-US&page=1`;
    const options = { method: "GET" };
    const response = await fetch(topRatedUrl, options);
    const jsonData = await response.json();
    const updatedData = jsonData.results.map((eachToprated) => ({
      adult: eachToprated.adult,
      backdropPath: eachToprated.backdrop_path,
      genreIds: eachToprated.genre_ids,
      id: eachToprated.id,
      originalLanguage: eachToprated.original_language,
      originalTitle: eachToprated.original_title,
      overview: eachToprated.overview,
      popularity: eachToprated.popularity,
      posterPath: eachToprated.poster_path,
      releaseDate: eachToprated.release_date,
      title: eachToprated.title,
      video: eachToprated.video,
      voteAverage: eachToprated.vote_average,
      voteCount: eachToprated.vote_count,
    }));
    this.setState({ topRated: updatedData });
  };

  getCurrentItems = () => {
    const { topRated, currentPage, itemsPerPage } = this.state;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = topRated.slice(indexOfFirstItem, indexOfLastItem);

    return currentItems;
  };

  render() {
    const { topRated, currentPage, itemsPerPage } = this.state;
    const currentItems = this.getCurrentItems();
    const totalPages = Math.ceil(topRated.length / itemsPerPage) || 1;

    const paginate = (pageNumber) => {
      this.setState({ currentPage: pageNumber });
    };

    return (
      <div className="top-rated-movies-container">
        <Header />
        <div className="home-list-container">
          <ul className="unordered-list-home">
            {currentItems.map((eachTopRatedMovie) => (
              <MovieDetails
                movieDetails={eachTopRatedMovie}
                key={eachTopRatedMovie.id}
              />
            ))}
          </ul>
        </div>
        <nav>
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <li
                key={i + 1}
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
              >
                <a
                  href="#"
                  className="page-link"
                  onClick={() => paginate(i + 1)}
                >
                  {i + 1}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  }
}

export default TopRatedMovies;
