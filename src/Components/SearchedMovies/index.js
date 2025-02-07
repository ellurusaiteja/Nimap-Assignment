import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "../SearchContext";
import MovieDetails from "../MovieDetails";
import Header from "../Header";

const SearchedMovies = () => {
  const { searchTerm } = useContext(SearchContext);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const fetchSearchResults = async () => {
      try {
        const apiKey = "b069e111d85aacad7f4343d91ee8d3a4";
        const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchTerm}&page=1`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);

        if (data.results) {
          const updatedResults = data.results.map((movie) => ({
            adult: movie.adult,
            backdropPath: movie.backdrop_path,
            genreIds: movie.genre_ids,
            id: movie.id,
            originalLanguage: movie.original_language,
            originalTitle: movie.original_title,
            overview: movie.overview,
            popularity: movie.popularity,
            posterPath: movie.poster_path,
            releaseDate: movie.release_date,
            title: movie.title,
            video: movie.video,
            voteAverage: movie.vote_average,
            voteCount: movie.vote_count,
          }));
          setSearchResults(updatedResults);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        setError("Failed to fetch search results.");
      } finally {
        setIsLoading(false);
      }
    };

    if (searchTerm) {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const getCurrentItems = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

    return currentItems;
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const currentItems = getCurrentItems();
  const totalPages = Math.ceil(searchResults.length / itemsPerPage) || 1;

  return (
    <div className="home-container">
      <Header />
      <div className="home-list-container">
        <ul className="unordered-list-home">
          {currentItems.map((eachMovie) => (
            <MovieDetails movieDetails={eachMovie} key={eachMovie.id} />
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
              <a href="#" className="page-link" onClick={() => paginate(i + 1)}>
                {i + 1}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SearchedMovies;
