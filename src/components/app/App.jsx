// import { useState } from 'react';
import {
  // BrowserRouter,
  // Link,
  Route,
  Routes,
  // useNavigate,
} from 'react-router-dom';
// context
import { CurrentUserContext } from 'contexts/CurrentUserContext.js';
import TheHeader from '../the-header/TheHeader.jsx';
import Main from '../main/Main.jsx';
import TheFooter from 'components/the-footer/TheFooter.jsx';
import { useState } from 'react';
import MobileNav from '../mobile-nav/MobileNav.jsx';
import Modal from '../modal/Modal.jsx';

import Hero from '../hero/Hero.jsx';
import About from '../about/About.jsx';
import Tech from '../tech/Tech.jsx';
import Student from '../student/Student.jsx';
import Portfolio from '../portfolio/Portfolio.jsx';
import SearchBlock from '../search-block/SearchBlock.jsx';
import MoviesCardList from '../movies/card-list/MoviesCardList.jsx';
import ShowMore from '../show-more/ShowMore.jsx';
import NotFound from '../not-found/NotFound.jsx';
import Profile from '../profile/Profile.jsx';
import ProtectedRoutes from '../protected-routes/ProtectedRoutes.jsx';
import Login from '../login/Login.jsx';
import Register from '../register/Register.jsx';

function App() {
  const [active, setActive] = useState(false);

  const changeActive = () => {
    setActive((p) => !p);
  };

  const loggedIn = true;
  return (
    <CurrentUserContext.Provider value=''>
      <Routes>
        <Route path='/sign-in' element={<Login />} />

        <Route path='/sign-up' element={<Register />} />
        <Route element={<ProtectedRoutes loggedIn={loggedIn} />}>
          <Route
            path='/'
            element={
              <>
                <TheHeader changeActive={changeActive} />

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
                <TheHeader changeActive={changeActive} />

                <Main>
                  <SearchBlock />
                  <MoviesCardList>
                    <ShowMore />
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
                <TheHeader changeActive={changeActive} />
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
                <TheHeader changeActive={changeActive} />
                <Profile />
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
