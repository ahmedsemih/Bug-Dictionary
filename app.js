const sequelize = require('./utils/database');
require('dotenv').config();
const express = require('express');

const authRoutes = require('./routes/authRoutes');
const topicRoutes = require('./routes/topicRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000

// MIDDLEWARES
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


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