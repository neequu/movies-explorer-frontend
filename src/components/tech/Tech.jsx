import { tech } from 'utils/constants';

function Tech() {
  const techList = tech.map((t) => (
    <span className='tech__block' key={t}>
      {t}
    </span>
  ));

  return (
    <section className='tech'>
      <h2 className='tech__heading'>Технологии</h2>
      <div className='tech__content'>
        <p className='tech__subheading'>7 технологий</p>
        <p className='tech__text'>
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
      </div>
      <div className='tech__blocks'>{techList}</div>
    </section>
  );
}

export default Tech;
