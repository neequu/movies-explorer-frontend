function FilterToggle({ children, handleFilter }) {
  const checked = JSON.parse(localStorage.getItem('filteredStored')) || false;

  return (
    <div className='filter-toggle'>
      <input
        id='filter-toggle-checkbox'
        type='checkbox'
        className='filter-toggle__checkbox'
        name='filter'
        onChange={handleFilter}
        defaultChecked={checked}
      />
      <label
        tabIndex='0'
        htmlFor='filter-toggle-checkbox'
        className='filter-toggle__label'>
        <span className='filter-toggle__ball'></span>
      </label>
      {children}
    </div>
  );
}

export default FilterToggle;
