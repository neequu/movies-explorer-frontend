import { projects } from 'utils/constants.js';
import arrowUp from 'assets/arrow-up.svg';

function Portfolio() {
  const projectList = projects.map((p) => (
    <li key={p.name} className='porfolio__list-item'>
      <a href={p.link} className='portfolio__link' target='_blank'>
        {p.name}
        <button className='portfolio__link-arrow'></button>
      </a>
    </li>
  ));
  return (
    <div className='portfolio'>
      <p className='portfolio__heading'>Портфолио</p>
      <ul className='portfolio__list'>{projectList}</ul>
    </div>
  );
}

export default Portfolio;
