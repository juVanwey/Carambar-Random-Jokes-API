import { Sequelize } from 'sequelize';

// Crée une instance de Sequelize pour se connecter à la base de données SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // Fichier SQLite dans le dossier racine
});

export { sequelize };

// Cette portion de code permet de configurer la connexion à une base de données SQLite en utilisant Sequelize, qui est un ORM (Object-Relational Mapping) pour Node.js. Voici une explication détaillée ligne par ligne :

// 1. import { Sequelize } from 'sequelize';
// Cette ligne importe la classe Sequelize depuis le module sequelize installé dans ton projet. Sequelize est utilisé pour interagir avec les bases de données SQL en utilisant du code JavaScript, c'est-à-dire que tu peux écrire des requêtes SQL en utilisant des méthodes JavaScript plutôt que d'écrire directement des requêtes SQL.

// 2. const sequelize = new Sequelize({ ... });
// Cette ligne crée une instance de Sequelize, qui va permettre de se connecter à la base de données.

// L'instance sequelize est utilisée pour interagir avec la base de données (par exemple, pour synchroniser des modèles, effectuer des requêtes, etc.).

// L'instance est configurée avec un objet contenant différentes options de configuration pour la connexion à la base de données.

// 3. dialect: 'sqlite',
// dialect spécifie quel type de base de données Sequelize va utiliser. Dans ce cas, le dialecte est sqlite, ce qui signifie que Sequelize va se connecter à une base de données SQLite.

// 4. storage: './database.sqlite',
// storage indique le chemin du fichier de base de données SQLite. Dans ce cas, la base de données sera stockée dans un fichier appelé database.sqlite à la racine du projet.

// SQLite est une base de données qui utilise un fichier local pour stocker les données, donc tu spécifies ici l'emplacement du fichier sur ton disque.

// 5. export { sequelize };
// Cette ligne exporte l'instance sequelize afin qu'elle puisse être utilisée dans d'autres fichiers de ton projet.

// Grâce à cette exportation, tu peux importer cette instance dans d'autres fichiers où tu en as besoin pour interagir avec ta base de données.

// En résumé :
// Ce code crée une instance de Sequelize configurée pour utiliser une base de données SQLite (stockée dans un fichier local database.sqlite). Cette instance te permet ensuite d'interagir avec la base de données à travers des requêtes JavaScript. L'exportation de l'instance permet de l'utiliser ailleurs dans ton projet pour effectuer des opérations comme des requêtes, des ajouts de données, ou des modifications dans la base de données.