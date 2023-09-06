import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
// context
import { CurrentUserContext } from 'contexts/CurrentUserContext.js';
// components
import TheHeader from 'components/the-header/TheHeader.jsx';
import Main from 'components/main/Main.jsx';
import TheFooter from 'components/the-footer/TheFooter.jsx';
import MobileNav from 'components/mobile-nav/MobileNav.jsx';
import Modal from 'components/modal/Modal.jsx';
import Hero from 'components/hero/Hero.jsx';
import About from 'components/about/About.jsx';
import Tech from 'components/tech/Tech.jsx';
import Student from 'components/student/Student.jsx';
import Portfolio from 'components/portfolio/Portfolio.jsx';
import MoviesCardList from 'components/movies-card-list/MoviesCardList.jsx';
import ShowMore from 'components/show-more/ShowMore.jsx';
import NotFound from 'components/not-found/NotFound.jsx';
import Profile from 'components/profile/Profile.jsx';
import ProtectedRoutes from 'components/protected-routes/ProtectedRoutes.jsx';
import Login from 'components/login/Login.jsx';
import Register from 'components/register/Register.jsx';
import SavedMovies from 'components/saved-movies/SavedMovies';
import Movies from 'components/movies/Movies';
import {
  deleteSavedMovieById,
  getCurrentUserInfo,
  getSavedMovies,
  saveMovie,
} from 'utils/mainApi';
import { getLocalStorageValues, getToken } from 'utils/constants';
import SearchForm from 'components/search-form/SearchForm';
import useAuth from 'utils/auth';

// qq@ya.com
// qweqwe

