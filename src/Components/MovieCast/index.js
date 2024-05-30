import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./index.css";

const MovieCast = () => {
  const { id } = useParams();
  const [castDetails, setCastDetails] = useState([]);

  useEffect(() => {
    const getCastDetails = async () => {
      const castUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=b069e111d85aacad7f4343d91ee8d3a4&language=en-US`;
      const options = { method: "GET" };
      const response = await fetch(castUrl, options);
      const data = await response.json();
      const updatedCastData = data.cast.map((eachCast) => ({
        adult: eachCast.adult,
        castId: eachCast.cast_id,
        character: eachCast.character,
        creditId: eachCast.credit_id,
        gender: eachCast.gender,
        id: eachCast.id,
        knowForDepartment: eachCast.know_for_department,
        name: eachCast.name,
        order: eachCast.order,
        originalName: eachCast.original_name,
        popularity: eachCast.popularity,
        profilePath: eachCast.profile_path,
      }));
      setCastDetails(updatedCastData);
    };

    getCastDetails();
  }, [id]);

  return (
    <div className="casts-container">
      {/* <h1>Movie Cast</h1> */}
      <ul className="unordered-cast-list">
        {castDetails.map((eachCasts) => (
          <li className="cast-list" key={eachCasts.id}>
            <img
              className="cast-image"
              src={`https://image.tmdb.org/t/p/w500${eachCasts.profilePath}`}
              alt={eachCasts.name}
            />
            <p className="name-character">{eachCasts.name}</p>
            <p className="name-character">Character: {eachCasts.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
