const http = require('http');
const app = require('./app');

const cors = require('cors'); // Permet à ce que différent server communique entre eux 
app.use(cors());

const dotenv = require("dotenv");
dotenv.config();

// Ecoute du port 3000 
const normalizePort = val => { // la fonction normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne ;
  const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  };
  const port = normalizePort(process.env.PORT || 3000);
  app.set('port', port);
  
  const errorHandler = error => { // la fonction errorHandler recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur ;
    if (error.syscall !== 'listen') {
      throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
      default:
        throw error;
    }
  };
  
const server = http.createServer(app);
  
  server.on('error', errorHandler);
  server.on('listening', () => { // Ecouteur d'evenement afin de consigné le port ou le canal nommé dans le server
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
  });

server.listen(port);
  
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


