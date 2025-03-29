import { Sequelize, DataTypes } from 'sequelize'; // importe la classe Sequelize (modèle) et l'objet DataTypes depuis la bibliothèque Sequelize. DataTypes contient tous les types de données disponibles dans Sequelize pour définir les colonnes des tables (string, int., etc.).
import { sequelize } from '../db.js'; // instance de la classe Sequelize créée dans db.js pour se connecter à la base de données SQLite

const Joke = sequelize.define('Joke', { // définit un modèle Joke. Dans Sequelize, pour définir un modèle, on utilise la méthode define. Cette méthode attend deux arguments : 1. nom de la table dans la base de données, 2. les colonnes de la table avec leurs propriétés.
  question: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  answer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export { Joke };

// Dans Sequelize, l'ID (qui est la clé primaire de la table) est généré automatiquement par défaut pour chaque modèle.
