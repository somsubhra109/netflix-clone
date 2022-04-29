import React, { useState, useEffect } from "react";
import "./Row.css";
import axios from "../../axios";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const imageUrl = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(fetchUrl)
        .then((res) => {
          setMovies(res.data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, [fetchUrl]);
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="rowPosters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`rowPoster ${isLargeRow && "rowPosterLarge"}`}
            src={`${imageUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;
