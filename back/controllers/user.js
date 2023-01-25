const User = require('../models/user'); // Chemin des models utilisateur
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Création d'un nouvelle utilisateur 
exports.signUp = (req, res) => {
    bcrypt.hash(req.body.password, 10) // Cryptage du mot de passe
    .then((hash) =>{
       const user = new User({
        email : req.body.email,
        password : hash
       });
       user.save()
       .then(() => res.status(201).json({message: 'Utilisateur créé !'}))
       .catch(error => res.status(400).json({error}))
    })
    .catch(error => res.status(500).json({error}))
}; 


//Connexion d'un utilisateur existant 
exports.login = (req, res) => {
    User.findOne({ email: req.body.email }) // On vérifie dans la base de donnée si l'utilisateur existe
    .then(user => {
        if (!user) {
            return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'}); // Si il ne le retrouve pas il retourne une erreur
        }else{
        bcrypt.compare(req.body.password, user.password) // On compare la clé de cryptage déjà genéré avec celle-ci
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' }); // Si elle n'est pas identique, elle retourne une erreur
                } else{
                res.status(200).json({ // Si elles sont identiques, l'utilisateur se connecte
                    userId: user._id,
                    token: jwt.sign(
                        {userId: user._id},
                        process.env.ACCESS_SECRET_TOKEN,
                        {expiresIn: '24h'}
                    ) 
                });
                }
            })
            .catch(error => res.status(500).json({error}))
        }
        })
    .catch(error => res.status(500).json({error}))
};

