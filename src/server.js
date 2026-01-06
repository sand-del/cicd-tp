const express = require('express');
const { getGreeting } = require('./greeting');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to validate name parameter
const validateName = (req, res, next) => {
  const name = req.params.name || req.headers['x-name'];
  if (name && name.length > 100) {
    return res.status(400).send('Name is too long');
  }
  next();
};

app.get('/hello/:name?', validateName, (req, res) => {
  const name = req.params.name;
  res.send(getGreeting(name));
});

app.post('/hello', validateName, (req, res) => {
  const name = req.headers['x-name'];
  res.send(getGreeting(name));
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

module.exports = app;
