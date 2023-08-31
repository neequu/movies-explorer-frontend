import logo from 'assets/logo.svg';

function AuthPage({ children, heading }) {
  return (
    <div className='auth'>
      <div className='auth__container'>
        <img
          className='auth__logo'
          src={logo}
          loading='lazy'
          alt='moovees logo'
        />
        <h1 className='auth__heading'>{heading}</h1>
        {children}
      </div>
    </div>
  );
}

export default AuthPage;
