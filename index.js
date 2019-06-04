
const express = require('express');
const Router = require('express-promise-router');
const path = require('path');
var bodyParser = require('body-parser');
const db = require('./db/index');
const app = express();

// Use bodyParser to parse jsons
app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Roll die
app.get('/api/roll', (req, res) => {
  const dieOne = Math.floor(Math.random() * 6) + 1;
  const dieTwo = Math.floor(Math.random() * 6) + 1;
  const roll = dieOne + dieTwo;
  res.json(roll);
});

// Get scores
app.get('/api/scores', async (req, res) => {
  const query = await db.query('SELECT * FROM players ORDER BY name;');
  res.send(query.rows);
});

// Add new player
app.post('/api/new-player', async (req, res) => {
  const { player } = req.body;
  const name = player[0];
  if (name.length >= 1) {
    await db.query('INSERT INTO players(name, score) VALUES ($1, 0);', [
      name
    ]);
  }
  res.json("Successfully posted ".concat(name));
});

// Add player score
app.post('/api/add-player-score', async (req, res) => {
  const { player } = req.body;
  const name = player[0];
  await db.query('UPDATE players SET score = score + 1 WHERE name = $1;', [
    name
  ]);
  res.json("Successfully incremented score for ".concat(name));
});

// Subtract player score
app.post('/api/subtract-player-score', async (req, res) => {
  const { player } = req.body;
  const name = player[0];
  await db.query('UPDATE players SET score = score - 1 WHERE name = $1;', [
    name
  ]);
  res.json("Successfully decremented score for ".concat(name));
});

// Delete player
app.post('/api/delete-player', async (req, res) => {
  const { player } = req.body;
  const name = player[0];
  await db.query('DELETE FROM players WHERE name = $1 ;', [
    name
  ]);
  res.json("You successfully deleted: ".concat(name));
})

// For any request that doesn't match, we'll send the index.html file from the client. This is used for all of our React code.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// Set localhost port for server
const port = process.env.PORT || 5000;
app.listen(port);

console.log(`score tracker listening on ${port}`);