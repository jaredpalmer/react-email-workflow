function ExtractSource(url) {
  return fetch('/api/v0/extract', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({url: url})
  }).then(response => response.text())
    .then(body => JSON.parse(body));
}

export default ExtractSource;
