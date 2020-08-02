import express from 'express'
import { SERVER_PORT } from 'consts'

const app = express()

app.use('/', express.static('dist'))

app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`)
})
