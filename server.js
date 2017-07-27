const express = require('express')
const app = express()
const chooApp = require('./src/app')

app.use('/static', express.static(`${__dirname}/static`))
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>💰💰💰💰💰💰💰💰💰💰💰</title>
        <link rel="stylesheet" href="/static/css/global.css"/>
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body>
        ${chooApp.toString('/')}
        <script src="/static/js/bundle.js"></script>
      </body>
    </html>
  `.trim())
})

app.listen(3000)
