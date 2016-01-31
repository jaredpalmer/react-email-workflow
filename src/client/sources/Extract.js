import axios from 'axios';
import config from '../config';

function Extract(url) {
  const enc = 'http://api.embed.ly/1/extract?key=' + config.EMBEDLY + '&url=' + encodeURIComponent(url);
  return axios.get(enc).then((res) => {
    console.log(res);
    const data = res.data;
    return {
        url: data.url,
        title: data.title,
        content: data.description,
        author: data.provider_name, // eslint-disable-line
        image: data.images[0] === undefined ? null : data.images[0].url,
      };
  });
}

export default Extract;
