import { Component } from "react";

import Header from "../Header/index.js";
import MovieDetails from "../MovieDetails/index.js";

import "./index.css";

class TopRatedMovies extends Component {
  state = { topRated: [] };

  componentDidMount() {
    this.getTopRatedMovies();
  }

  getTopRatedMovies = async () => {
    const topRatedUrl = ` https://api.themoviedb.org/3/movie/top_rated?api_key=b069e111d85aacad7f4343d91ee8d3a4&language=en-US&page=1`;
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

  render() {
    const { topRated } = this.state;
    return (
      <div className="top-rated-movies-container">
        <Header />
        <div className="home-list-container">
          <ul className="unordered-list-home">
            {topRated.map((eachTopRatedMovie) => (
              <MovieDetails
                movieDetails={eachTopRatedMovie}
                key={eachTopRatedMovie.id}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default TopRatedMovies;
