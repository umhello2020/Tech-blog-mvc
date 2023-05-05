const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');
const sequelize = require('./config/connection');
require('dotenv').config();

// Update User model with formattedCreatedAt helper
const User = require('./models/user');
User.prototype.formattedCreatedAt = function () {
  return helpers.format_date(this.createdAt);
};

// Update Comment model with formattedCreatedAt helper
const Comment = require('./models/comment');
Comment.prototype.formattedCreatedAt = function () {
  return helpers.format_date(this.createdAt);
};

const app = express();
const PORT = process.env.PORT || 3002;

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => console.log('server running'));
    console.log('Successful sync!');
  }).catch((error) => {
    console.error('Sync failed', error);
  });
