import { Link } from "react-router-dom";

import "./index.css";

const MovieDetails = (props) => {
  const { movieDetails } = props;
  const { title, voteAverage, id, posterPath } = movieDetails;

  return (
    <li>
      <Link to={`/movies/${id}`} className="movies-link">
        <img
          src={`https://image.tmdb.org/t/p/w500${posterPath}`}
          alt={title}
          className="movie-image"
        />
        <h6 className="movie-heading">{title}</h6>
        <p className="rating">Rating: {voteAverage}</p>
      </Link>
    </li>
  );
};

export default MovieDetails;