function App() {
  const { defaultFilterValue, defaultInputValue } = getLocalStorageValues();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [active, setActive] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const changeActive = () => {
    setActive((p) => !p);
  };

  function applyFilters(param, query) {
    const lowerCaseQuery = query?.toLowerCase() || '';
    return param.toLowerCase().includes(lowerCaseQuery);
  }

  function checkLength(newMovies) {
    setFilteredMovies(newMovies);
    setNoResults(!newMovies?.length);
  }

  function filterMovies(filtered, query) {
    setNoResults(false);
    if (filtered) {
      const newMovies = movies.filter(
        (m) =>
          (applyFilters(m.nameRU, query) || applyFilters(m.nameEN, query)) &&
          m.duration <= 40
      );
      checkLength(newMovies);
    } else {
      const newMovies = movies.filter(
        (m) => applyFilters(m.nameRU, query) || applyFilters(m.nameEN, query)
      );
      checkLength(newMovies);
    }
  }

  const [movies, setMovies] = useState(null);
  const [filteredMovies, setFilteredMovies] = useState(null);
  useEffect(() => {
    if (!movies) return;
    setFilteredMovies(movies);

    const { defaultFilterValue, defaultInputValue } = getLocalStorageValues();

    filterMovies(defaultFilterValue, defaultInputValue);
  }, [movies]);
  const [savedMovies, setSavedMovies] = useState([]);

  const [currentUser, setCurrentUser] = useState({});

  const {
    signOut,
    handleLogin,
    handleRegister,
    error,
    isLoggedIn,
    setIsLoggedIn,
  } = useAuth();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) return;
    setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;
    const jwt = getToken();
    async function auth() {
      try {
        const user = await getCurrentUserInfo(jwt);
        setCurrentUser(user);
      } catch (e) {
        console.log(e);
      }
    }

    async function reqSavedMovies() {
      try {
        const res = await getSavedMovies(jwt);
        if (!res.length) return;
        setSavedMovies(res);
      } catch (e) {
        console.log(e);
      }
    }

    auth();
    reqSavedMovies();
  }, [isLoggedIn]);

  // movies
  const [moviesToShow, setMoviesToShow] = useState(null);

  // const [limit, setLimit] = useState(6);
  // const [limitStep, setLimitStep] = useState(3);
  // const [noMoreItems, setNoMoreItems] = useState(false);

  useEffect(() => {
    if (!filteredMovies || !filteredMovies?.length) return;
    // setMoviesToShow(filteredMovies?.slice(0, limit));
    // setMoviesToShow(filteredMovies.slice(0, 6));
    // checkForItems();
  }, [filteredMovies]);

  // const sliceMovies = (target) => {
  //   return filteredMovies.slice(moviesToShow?.length, target);
  // };

  // function checkForItems() {
  //   if (filteredMovies?.length - moviesToShow?.length < limitStep) {
  //     setNoMoreItems(true);
  //   } else {
  //     setNoMoreItems(false);
  //   }
  // }

  // const showMore = () => {
  //   if (filteredMovies?.length - moviesToShow?.length < limitStep) {
  //     const newMovies = sliceMovies(filteredMovies.length);
  //     checkForItems();
  //     setMoviesToShow([...moviesToShow, ...newMovies]);
  //     return;
  //   }
  //   const moviesToAdd = moviesToShow.length + limitStep;
  //   const newMovies = sliceMovies(moviesToAdd);
  //   setMoviesToShow([...moviesToShow, ...newMovies]);
  //   setLimit(moviesToAdd);
  // };

  const lookForSavedMovie = (movieId) => {
    return savedMovies.find((m) => m.movieId === movieId);
  };

  async function addMovieToSavedList(movie) {
    const jwt = getToken();
    try {
      const newMovie = await saveMovie(jwt, movie);
      setSavedMovies((p) => [...p, newMovie]);
    } catch (e) {
      console.log(e);
    }
  }
  async function removeMovieFromSavedList(id) {
    const jwt = getToken();
    const movie = lookForSavedMovie(id);
    const { _id, movieId } = movie;
    await deleteSavedMovieById(jwt, _id);
    setSavedMovies((p) => p.filter((m) => m.movieId !== movieId));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path='/signin'
          element={
            <Main>
              <Login error={error} handleLogin={handleLogin} />
            </Main>
          }
        />

        <Route
          path='/signup'
          element={
            <Main>
              <Register error={error} handleRegister={handleRegister} />
            </Main>
          }
        />
        <Route
          path='/'
          element={
            <>
              <TheHeader isLoggedIn={isLoggedIn} changeActive={changeActive} />
              <Main>
                <Hero />
                <About />
                <Tech />
                <Student />
                <Portfolio />
              </Main>
              <TheFooter />
            </>
          }
        />
        <Route element={<ProtectedRoutes loggedIn={isLoggedIn} />}>
          <Route
            path='/movies'
            element={
              <>
                <TheHeader
                  isLoggedIn={isLoggedIn}
                  changeActive={changeActive}
                />
                <Main>
                  <SearchForm
                    filterMovies={filterMovies}
                    defaultInput={defaultInputValue}
                    defaultFilter={defaultFilterValue}
                  />
                  <MoviesCardList>
                    <Movies
                      moviesData={filteredMovies}
                      saveMovie={addMovieToSavedList}
                      unsaveMovie={removeMovieFromSavedList}
                      setMovies={setMovies}
                      savedMovies={savedMovies}
                      noResults={noResults}>
                      {/* <ShowMore showMore={showMore} noMoreItems={noMoreItems} /> */}
                    </Movies>
                  </MoviesCardList>
                </Main>
                <TheFooter />
              </>
            }
          />
          <Route
            path='/saved-movies'
            element={
              <>
                <TheHeader
                  isLoggedIn={isLoggedIn}
                  changeActive={changeActive}
                />
                <Main>
                  <SearchForm
                    filterMovies={filterMovies}
                    defaultFilter={false}
                    defaultInput=''
                  />
                  <MoviesCardList>
                    <SavedMovies
                      savedMovies={savedMovies}
                      unsaveMovie={removeMovieFromSavedList}
                      setSavedMovies={setSavedMovies}
                    />
                  </MoviesCardList>
                </Main>
                <TheFooter />
              </>
            }
          />
          <Route
            path='/profile'
            element={
              <>
                <TheHeader
                  isLoggedIn={isLoggedIn}
                  changeActive={changeActive}
                />
                <Main>
                  <Profile signOut={signOut} />
                </Main>
              </>
            }
          />
        </Route>
        <Route
          path='/*'
          element={
            <Main>
              <NotFound />
            </Main>
          }
        />
      </Routes>

      <Modal active={active} changeActive={changeActive}>
        <MobileNav active={active} changeActive={changeActive} />
      </Modal>
    </CurrentUserContext.Provider>
  );
}

export default App;
