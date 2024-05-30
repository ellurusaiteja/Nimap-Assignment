import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "../Header";
import MovieCast from "../MovieCast/index.js";

import "./index.css";

const MovieInDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=b069e111d85aacad7f4343d91ee8d3a4&language=en-US`
        );
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, [id]);

  return (
    <div className="movies-container">
      <Header />
      {data ? (
        <div>
          <div className="movie-top-container">
            <img
              src={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`}
              alt={data.title}
              className="movie-backdrop-img"
            />

            <div className="movie-in-detail">
              <div className="movie">
                <img
                  src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                  alt={data.id}
                  className="poster-path-image"
                />
                <div className="movie-details-container">
                  <h1 className="movie-title">{data.title}</h1>
                  <p className="movie-title rating-main">
                    Rating: {data.vote_average}
                  </p>
                  <div className="movie-genre-runtime-container">
                    <div className="movie-runtime-container">
                      <p>{data.runtime} min</p>
                    </div>
                    <div className="genres-continer">
                      {data.genres.map((eachGenre) => (
                        <p className="movie-title" key={eachGenre.id}>{`${eachGenre.name}, `}</p>
                      ))}
                    </div>
                  </div>
                  <p className="movie-title release-date">
                    Release Date: {data.release_date}
                  </p>
                </div>
              </div>
              <div>
                <h2>Overview</h2>
                <p className="overview">{data.overview}</p>
              </div>
            </div>
          </div>
          <div>
            <h1 className="hello">Cast</h1>
            <MovieCast />
          </div>
        </div>
      ) : (
        <div className="loading-page">
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};
export default MovieInDetails;
