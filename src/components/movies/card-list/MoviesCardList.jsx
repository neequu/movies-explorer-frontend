import MoviesCard from 'components/movies/card/MoviesCard.jsx';

const movies = [
  { name: '', image: '/src/assets/movie.png' },
  { name: '', image: '/src/assets/movie2.png' },
  { name: '', image: '/src/assets/movie3.png' },
  { name: '', image: '/src/assets/movie4.png' },
  { name: '', image: '/src/assets/movie5.png' },
  { name: '', image: '/src/assets/movie6.png' },
  { name: '', image: '/src/assets/movie7.png' },
  { name: '', image: '/src/assets/movie8.png' },
  { name: '', image: '/src/assets/movie9.png' },
  { name: '', image: '/src/assets/movie10.png' },
  { name: '', image: '/src/assets/movie11.png' },
  { name: '', image: '/src/assets/movie12.png' },
];

function MoviesCardList({ children, limit = null }) {
  const moviesToShow = movies.slice(0, limit ?? movies.length);

  return (
    <section className='movies-card-list'>
      <div className='movies-card-list__grid'>
        {moviesToShow.map((x) => (
          <MoviesCard key={x.image} img={x.image} name={x.name} />
        ))}
      </div>
      <div className='movies-card-list__footer'>{children}</div>
    </section>
  );
}

export default MoviesCardList;
