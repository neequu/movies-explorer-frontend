function AboutBlock({ heading, text }) {
  return (
    <div className='about-block'>
      <p className='about-block__heading'>{heading}</p>
      <p className='about-block__text'>{text}</p>
    </div>
  );
}

export default AboutBlock;
