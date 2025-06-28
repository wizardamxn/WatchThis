const TMDB_API_KEY_FROM_ENV = import.meta.env.VITE_TMDB_API_KEY

export const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TMDB_API_KEY_FROM_ENV}` 
  }
};
