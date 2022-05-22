// required packages
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const session = require('express-session');
const sequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// set up express session
const sess = {
    secret: 'super secret dreams',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new sequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({force: false}).then( () => {
    app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});

app.use(function(req, res, next) {
    if (req.session.user == null){
// if user is not logged-in redirect back to login page //
        res.redirect('/login');
    }   else{
        next();
    }
});


