import { useState } from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
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
import SearchBlock from 'components/search-block/SearchBlock.jsx';
import MoviesCardList from 'components/movies-card-list/MoviesCardList.jsx';
import ShowMore from 'components/show-more/ShowMore.jsx';
import NotFound from 'components/not-found/NotFound.jsx';
import Profile from 'components/profile/Profile.jsx';
import ProtectedRoutes from 'components/protected-routes/ProtectedRoutes.jsx';
import Login from 'components/login/Login.jsx';
import Register from 'components/register/Register.jsx';

function App() {
  const navigate = useNavigate();

  const [active, setActive] = useState(false);

  const changeActive = () => {
    setActive((p) => !p);
  };

  const [auth, setAuth] = useState(true);

  function authorize() {
    setAuth(true);
    navigate('/');
  }
  function unathorize() {
    setAuth(false);
    navigate('/signin');
  }

  return (
    <CurrentUserContext.Provider value=''>
      <Routes>
        <Route path='/signin' element={<Login authorize={authorize} />} />

        <Route path='/signup' element={<Register authorize={authorize} />} />
        <Route element={<ProtectedRoutes loggedIn={auth} />}>
          <Route
            path='/'
            element={
              <>
                <TheHeader auth={auth} changeActive={changeActive} />
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
          <Route
            path='/movies'
            element={
              <>
                <TheHeader auth={auth} changeActive={changeActive} />
                <Main>
                  <SearchBlock />
                  <MoviesCardList>
                    <ShowMore />
                  </MoviesCardList>
                </Main>
              </>
            }
          />
          <Route
            path='/saved-movies'
            element={
              <>
                <TheHeader auth={auth} changeActive={changeActive} />
                <Main>
                  <SearchBlock />
                  <MoviesCardList limit={3} />
                </Main>
                <TheFooter />
              </>
            }
          />
          <Route
            path='/profile'
            element={
              <>
                <TheHeader auth={auth} changeActive={changeActive} />
                <Profile unathorize={unathorize} />
              </>
            }
          />
          <Route path='/*' element={<NotFound />} />
        </Route>
      </Routes>

      <Modal active={active} changeActive={changeActive}>
        <MobileNav active={active} changeActive={changeActive} />
      </Modal>
    </CurrentUserContext.Provider>
  );
}

export default App;
