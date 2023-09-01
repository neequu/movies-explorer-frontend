import FilterToggle from 'components/filter-toggle/FilterToggle.jsx';

function SearchForm() {
  return (
    <form className='search-form'>
      <fieldset className='search-form__fieldset'>
        <input
          type='text'
          placeholder='Фильм'
          className='search-form__input'
          required
        />
        <button type='submit' className='search-form__button'>
          Поиск
        </button>
      </fieldset>
      <FilterToggle>
        <span className='filter-toggle__text'>Короткометражки</span>
      </FilterToggle>
    </form>
  );
}

export default SearchForm;
