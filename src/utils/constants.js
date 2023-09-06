export const tech = [
  'HTML',
  'CSS',
  'JS',
  'React',
  'Git',
  'Express.js',
  'mongoDB',
];

export const projects = [
  { name: 'Статичный сайт', link: 'https://github.com/niccc0/how-to-learn' },
  { name: 'Адаптивный сайт', link: 'https://niccc0.github.io/russian-travel/' },
  { name: 'Одностраничное приложение', link: 'http://neequu.nomoreparties.co' },
];

export const MOVIES_API_URL = 'https://api.nomoreparties.co/beatfilm-movies';
export const BASE_URL = 'https://api.nomoreparties.co';
export const BASE_API_URL = 'https://api.moovees.nomoredomainsicu.ru';

export function checkResponse(res) {
  if (res.ok) return res.json();

  return Promise.reject(`Ошибка: ${res.status}`);
}

export function formatTime(duration) {
  const hours = Math.floor(duration / 60);
  const mins = duration - hours * 60;

  const formattedMins = mins > 9 && mins > 0 ? mins : `0${mins}`;
  return `${hours}ч ${formattedMins}м`;
}

export function saveToken(jwt) {
  localStorage.setItem('jwt', jwt);
}

export function getToken() {
  return localStorage.getItem('jwt');
}

export function getMovieFields(movie) {
  const fields = {
    movieId: movie.id,
    nameRU: movie.nameRU,
    nameEN: movie.nameEN,
    country: movie.country,
    year: movie.year,
    director: movie.director,
    duration: movie.duration,
    description: movie.description,
    trailerLink: movie.trailerLink,
    image: BASE_URL + movie.image?.url,
    thumbnail: BASE_URL + movie.image?.formats?.thumbnail?.url,
  };
  return fields;
}

export function getLocalStorageValues() {
  const defaultInputValue = localStorage.getItem('queryStored') || '';
  const defaultFilterValue =
    JSON.parse(localStorage.getItem('filteredStored')) || false;

  return { defaultFilterValue, defaultInputValue };
}
