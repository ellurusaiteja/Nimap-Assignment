import { Component } from "react";

import Header from "../Header/index.js";
import MovieDetails from "../MovieDetails/index.js";

import "./index.css";

class UpcomingMovies extends Component {
  state = { upcomingData: [] };
  componentDidMount() {
    this.getUpcomningMovies();
  }

  getUpcomningMovies = async () => {
    const upComingMoviesUrl = ` https://api.themoviedb.org/3/movie/upcoming?api_key=b069e111d85aacad7f4343d91ee8d3a4&language=en-US&page=1`;
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

  render() {
    const { upcomingData } = this.state;
    return (
      <div className="upcoming-movies-container">
        <Header />
        <div className="home-list-container">
          <ul className="unordered-list-home">
            {upcomingData.map((eachUpcomingMovie) => (
              <MovieDetails
                movieDetails={eachUpcomingMovie}
                key={eachUpcomingMovie.id}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default UpcomingMovies;
