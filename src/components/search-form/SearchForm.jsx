import FilterToggle from 'components/filter-toggle/FilterToggle.jsx';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getLocalStorageValues } from 'utils/utils.js';
import { useValidate } from 'hooks/validate.js';

function SearchForm({ setParams }) {
  const { pathname } = useLocation();
  const { defaultFilterValue, defaultInputValue } = getLocalStorageValues();
  const filterValue = pathname === '/movies' ? defaultFilterValue : false;
  const inputValue = pathname === '/movies' ? defaultInputValue : '';
  const { values, handleChange } = useValidate();
  const [filtered, setFiltered] = useState(filterValue);

  function reqFilter() {
    setParams({ query: values.query, filtered });
  }

  useEffect(() => {
    reqFilter();
    values.query = inputValue;
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    reqFilter();
  }

  function handleFilter(e) {
    if (pathname === '/movies') {
      localStorage.setItem('filteredStored', e.target.checked);
    }
    setFiltered(e.target.checked);
  }
  function handleInput(e) {
    if (pathname === '/movies') {
      localStorage.setItem('queryStored', e.target.value || '');
    }
    handleChange(e);
  }
  return (
    <section className='search'>
      <form className='search-form' onSubmit={handleSubmit}>
        <fieldset className='search-form__fieldset'>
          <input
            onChange={handleInput}
            value={values.name}
            defaultValue={pathname === '/movies' ? defaultInputValue : ''}
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
        <FilterToggle
          handleFilter={handleFilter}
          pathname={pathname}
          setFiltered={setFiltered}>
          <span className='filter-toggle__text'>Короткометражки</span>
        </FilterToggle>
      </form>
    </section>
  );
}

export default SearchForm;
