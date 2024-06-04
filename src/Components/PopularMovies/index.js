import { Component } from "react";

import Header from "../Header/index.js";
import MovieDetails from "../MovieDetails/index.js";

import "./index.css";

class PopularMovies extends Component {
  state = { popularMoviesList: [] };
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
  render() {
    const { popularMoviesList } = this.state;
    return (
      <div className="popular-movies-conntainer">
        <Header />
        <div className="home-list-container">
          <ul className="unordered-list-home">
            {popularMoviesList.map((eachPopularMovie) => (
              <MovieDetails
                movieDetails={eachPopularMovie}
                key={eachPopularMovie.id}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default PopularMovies;
