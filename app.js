const sequelize = require('./utils/database');
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
require('dotenv').config();
const express = require('express');

const authRoutes = require('./routes/authRoutes');
const topicRoutes = require('./routes/topicRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes = require('./routes/userRoutes');
const addToLocals=require('./middlewares/addToLocals');

const app = express();
const PORT = process.env.PORT || 3000

// MIDDLEWARES
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    session({
        secret: "blablabla",
        store: new SequelizeStore({
            db: sequelize,
            checkExpirationInterval: 15 * 60 * 1000,
            expiration: 3 * 60 * 60 * 1000
        }),
        saveUninitialized: false,
        resave: false,
        proxy: true
    })
);
app.use(addToLocals);

// ROUTES
app.use('/', authRoutes);
app.use('/users', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/topics', topicRoutes);


sequelize.sync().then(() => {
    console.log('All datas synced.');
});

app.listen(PORT, (req, res) => {
    console.log(`App is running on port ${PORT}.`);
});