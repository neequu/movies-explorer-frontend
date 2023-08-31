function TheFooter() {
  return (
    <footer className='footer'>
      <div className='footer__container'>
        <div className='footer__header'>
          <p className='footer__caption'>
            Учебный проект Яндекс.Практикум х BeatFilm.
          </p>
        </div>
        <div className='footer__footer'>
          <div className='footer__links'>
            <a
              target='_blank'
              href='https://practicum.yandex.ru/profile/web/'
              className='footer__link'
              rel='noreferrer'>
              Яндекс.Практикум
            </a>
            <a
              target='_blank'
              href='https://github.com/niccc0'
              className='footer__link'
              rel='noreferrer'>
              Github
            </a>
          </div>
          <p className='footer__copyright'>&copy; 2020</p>
        </div>
      </div>
    </footer>
  );
}

export default TheFooter;
