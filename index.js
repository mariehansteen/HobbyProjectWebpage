const express = require('express')
const cool = require('cool-ascii-faces')
const path = require('path')
const PORT = process.env.PORT || 5000


express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.static(__dirname + '/views/p5')).set('views', path.join(__dirname, 'views'))
  .use(express.static(__dirname + '/views/p5/example')).set('views', path.join(__dirname, 'views'))
  .use(express.static(__dirname + '/views/p5/example/Example2')).set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/test', (req, res) => res.render('p5/example/Example2/index_MM'))

  .get('/cool', (req, res) => res.send(cool()))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


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
