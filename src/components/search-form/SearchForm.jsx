function SearchForm() {
  return (
    <form className='search-input__container'>
      <input type='text' placeholder='Фильм' className='search-input__input' />
      <button type='submit' className='search-input__button'>
        Поиск
      </button>
    </form>
  );
}

export default SearchForm;
