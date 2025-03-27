import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../db.js'; // Connexion à la base de données

const Joke = sequelize.define('Joke', {
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
