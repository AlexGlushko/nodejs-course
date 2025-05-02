
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nunjucks = require('nunjucks');
const db = require('./utils/database');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
});

app.set('view engine', 'nunjucks');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorRoutes = require('./routes/errors');


db.execute('SELECT * FROM products')
  .then(result => {
    console.log(result[0]);
  })
  .catch(err => {
    console.log(err);
  });


app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorRoutes);



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});