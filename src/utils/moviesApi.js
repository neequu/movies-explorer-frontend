import { MOVIES_API_URL, checkResponse } from './constants';

export async function fetchMovies() {
  try {
    const res = await fetch(MOVIES_API_URL);
    return checkResponse(res);
  } catch (e) {
    console.log(e.message);
  }
}
