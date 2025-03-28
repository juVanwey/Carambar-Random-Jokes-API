import { Sequelize } from 'sequelize';

// création d'une instance de Sequelize pour se connecter à la base de données SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // fichier SQLite dans le dossier racine
});

export { sequelize };