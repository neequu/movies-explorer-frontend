function ShowMore({ showMore, noMoreItems }) {
  return (
    !noMoreItems && (
      <button type='button' className='show-more-button' onClick={showMore}>
        Ещё
      </button>
    )
  );
}

export default ShowMore;
