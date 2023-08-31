import MoviesCard from 'components/movies/card/MoviesCard.jsx';

const movies = [
  { name: '1', image: 'assets/movie.png' },
  { name: '2', image: 'assets/movie2.png' },
  { name: '3', image: 'assets/movie3.png' },
  { name: '4', image: 'assets/movie4.png' },
  { name: '5', image: 'assets/movie5.png' },
  { name: '6', image: 'assets/movie6.png' },
  { name: '7', image: 'assets/movie7.png' },
  { name: '8', image: 'assets/movie8.png' },
  { name: '9', image: 'assets/movie9.png' },
  { name: '10', image: 'assets/movie10.png' },
  { name: '11', image: 'assets/movie11.png' },
  { name: '12', image: 'assets/movie12.png' },
];

function MoviesCardList({ children, limit = null }) {
  const moviesToShow = movies.slice(0, limit ?? movies.length);

  return (
    <section className='movies-card-list'>
      <div className='movies-card-list__grid'>
        {movies[0].image}
        {moviesToShow.map((x) => (
          <MoviesCard key={x.image} img={x.image} name={x.name} />
        ))}
      </div>
      <div className='movies-card-list__footer'>{children}</div>
    </section>
  );
}

export default MoviesCardList;
