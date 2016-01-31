function PremailSource(state) {
  return fetch('/api/v0/premail', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(state)
  }).then(response => response.text())
    .then(body => JSON.parse(body))
    .catch(err => console.log(err));
}

export default PremailSource;
