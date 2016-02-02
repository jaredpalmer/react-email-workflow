const express = require('express');
const { Router } = express;
const request = require('superagent');
const router = new Router();

/**
 * POST Extract content from url.
 */
router.post('/', (req, res) => {
  const enc = 'http://api.embed.ly/1/extract?key=' + process.env.EMBEDLY + '&url=' + encodeURIComponent(req.body.url);
  request.get(enc).end((error, response) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        url: req.body.url,
        title: 'Looks like something went wrong',
        content: 'Could not parse that URL',
        author: 'The Server', // eslint-disable-line
        image: ''
      });
    };
    const data = JSON.parse(response.text);
    const updates = {
      url: data.url,
      title: data.title,
      content: data.description,
      author: data.provider_name, // eslint-disable-line
      image: data.images[0] === undefined ? null : data.images[0].url,
    };
    return res.status(200).json(updates);
  });
});

module.exports = router;
