const express = require('express')
const cool = require('cool-ascii-faces')
const path = require('path')
const PORT = process.env.PORT || 5000


express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.static(__dirname + '/views/p5')).set('views', path.join(__dirname, 'views'))
  .use(express.static(__dirname + '/views/p5/MasterMind')).set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/MasterMind', (req, res) => res.render('p5/MasterMind/sketch_MM3'))

  .get('/cool', (req, res) => res.send(cool()))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

//Users/mariehansteen/Documents/Lek/node-js-getting-started/views/p5/MasterMind

// var app = express();
// var server = app.listen(3000);
// app.get('/p5_game',sayHello);

// function sayHello(req,res){
// 	res.send(app.use(express.static(path.join(__dirname, 'views/p5/example'))));
// 	res.send("Hello! Nice to meet you");

// }

//express()
  //.use(express.static(path.join(__dirname, 'public')))
  //.set('views', path.join(__dirname, 'views'))
  //.set('view engine', 'html')
  //.get('/p5_game', (req, res) => res.render('p5/example/index'))

  //.listen(PORT, () => console.log(`Listening on ${ PORT }`))
