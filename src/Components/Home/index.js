import { Component } from "react";
import Header from "../Header";
import MovieDetails from "../MovieDetails";

import "./index.css";

class Home extends Component {
  state = { allMovies: [] };
  componentDidMount() {
    this.getMovieDetails();
  }

  getMovieDetails = async () => {
    const apiUrl =
      "https://api.themoviedb.org/3/movie/popular?api_key=b069e111d85aacad7f4343d91ee8d3a4&language=en-US&page=1";
    const options = { method: "GET" };

    const response = await fetch(apiUrl, options);
    const data = await response.json();
    const updatedData = data.results.map((eachData) => ({
      adult: eachData.adult,
      backdropPath: eachData.backdrop_path,
      genreIds: eachData.genre_ids,
      id: eachData.id,
      originalLanguage: eachData.original_language,
      originalTitle: eachData.original_title,
      overview: eachData.overview,
      popularity: eachData.popularity,
      posterPath: eachData.poster_path,
      releaseDate: eachData.release_date,
      title: eachData.title,
      video: eachData.video,
      voteAverage: eachData.vote_average,
      voteCount: eachData.vote_count,
    }));

    this.setState({ allMovies: updatedData });
  };

  render() {
    const { allMovies } = this.state;
    return (
      <div className="home-container">
        <Header />
        <div className="home-list-container">
          <ul className="unordered-list-home">
            {allMovies.map((eachMovie) => (
              <MovieDetails movieDetails={eachMovie} key={eachMovie.id} />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Home;
