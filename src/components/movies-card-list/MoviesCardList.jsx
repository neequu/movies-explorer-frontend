import MoviesCard from 'components/movies-card/MoviesCard.jsx';
import { movies } from 'utils/constants';

function MoviesCardList({ children, limit = null }) {
  const moviesToShow = movies.slice(0, limit ?? movies.length);

  return (
    <>
      <section className='movies-card-list'>
        <div className='movies-card-list__grid'>
          {moviesToShow.map((x) => (
            <MoviesCard key={x.image} img={x.image} name={x.name} />
          ))}
        </div>
        <div className='movies-card-list__footer'>{children}</div>
      </section>
    </>
  );
}

export default MoviesCardList;
