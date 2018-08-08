const express = require('express')
const index_php = require('/Users/mariehansteen/Lek/node-js-getting-started/views/pages/index_php.php')
const cool = require('cool-ascii-faces')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cool', (req, res) => res.send(cool()))
  .get('/index_php', (req, res) => res.send(index_php()))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

