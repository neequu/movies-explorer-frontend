import MoviesCard from 'components/movies-card/MoviesCard.jsx';
import { useEffect } from 'react';
import { getMovieFields } from 'utils/utils.js';
import { fetchMovies } from 'utils/moviesApi.js';

function Movies({
  setErrorFetching,
  saveMovie,
  unsaveMovie,
  setMovies,
  savedMovies,
  setLoading,

  moviesData,
}) {
  useEffect(() => {
    setLoading(true);
    async function reqMovies() {
      setErrorFetching(false);
      const searchedMovies = localStorage.getItem('searched-movies');
      if (searchedMovies) {
        setMovies(JSON.parse(searchedMovies));
        setLoading(false);
        return;
      }
      try {
        const res = await fetchMovies();
        localStorage.setItem('searched-movies', JSON.stringify(res));
        setMovies(res);
        console.log(res);
      } catch (e) {
        console.log(e);
        setErrorFetching(true);
      } finally {
        setLoading(false);
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
