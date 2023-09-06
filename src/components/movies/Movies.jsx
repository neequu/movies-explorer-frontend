import MoviesCard from 'components/movies-card/MoviesCard.jsx';
import Preloader from 'components/preloader/Preloader';
import { useEffect, useState } from 'react';
import { getMovieFields } from 'utils/constants';
import { fetchMovies } from 'utils/moviesApi';

function Movies({
  moviesData,
  saveMovie,
  unsaveMovie,
  setMovies,
  children,
  savedMovies,
  noResults,
}) {
  const [error, setError] = useState(false);

  useEffect(() => {
    async function reqMovies() {
      setError(false);
      const searchedMovies = localStorage.getItem('searched-movies');
      if (searchedMovies) {
        setMovies(JSON.parse(searchedMovies));
        return;
      }
      try {
        const res = await fetchMovies();
        localStorage.setItem('searched-movies', JSON.stringify(res));
        setMovies(res);
      } catch (e) {
        console.log(e);
        setError(true);
      }
    }
    reqMovies();
  }, []);

  return (
    <>
      {moviesData ? (
        <>
          <ul className='movies-card-list__grid'>
            {!noResults &&
              moviesData?.map((m) => (
                <MoviesCard
                  key={m.id + m.nameEN}
                  movieData={getMovieFields(m)}
                  saveMovie={saveMovie}
                  unsaveMovie={unsaveMovie}
                  savedMovies={savedMovies}
                />
              ))}
          </ul>
          <div className='movies-card-list__footer'>
            {error && (
              <span className='movies-card-list__message'>
                Во время запроса произошла ошибка. Возможно, проблема с
                соединением или сервер недоступен. Подождите немного и
                попробуйте ещё раз
              </span>
            )}
            {noResults && (
              <span className='movies-card-list__message'>
                По Вашему запросу ничего не найдено.
              </span>
            )}
            {children}
          </div>
        </>
      ) : (
        <Preloader />
      )}
    </>
  );
}

export default Movies;
