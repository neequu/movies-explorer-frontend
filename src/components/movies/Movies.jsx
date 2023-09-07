import MoviesCard from 'components/movies-card/MoviesCard.jsx';
import { useEffect } from 'react';
import { getMovieFields } from 'utils/utils.js';
import { fetchMovies } from 'utils/moviesApi.js';

function Movies({
  saveMovie,
  unsaveMovie,
  setMovies,

  moviesData,
  savedMovies,
  setErrorFetching,
}) {
  useEffect(() => {
    async function reqMovies() {
      setErrorFetching(false);
      const searchedMovies = localStorage.getItem('searched-movies');
      if (searchedMovies) {
        setMovies(JSON.parse(searchedMovies));
        return;
      }
      console.log('fetch');
      try {
        const res = await fetchMovies();
        localStorage.setItem('searched-movies', JSON.stringify(res));
        setMovies(res);
        console.log(res);
      } catch (e) {
        console.log(e);
        setErrorFetching(true);
      }
    }
    reqMovies();
  }, []);

  return (
    <>
      {moviesData?.map((m) => (
        <MoviesCard
          key={m.id + m.nameEN}
          movieData={getMovieFields(m)}
          saveMovie={saveMovie}
          unsaveMovie={unsaveMovie}
          savedMovies={savedMovies}
        />
      ))}
    </>
  );
}

export default Movies;
