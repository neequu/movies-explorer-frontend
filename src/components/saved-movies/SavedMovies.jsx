import MoviesCard from 'components/movies-card/MoviesCard.jsx';
import { useEffect } from 'react';
import { getToken } from 'utils/constants';
import { getSavedMovies } from 'utils/mainApi';

function SavedMovies({ savedMovies, unsaveMovie, setSavedMovies }) {
  useEffect(() => {
    async function reqMovies() {
      const jwt = getToken();
      const res = await getSavedMovies(jwt);
      setSavedMovies(res);
    }
    reqMovies();
  }, []);

  return (
    <>
      <ul className='movies-card-list__grid'>
        {savedMovies?.map((m) => (
          <MoviesCard
            key={m.movieId + m.nameEN}
            movieData={m}
            unsaveMovie={unsaveMovie}
            savedMovies={savedMovies}
          />
        ))}
      </ul>
    </>
  );
}

export default SavedMovies;
