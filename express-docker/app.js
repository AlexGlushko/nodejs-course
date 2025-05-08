
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nunjucks = require('nunjucks');
const sequelize = require('./utils/database');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => {
      console.log(err);
    });
});


nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
});

app.set('view engine', 'nunjucks');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorRoutes = require('./routes/errors');

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorRoutes);


const User = require('./models/user');
const Product = require('./models/product');
const { Cart, CartItem } = require('./models/cart');
const { Order, OrderItem } = require('./models/order');

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

// sequelize.sync({force: true})
sequelize.sync()
  .then(() => {
    return User.findByPk(1);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: 'John Doe', email: 'user1@example.com' })
    }

    return Promise.resolve(user)
  })
  .then(user => {
    return user.getCart().then(cart => {
      if (!cart) {
        return user.createCart({totalPrice: 0, totalItems: 0});
      }
      return Promise.resolve(cart);
    })
  })
  .then(() => {
    console.log('Database connected');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(err => {
    console.log(err);
  });

