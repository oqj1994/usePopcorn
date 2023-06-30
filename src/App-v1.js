import { Children, useEffect, useState } from "react";
import StartRating from "./startRating";

// const api = "http://www.omdbapi.com/?i=tt3896198&apikey=7b7e08bb";

const key = `7b7e08bb`;

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function Narbar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
function Input({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);

        // fetch(`http://www.omdbapi.com/?apikey=${key}&s=${query}`)
        //   .then((res) => res.json())
        //   .then(({ Search }) => setMovies(Search))
        //   .catch((err) => {
        //     console.log(err);
        //   });
      }}
    />
  );
}

function SearchResult({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies?.length}</strong> results
    </p>
  );
}

function Movie({ movie, onSeleted }) {
  return (
    <li key={movie.imdbID} onClick={() => onSeleted(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function Movies({ movies, onSeleted }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} onSeleted={onSeleted} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function Summany({ watched }) {
  const avgImdbRating = Math.ceil(
    average(watched.map((movie) => movie.imdbRating))
  );
  const avgUserRating = Math.ceil(
    average(watched.map((movie) => movie.userRating))
  );
  const avgRuntime = Math.ceil(average(watched.map((movie) => movie.runtime)));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedFilm({ movie, onDeleteMovie }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onDeleteMovie(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}
function WatchedList({ watched, onDeleteMovie }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedFilm
          movie={movie}
          key={movie.imdbID}
          onDeleteMovie={onDeleteMovie}
        />
      ))}
    </ul>
  );
}

function ErrorMsg({ msg }) {
  return <div className="error">{msg}</div>;
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Loader() {
  return <p className="loader">Loading .....</p>;
}

function MovieDetails({ id, onBackClick, onAddMovie, updated, onUpdateMovie }) {
  const [movie, setMovie] = useState({});
  const [userRating, setUserRating] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const {
    Title: title,
    Year: year,
    Rated: rated,
    Released: released,
    Runtime: runtime,
    Poster: poster,
    Actors: actors,
    Director: director,
    Genre: genre,
    imdbID,
    imdbRating,
    Plot: plot,
  } = movie;
  function onAdd() {
    const movie = {
      imdbID,
      Title: title,
      Year: year,
      Poster: poster,
      runtime: Number.parseInt(runtime),
      imdbRating: Number(imdbRating),
      userRating,
    };
    onAddMovie(movie);
    onBackClick();
  }

  useEffect(
    function () {
      function keyDownHandler(e) {
        if (e.code === "Escape") {
          onBackClick();
          console.log("CLOSING");
        }
      }
      document.addEventListener("keydown", keyDownHandler);
      return function () {
        document.removeEventListener("keydown", keyDownHandler);
      };
    },
    [onBackClick]
  );

  function onUpdate() {
    onUpdateMovie(imdbID, userRating);
    onBackClick();
  }
  useEffect(
    function () {
      const controller = new AbortController();
      async function FetchMovie() {
        try {
          setLoading(true);
          const response = await fetch(
            `http://www.omdbapi.com/?apikey=${key}&i=${id}`,
            { signal: controller.signal }
          );
          const data = await response.json();
          console.log(data);
          setMovie(data);
          setLoading(false);
        } catch (err) {
          console.log(err);
        }
      }
      FetchMovie();
      return function () {
        controller.abort();
      };
    },
    [id]
  );
  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "usePopcorn";
        console.log("clean up effect", title);
      };
    },
    [title]
  );
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header className="">
            <button className="btn-back" onClick={onBackClick}>
              &larr;
            </button>
            <img src={poster} alt={title} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull;{runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>*</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              <StartRating
                onSet={setUserRating}
                size={24}
                maxRating={10}
                defaultRating={0}
              />
              {userRating > 0 &&
                (updated ? (
                  <button className="btn-add" onClick={onUpdate}>
                    Update to List
                  </button>
                ) : (
                  <button className="btn-add" onClick={onAdd}>
                    Add to List
                  </button>
                ))}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(tempWatchedData);
  const [query, setQuery] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [seletedID, setSeletedID] = useState(null);
  const updated = watched.find((f) => f.imdbID === seletedID) ? true : false;

  function onDeleteMovie(id) {
    setWatched((ms) => ms.filter((m) => m.imdbID !== id));
    console.log(watched);
  }
  function handleAddWatchedMovie(movie) {
    setWatched((movies) => [...movies, movie]);
  }

  function handleUpdateWatchedMovie(imdbID, userRating) {
    setWatched((movies) =>
      movies.map((m) => (m.imdbID === imdbID ? { ...m, userRating } : m))
    );
  }

  function handleSeleted(id) {
    setSeletedID((c) => (id === c ? null : id));
  }
  function onBackClick() {
    setSeletedID(null);
  }

  useEffect(
    function () {
      const controller = new AbortController();
      async function FectchMovies() {
        try {
          setLoading(true);
          const response = await fetch(
            `http://www.omdbapi.com/?apikey=${key}&s=${query}`,
            { signal: controller.signal }
          );
          if (!response.ok)
            throw new Error("Something went wrong with Fetching movies");
          const { Search } = await response.json();
          setMovies(Search);
          setLoading(false);
        } catch (err) {
          if (err.name !== "AbortError") setErrMsg(err.message);
        } finally {
          setLoading(false);
        }
      }
      FectchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <>
      <Narbar>
        <Logo />
        <Input query={query} setQuery={setQuery} />
        <SearchResult movies={movies} />
      </Narbar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {errMsg && <ErrorMsg msg={errMsg} />}
          {!isLoading && !errMsg && movies && (
            <Movies movies={movies} onSeleted={handleSeleted} />
          )}
        </Box>
        <Box>
          {seletedID ? (
            <MovieDetails
              id={seletedID}
              onBackClick={onBackClick}
              onAddMovie={handleAddWatchedMovie}
              onUpdateMovie={handleUpdateWatchedMovie}
              updated={updated}
            />
          ) : (
            <>
              <Summany watched={watched} />
              <WatchedList watched={watched} onDeleteMovie={onDeleteMovie} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
