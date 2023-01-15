const express = require('express');
const path = require('path');
const app = express();

//Chemin des routes 
const saucesRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

//Middleware
app.use(express.json()); 


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


// Routes
app.use('/api/sauces',saucesRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;