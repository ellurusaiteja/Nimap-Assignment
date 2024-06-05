import React, { Component } from "react";
import Header from "../Header/index.js";
import MovieDetails from "../MovieDetails/index.js";
import "./index.css";

class PopularMovies extends Component {
  state = {
    popularMoviesList: [],
    currentPage: 1,
    itemsPerPage: 12,
  };

  componentDidMount() {
    this.getPopularMovies();
  }

  getPopularMovies = async () => {
    const apiUrl =
      "https://api.themoviedb.org/3/movie/popular?api_key=b069e111d85aacad7f4343d91ee8d3a4&language=en-US&page=1";
    const options = { method: "GET" };
    const response = await fetch(apiUrl, options);
    const jsonData = await response.json();
    const updatedData = jsonData.results.map((eachPopular) => ({
      adult: eachPopular.adult,
      backdropPath: eachPopular.backdrop_path,
      genreIds: eachPopular.genre_ids,
      id: eachPopular.id,
      originalLanguage: eachPopular.original_language,
      originalTitle: eachPopular.original_title,
      overview: eachPopular.overview,
      popularity: eachPopular.popularity,
      posterPath: eachPopular.poster_path,
      releaseDate: eachPopular.release_date,
      title: eachPopular.title,
      video: eachPopular.video,
      voteAverage: eachPopular.vote_average,
      voteCount: eachPopular.vote_count,
    }));
    this.setState({ popularMoviesList: updatedData });
  };

  getCurrentItems = () => {
    const { popularMoviesList, currentPage, itemsPerPage } = this.state;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = popularMoviesList.slice(
      indexOfFirstItem,
      indexOfLastItem
    );

    return currentItems;
  };

  render() {
    const { popularMoviesList, currentPage, itemsPerPage } = this.state;
    const currentItems = this.getCurrentItems();
    const totalPages = Math.ceil(popularMoviesList.length / itemsPerPage) || 1;

    const paginate = (pageNumber) => {
      this.setState({ currentPage: pageNumber });
    };

    return (
      <div className="popular-movies-conntainer">
        <Header />
        <div className="home-list-container">
          <ul className="unordered-list-home">
            {currentItems.map((eachPopularMovie) => (
              <MovieDetails
                movieDetails={eachPopularMovie}
                key={eachPopularMovie.id}
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

export default PopularMovies;
