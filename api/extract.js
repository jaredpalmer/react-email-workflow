const express = require('express');
const { Router } = express;
const request = require('superagent');
const router = new Router();

/**
 * POST Extract content from url.
 */
router.post('/', (req, res) => {
  try {
    console.log(req.body.url);
    const enc = 'http://api.embed.ly/1/extract?key=' + process.env.EMBEDLY + '&url=' + encodeURIComponent(req.body.url);
    request.get(enc).end((error, response) => {
      if (error) {
        return res.status(500).json({
          url: req.body.url,
          title: 'Looks like something went wrong',
          content: 'Could not parse that URL',
          author: 'The Server',
          image: '',
        });
      };

      // jscs:disable
      const data = JSON.parse(response.text);
      const updates = {
        url: data.url,
        title: data.title,
        content: data.description,

        author: data.provider_name, // eslint-disable-line
        image: data.images[0] === undefined ? null : data.images[0].url,
      };
      // jscs:enable
      return res.status(200).json(updates);
    });
  } catch (e) {
    console.log(e);
  }

});

module.exports = router;
