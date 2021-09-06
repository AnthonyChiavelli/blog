import dotenv from 'dotenv'
import express from 'express'
import 'reflect-metadata'
import path from 'path'
import { SERVER_PORT } from 'consts'
import { initializeDB } from 'database'
import { Db, ObjectId } from 'mongodb'
import { BlogPostModel } from 'model'

const API_PREFIX = '/api/'

dotenv.config()
const app = express()

app.listen(SERVER_PORT, async () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${SERVER_PORT}`)
  const dbClient: Db = await initializeDB()
  app.emit('dbReady', dbClient)
})

app.on('dbReady', (): void => {
  app.get(API_PREFIX + 'posts/', async function (request, response) {
    const posts = await BlogPostModel.find({}, { sort: { createdAt: -1 } })
    response.send(posts.map((p) => p.toJson()))
  })

  app.get(API_PREFIX + 'posts/:id', async function (request, response) {
    const post = await BlogPostModel.findOne({ _id: new ObjectId(request.params.id) })
    response.send(post ? post.toJson() : undefined)
  })

  // TODO add error page for api/BS

  // Serve the js bundle at its path and the HTML bundle at every other path
  app.get('*/bundle.js', function (req, res) {
    res.sendFile(path.resolve('..', 'dist', 'bundle.js'))
  })
  app.get('*', function (request, response) {
    response.sendFile(path.resolve('..', 'dist', 'index.html'))
  })
})
