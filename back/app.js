const express = require('express');
const helmet = require("helmet");
const path = require('path');

require('./middleware/mongoose');// Chemin pour se connecter à la db

//Chemin des routes 
const saucesRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

const app = express();

app.use(helmet()); // Permet de protéger de certaines vulnérabilités connues du Web en configurant de manière appropriée les en-têtes HTTP.


// //Middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json()); 

// Routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces',saucesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;