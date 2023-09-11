//imports
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

//establishing session
const sess = {
    secret: '??????????',
    cookie: {
      maxAge: 3000000,
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
  };

global.__basedir = __dirname;
app.use(session(sess));

const hbs = exphbs.create({ helpers });

//setting app engine to handlebars w helpers
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//using routes
app.use(routes);

//syncing sequelize
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('listening'));
});
  
