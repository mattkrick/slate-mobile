const WebSocket = require('ws')
const http = require('http')
const express = require('express')
const config = require('../../config/webpack.config.dev.js')
const hotClient = require('webpack-hot-client')
const webpack = require('webpack')
const fs = require('fs')
const path = require('path')
const html = fs.readFileSync(path.join(__dirname, './template.html'), 'utf8')

const PORT = 3000
const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({server})
server.listen(PORT)

const compiler = webpack(config)
// hotClient(compiler, {port: 8082})

app.use(
  require('webpack-dev-middleware')(compiler, {
    logLevel: 'warn',
    noInfo: false,
    publicPath: config.output.publicPath,
    stats: {
      chunks: false,
      colors: true
    },
    watchOptions: {
      poll: true,
      aggregateTimeout: 300
    }
  })
)

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(message)
  })
})

app.get('*', (req, res) => {
  console.log('req', req.url)
  res.send(html)
})
