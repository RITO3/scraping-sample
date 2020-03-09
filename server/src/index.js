const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.use('/assets/images', express.static('./assets/images'));
app.use('/assets/css', express.static('./assets/css'));
app.use('/assets/bootstrap', express.static('./node_modules/bootstrap/dist'));
app.use('/assets/jquery', express.static('./node_modules/jquery/dist'));
app.get('/', function(req, res) {
  res.render('index');
});

app.listen(3000);
