var html = require('choo/html')
var choo = require('choo')
var mount = require('choo/mount')
var app = require('./app')

app.use({ onStateChange: (state, data, prev, caller) => console.log('NEWSTATE:', { action: { name: caller, data }, state }) })
var tree = app.start()
mount('#app-root', tree)
