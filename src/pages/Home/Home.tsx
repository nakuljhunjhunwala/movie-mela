import "./index.css";

import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import Banner from "../../components/Banner/Banner";
import LogoutIcon from "../../assets/Logout.svg";
import MovieList from "../../components/MovieList/MovieList";
import { RootState } from "../../store/store";
import SearchBar from "../../components/SearchBar/SearchBar";
import WatchList from "../../components/WatchList/WatchList";
import { logout } from "../../store/loginSlicer";
import { resetMovies } from "../../store/movieSlicer";
import { selectList } from "../../store/watchListSlicer";

function Home() {

  const { selectedList, watchList } = useSelector((state: RootState) => state.watchList);
  const [bannerText, setBannerText] = React.useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedList) {
      setBannerText(`You are currently viewing ${selectedList} list`);
    } else {
      setBannerText("This is a simple app to keep track of the movies you want to watch, and the movies you have watched. You can add movies to your watchlist, and mark them as watched. You can also remove movies from your watchlist. Enjoy!");
    }
  }, [selectedList]);

  const moviesToDisplay = useMemo(() => {
    if (selectedList) {
      return watchList[selectedList].map((movie) => {
        return {
          imdbID: movie.id,
          Title: movie.title,
          Year: movie.year,
          Poster: movie.image,
        }
      });
    } else {
      return undefined;
    }
  }, [selectedList, watchList])

  return (
    <div className="mm-home-container">
      <div className="mm-home--sidebar">
        <div className="mm-home--sidebar-title">
          <h1>Movie Mela</h1>
          <img src={LogoutIcon} alt="logout" className="mm-logout-icon"
            onClick={() => {
              dispatch(selectList(null));
              dispatch(logout());
              dispatch(resetMovies());
            }}
          />
        </div>
        <br />
        <SearchBar
          hideSubmit={true}
        />
        <br />
        <span className="mm-separator"></span>
        <div className="mm-home-container-home"
          onClick={() => {
            dispatch(selectList(null));
            dispatch(resetMovies());
          }}
        >
          Home
        </div>
        <span className="mm-separator"></span>
        <WatchList />
        <br />
      </div>
      <div className="mm-home--content">
        <Banner
          title="Welcome to Movie Mela"
          description={bannerText}
        />
        <br />
        {
          !selectedList && <SearchBar />
        }
        <br />
        <MovieList
          movies={moviesToDisplay}
        />
      </div>
    </div>
  );
}

export default Home;
