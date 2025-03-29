import { Sequelize } from 'sequelize'; // importe la classe Sequelize depuis la bibliothèque Sequelize

// création d'une instance de la classe Sequelize pour se connecter à la base de données SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // fichier SQLite dans le dossier racine
});

export { sequelize }; // pour pouvoir l'utiliser ailleurs dans le dossier