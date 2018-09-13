const express = require('express')
const cool = require('cool-ascii-faces')
const path = require('path')
const PORT = process.env.PORT || 5000


express()
  .engine('html', require('ejs').renderFile)
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.static(__dirname + '/views/pages'))
  //.use(express.static(__dirname + '/views/p5'))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index.ejs'))
  .get('/mastermind', (req, res) => res.render('pages/MasterMind'))
  .get('/fjollpong', (req, res) => res.render('pages/pong'))

  .get('/cool', (req, res) => res.send(cool()))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

