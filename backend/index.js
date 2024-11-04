const express = require('express'),
  path = require('path')

const app = express()

app.get('/api', (_request, response) => {
  response.send({ Social: 'Say hello to someone on the street.' })
})

app.use(express.static(path.join(path.resolve(), 'dist')))

app.listen(3000, () => {
  console.log('Redo på http://localhost:3000/')
})
