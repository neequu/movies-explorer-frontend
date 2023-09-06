import FilterToggle from 'components/filter-toggle/FilterToggle.jsx';
import { useState } from 'react';
import { useValidate } from 'utils/validate';

function SearchForm({ filterMovies, defaultInput, defaultFilter }) {
  const { values, error, handleChange } = useValidate();
  const [filtered, setFiltered] = useState(defaultFilter);

  function handleSubmit(e) {
    e.preventDefault();
    filterMovies(filtered, defaultInput || values?.query);
  }

  function handleFilter(e) {
    localStorage.setItem('filteredStored', e.target.checked);
    setFiltered(e.target.checked);
  }
  function handleInput(e) {
    localStorage.setItem('queryStored', e.target.value || '');
    handleChange(e);
  }

  return (
    <section className='search'>
      <form className='search-form' onSubmit={handleSubmit}>
        <fieldset className='search-form__fieldset'>
          <input
            onChange={handleInput}
            value={values.name}
            defaultValue={defaultInput}
            type='text'
            placeholder='Фильм'
            className='search-form__input'
            required
            name='query'
          />
          <button type='submit' className='search-form__button'>
            Поиск
          </button>
        </fieldset>
        <FilterToggle handleFilter={handleFilter}>
          <span className='filter-toggle__text'>Короткометражки</span>
        </FilterToggle>
      </form>
    </section>
  );
}

export default SearchForm;
