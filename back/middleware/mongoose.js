const dotenv = require("dotenv");
dotenv.config();


// Connexion DataBase
const mongoose = require('mongoose');
  
const password = process.env.access
const user_name = process.env.user
const uri = `mongodb+srv://${user_name}:${password}@cluster0.yevngi2.mongodb.net/Sauces?retryWrites=true&w=majority`

mongoose.set('strictQuery', false);
mongoose
.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));