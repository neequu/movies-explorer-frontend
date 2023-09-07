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
import { getToken } from 'utils/utils.js';
import SearchForm from 'components/search-form/SearchForm.jsx';
import useAuth from 'utils/auth.js';

// qq@ya.com
// qweqwe

function App() {
  const {
    signOut,
    handleLogin,
    handleRegister,
    error,
    isLoggedIn,
    setIsLoggedIn,
  } = useAuth();

  const [loading, setLoading] = useState(false);
  // movies
  const [movies, setMovies] = useState(null);
  const [savedMovies, setSavedMovies] = useState(null);
  const [params, setParams] = useState({ query: '', filter: false });
  // error
  const [errorFetching, setErrorFetching] = useState(false);
  // user
  const [currentUser, setCurrentUser] = useState({});
  // active menu
  const [active, setActive] = useState(false);
  const changeActive = () => {
    setActive((p) => !p);
  };

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

    async function reqMovies() {
      setErrorFetching(false);
      const jwt = getToken();
      try {
        const res = await getSavedMovies(jwt);
        setSavedMovies(res);
      } catch (e) {
        console.log(e);
        setErrorFetching(true);
      } finally {
      }
    }

    reqMovies();
    auth();
  }, [isLoggedIn]);

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
                    key='movies-form'
                    moviesData={movies}
                    setParams={setParams}
                  />
                  <MoviesCardList
                    errorFetching={errorFetching}
                    moviesData={movies}
                    params={params}>
                    <Movies
                      setErrorFetching={setErrorFetching}
                      saveMovie={addMovieToSavedList}
                      unsaveMovie={removeMovieFromSavedList}
                      setMovies={setMovies}
                      savedMovies={savedMovies}
                    />
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
                    key='saved-movies-form'
                    moviesData={savedMovies}
                    setParams={setParams}
                  />
                  <MoviesCardList
                    moviesData={savedMovies}
                    errorFetching={errorFetching}
                    params={params}>
                    <SavedMovies
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
