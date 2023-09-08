import Preloader from 'components/preloader/Preloader';
import ShowMore from 'components/show-more/ShowMore';
import { cloneElement, useEffect, useState } from 'react';
import filterMovies from 'utils/movies';

function MoviesCardList({
  moviesData,
  errorFetching,
  params,
  loading,
  children,
}) {
  console.log(params);
  const { filteredMovies } = filterMovies(
    moviesData,
    params.filtered,
    params.query
  );
  const [noResults, setNoResults] = useState(false);
  const [visibleLimit, setVisibleLimit] = useState(12);
  const [limitAddStep, setLimitAddStep] = useState(3);
  const [visibleMovies, setVisibleMovies] = useState(
    filteredMovies?.slice(0, visibleLimit)
  );

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    async function handleResize() {
      setWindowWidth(window.innerWidth);

      if (windowWidth < 768) {
        setLimitAddStep(1);
        setVisibleLimit(4);
      } else if (windowWidth >= 768 && windowWidth < 1280) {
        setLimitAddStep(2);
        setVisibleLimit(8);
      } else {
        setLimitAddStep(3);
        setVisibleLimit(12);
      }

      await new Promise((r) => setTimeout(r, 1000));
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowWidth]);

  useEffect(() => {
    if (!filteredMovies) return;
    setVisibleMovies(filteredMovies.slice(0, 12));
    setNoResults(filteredMovies.length === 0);
  }, [moviesData, params]);

  const totalMovies = filteredMovies?.length;
  const noMoreItems = totalMovies === visibleMovies?.length;

  function showMore() {
    if (!filteredMovies) return;
    setVisibleMovies((prevMovies) => {
      const start = prevMovies.length;
      const end =
        start + limitAddStep > totalMovies ? totalMovies : start + limitAddStep;
      return [...prevMovies, ...filteredMovies.slice(start, end)];
    });
  }
  return (
    <>
      <section className='movies-card-list'>
        {!loading ? (
          <>
            {!noResults && (
              <ul className='movies-card-list__grid'>
                {cloneElement(children, {
                  moviesData: visibleMovies,
                })}
              </ul>
            )}
            <div className='movies-card-list__footer'>
              {errorFetching && (
                <span className='movies-card-list__message'>
                  Во время запроса произошла ошибка. Возможно, проблема с
                  соединением или сервер недоступен. Подождите немного и
                  попробуйте ещё раз
                </span>
              )}
              {params?.query && noResults && (
                <span className='movies-card-list__message'>
                  По Вашему запросу ничего не найдено.
                </span>
              )}
              {!noMoreItems && !noResults && !errorFetching && moviesData && (
                <ShowMore showMore={showMore} />
              )}
            </div>
          </>
        ) : (
          <Preloader />
        )}
      </section>
    </>
  );
}

export default MoviesCardList;
