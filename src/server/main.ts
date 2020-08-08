import express from 'express'
import "reflect-metadata";
const path = require('path');
import { SERVER_PORT } from 'consts'
import { initializeDB } from 'database'
import { Articles } from 'model'

const app = express()

const API_PREFIX = "/api/"


app.get(API_PREFIX + "articles/", async function(req, res) {
  const articles  = await Articles.getAll();
  res.json(articles);
});

// Serve the js bundle at its path and the HTML bundle at every other path
app.get('/bundle.js', function(req, res){
  res.sendFile(path.resolve('dist', 'bundle.js'));
});
app.get('*', function (request, response) {
  response.sendFile(path.resolve('dist', 'index.html'));
});


app.listen(SERVER_PORT, async () => {
  console.log(`Server running on port ${SERVER_PORT}`)
  initializeDB()
})
