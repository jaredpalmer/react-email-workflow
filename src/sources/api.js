import http from '../utils/HttpClient';


export const extract = (url) => {
  console.log(url);
  return http.post('/api/v0/extract', { url: url });
};
