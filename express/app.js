
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nunjucks = require('nunjucks');

const app = express();
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
});

app.set('view engine', 'nunjucks');
// app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);


app.use((req, res, next) => {
  res.render('404', {
    pageTitle: 'Page Not Found'
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});