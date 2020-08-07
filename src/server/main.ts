import express from 'express'
import "reflect-metadata";
const path = require('path');
import { SERVER_PORT } from 'consts'

const app = express()

// app.use(express.static('dist'))

app.get('/bundle.js', function(req, res){
  res.sendFile(path.resolve('dist', 'bundle.js'));
});

app.get('*', function (request, response) {
  response.sendFile(path.resolve('dist', 'index.html'));
});


app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`)
})
