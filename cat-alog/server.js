const path = require('path');
const express = require('express');

const PORT = 5002;

const app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('dist'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
  response.sendFile(path.resolve(__dirname, 'dist/index.html'));
});

// listen for requests :)
const listener = app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
});
