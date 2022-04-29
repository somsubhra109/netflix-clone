import React, { useEffect, useState } from "react";
import axios from "../../axios";
import requests from "../../request";
import request from "../../request";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(requests.fetchNetflixOriginals)
        .then((res) => {
          const random = Math.floor(
            Math.random() * res.data.results.length - 1
          );
          setMovie(res.data.results[random]);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);
  console.log(movie);

  const truncate = (str, n) =>
    str?.length > n ? str.substring(0, n - 1) + "..." : str;

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
        "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
      )`,
        backgroundPosition: "center center",
      }}
    >
      <div className="bannerContents">
        <h1 className="bannerTitle">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="bannerButtons">
          <button type="button" className="bannerButton">
            Play
          </button>
          <button type="button" className="bannerButton">
            My List
          </button>
        </div>
        <h1 className="bannerDescription">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="bannerFadeBottom"></div>
    </header>
  );
}

export default Banner;
