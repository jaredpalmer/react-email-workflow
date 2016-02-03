import http from '../utils/HttpClient';


export const extract = (url) => {
    console.log(url);
    return http.post('/api/v0/extract', {url: url});
}

export const premail = (state) => {
    console.log(state);
    return http.post('/api/v0/premail', state);
}
