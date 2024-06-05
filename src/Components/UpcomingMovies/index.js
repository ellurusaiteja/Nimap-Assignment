import React, { Component } from "react";
import Header from "../Header/index.js";
import MovieDetails from "../MovieDetails/index.js";
import "./index.css";

class UpcomingMovies extends Component {
  state = {
    upcomingData: [],
    currentPage: 1,
    itemsPerPage: 12,
  };

  componentDidMount() {
    this.getUpcomningMovies();
  }

  getUpcomningMovies = async () => {
    const upComingMoviesUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=b069e111d85aacad7f4343d91ee8d3a4&language=en-US&page=1`;
    const options = { method: "GET" };
    const response = await fetch(upComingMoviesUrl, options);
    const jsonData = await response.json();
    const updatedData = jsonData.results.map((eachUpcomingData) => ({
      adult: eachUpcomingData.adult,
      backdropPath: eachUpcomingData.backdrop_path,
      genreIds: eachUpcomingData.genre_ids,
      id: eachUpcomingData.id,
      originalLanguage: eachUpcomingData.original_language,
      originalTitle: eachUpcomingData.original_title,
      overview: eachUpcomingData.overview,
      popularity: eachUpcomingData.popularity,
      posterPath: eachUpcomingData.poster_path,
      releaseDate: eachUpcomingData.release_date,
      title: eachUpcomingData.title,
      video: eachUpcomingData.video,
      voteAverage: eachUpcomingData.vote_average,
      voteCount: eachUpcomingData.vote_count,
    }));
    this.setState({ upcomingData: updatedData });
  };

  getCurrentItems = () => {
    const { upcomingData, currentPage, itemsPerPage } = this.state;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = upcomingData.slice(indexOfFirstItem, indexOfLastItem);

    return currentItems;
  };

  render() {
    const { upcomingData, currentPage, itemsPerPage } = this.state;
    const currentItems = this.getCurrentItems();
    const totalPages = Math.ceil(upcomingData.length / itemsPerPage) || 1;

    const paginate = (pageNumber) => {
      this.setState({ currentPage: pageNumber });
    };

    return (
      <div className="upcoming-movies-container">
        <Header />
        <div className="home-list-container">
          <ul className="unordered-list-home">
            {currentItems.map((eachUpcomingMovie) => (
              <MovieDetails
                movieDetails={eachUpcomingMovie}
                key={eachUpcomingMovie.id}
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

export default UpcomingMovies;
