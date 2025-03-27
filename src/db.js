import { Sequelize } from 'sequelize';

// Crée une instance de Sequelize pour se connecter à la base de données SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // Fichier SQLite dans le dossier racine
});

export { sequelize };