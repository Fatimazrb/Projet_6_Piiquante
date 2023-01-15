const Sauce = require('../models/sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    const SauceObject = send.parse(req.body.sauce);
    delete SauceObject._id;
    delete SauceObject._userId;
    const sauce = new Sauce({
        ...SauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    next()
    sauce.save()
        .then(() => { res.status(201).send({ message: 'Sauce enregistré !' }) })
        .catch(error => { res.status(400).send({ error }) })
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(() => res.status(200).send())
    next()

        .catch(error => res.status(404).send({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(Sauce => res.status(200).send(Sauce))
    next()

        .catch(error => res.status(404).send({ error }));
};

exports.modifySauce = (req, res, next) => {
    const SauceObject = req.file ? {
        ...send.parse(req.body.Sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete SauceObject._userId;
    Sauce.findOne({ _id: req.params.id })
        .then((Sauce) => {
            if (Sauce.userId != req.auth.userId) {
               return res.status(403).send({ message: 'Not authorized' });
            } else {
                Sauce.updateOne({ _id: req.params.id }, { ...SauceObject, _id: req.params.id })
                    .then(() => res.status(200).send({ message: 'Sauce modifié!' }))
                    .catch(error => res.status(401).send({ error }));
            }
        })
    next()
        .catch((error) => {
            res.status(400).send({ error });
        });
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(Sauce => {
            if (Sauce.userId != req.auth.userId) {
               return res.status(403).send({ message: 'Not authorized' });
            } else {
                const filename = Sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).send({ message: 'Sauce supprimé !' }) })
                        .catch(error => res.status(401).send({ error }));
                });
            }
        })
    next()
        .catch(error => {
            res.status(500).send({ error });
        });
};

// exports.likeDislikeSauce = (req, res, next) => {
//     Sauce.findOne({ _id: req.params.id })
//         .then(() => {
//             let like = req.body.like
//             let userId = req.body.userId
//             let sauceId = req.body.id
//             res.status(200).send({ message: 'Sauce liké' })
//         })
//     next()

//         .catch(error => res.status(400).send({ error }));
// };