const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require("../models");
const Utilisateurs = db.utilisateur;
const Op = db.Sequelize.Op;

exports.getAll = (req, res) => {

  Utilisateurs.findAll()
    .then(data => { res.send(data); })
    .catch(err => {
      res.status(400).send({
        message: err.message
      });
    });
};

exports.create = async (req, res) => {
  const {
    nom,
    prenom,
    login,
    password
  } = req.body;

  if (!nom) return res.status(400).json({ message: "Le champ 'nom' est obligatoire." });
  if (!prenom) return res.status(400).json({ message: "Le champ 'prenom' est obligatoire." });
  if (!login) return res.status(400).json({ message: "Le champ 'login' est obligatoire." });
  if (!password) return res.status(400).json({ message: "Le champ 'password' est obligatoire." });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const utilisateur = {
      nom,
      prenom,
      login,
      password: hashedPassword
    };

    const data = await Utilisateurs.create(utilisateur);

    res.status(201).json({
      message: "Utilisateur créé avec succès.",
      utilisateur: {
        id: data.id,
        nom: data.nom,
        prenom: data.prenom,
        login: data.login
      }
    });

  } catch (err) {
    console.error("Erreur lors de la création de l'utilisateur : ", err);
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { login, password } = req.body;

  // Validation
  if (!login || !password) {
    return res.status(400).json({ message: "Login et mot de passe obligatoires." });
  }

  try {
    // Recherche utilisateur
    const utilisateur = await Utilisateurs.findOne({ where: { login } });

    if (!utilisateur) {
      return res.status(401).json({ message: "Identifiants invalides." });
    }

    // Vérification du mot de passe
    const isPasswordValid = await bcrypt.compare(password, utilisateur.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Identifiants invalides." });
    }

    // Génération du JWT
    const token = jwt.sign(
      {
        id: utilisateur.id,
        login: utilisateur.login
      },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({
      token,
      utilisateur: {
        id: utilisateur.id,
        nom: utilisateur.nom,
        prenom: utilisateur.prenom,
        login: utilisateur.login
      }
    });

  } catch (err) {
    console.error("Erreur login :", err);
    res.status(500).json({ message: "Erreur serveur." });
  }
};


