import studentPhoto from 'assets/student.png';
function Student() {
  return (
    <section className='student'>
      <h2 className='student__heading'>Студент</h2>
      <div className='student__content'>
        <img
          className='student__photo'
          src={studentPhoto}
          alt='image of a studnet'
        />
        <div className='student__text-content'>
          <div>
            <p className='student__subheading'>Виталий</p>
            <p className='student__text student__text_lg'>
              Фронтенд-разработчик, 30 лет
            </p>
            <p className='student__text'>
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У
              меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
              бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
              Контур». После того, как прошёл курс по веб-разработке, начал
              заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
          </div>
          <a
            target='_blank'
            href='https://github.com/niccc0'
            className='studnet__link'>
            Github
          </a>
        </div>
      </div>
    </section>
  );
}

export default Student;
