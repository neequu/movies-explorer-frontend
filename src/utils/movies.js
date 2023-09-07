export default function filterMovies(movies, filtered = false, query = '') {
  if (!movies) return [];
  const filteredMovies = movies.filter((m) => {
    const matchName =
      m.nameRU.toLowerCase().includes(query.toLowerCase()) ||
      m.nameEN.toLowerCase().includes(query.toLowerCase());

    if (filtered) {
      return matchName && m.duration <= 40;
    }

    return matchName;
  });

  return { filteredMovies };
}
