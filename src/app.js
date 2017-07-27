const choo = require('choo')
const app = choo()

app.model(require('./models/model'))

const mainView = require('./views/main')
app.router([ '/', mainView ])

module.exports = app
