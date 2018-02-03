const express = require('express');
const app = express();

app.get('/', (req, res) => {
  return res.send('Hello World!');
});

app.get('/data', (req, res) => {
  return res.json({hello: "World"});
});

app.listen(3000, function () {
  console.log('listening on 3000')
});