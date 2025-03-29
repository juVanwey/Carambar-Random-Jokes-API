// Importation des bibliothèques nécessaires

import express from "express"; // express pour créer un serveur web
import cors from "cors"; // politiques de CORS (Cross-Origin Resource Sharing) qui définissent les règles d'accès pour les ressources du serveur depuis d'autres domaines
import bodyParser from "body-parser"; // body-parser pour analyser les données JSON envoyées dans les requêtes
import swaggerJsdoc from "swagger-jsdoc"; // swagger-jsdoc pour générer la documentation API au format Swagger
import swaggerUi from "swagger-ui-express"; // swagger-ui-express pour afficher la documentation Swagger sous forme d'interface graphique
import dotenv from "dotenv"; // permet de charger les variables d'environnement (comme le port du serveur) à partir d'un fichier .env

import { sequelize } from "./db.js"; // instance de sequelize depuis db.js qui gère la connexion à la base de données
import jokeRoutes from "./routes/jokeRoutes.js"; // routes pour gérer les blagues

dotenv.config(); // chargement des variables d'environnement depuis un fichier .env. Avant création serveur express

const app = express(); // création de l'instance du serveur Express

app.use(
  cors({
    // configuration de CORS
    origin: "*", // // active CORS pour toutes les origines. Permet au serveur d'accepter des requêtes venant de n'importe quel domaine
    // Sinon liste comme ci-dessous :
    // [
    //   "http://localhost:5007",
    //   "http://127.0.0.1:5501",
    // ],
  })
);

// app.use() : méthode dans Express pour ajouter un middleware (fonction qui intervient dans le cycle de vie de la requête avant qu'elle n'atteigne la route finale ou avant de renvoyer la réponse au client)

app.use(bodyParser.json()); // bodyParser.json() est un middleware qui va transformer les données JSON de la requête en un objet JavaScript que le serveur pourra utiliser

app.use("/jokes", jokeRoutes); // toutes les requêtes qui commencent par /jokes redirigent vers les routes (le router) définies dans jokeRoutes.js. Permet d'avoir des routes organisées par fonction, rendant le code plus propre et modulaire

// Configuration de Swagger (documentation de l'API)
const swaggerOptions = {
  // objet de configuration pour Swagger qui décrit l'API (nom, version, base path, schémas, etc.)
  swaggerDefinition: {
    info: {
      title: "API Carambar & co",
      description: "API pour récupérer et ajouter des blagues",
      version: "1.0.0",
    },
    // host: "localhost:5007",
    host: "carambar-gmqo.onrender.com",
    basePath: "/",
    schemes: ["https"],
    // schemes: ["http"],
    components: {
      schemas: {
        Joke: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "L'identifiant de la blague",
            },
            question: {
              type: "string",
              description: "La question de la blague",
            },
            answer: {
              type: "string",
              description: "La réponse de la blague",
            },
          },
        },
      },
    },
  },
  apis: ["./src/swagger/swagger.js"], // tableau qui contient le chemin vers le fichier où Swagger va chercher les définitions des routes. Le fichier contient les annotations dans le code des routes pour permettre à Swagger de générer la documentation
};
const swaggerSpec = swaggerJsdoc(swaggerOptions); // fonction swaggerJsdoc qui génère automatiquement la documentation Swagger à partir des options fournies ci-dessus
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Cette ligne configure Swagger pour servir l'interface graphique de documentation à l'adresse /api-docs. Permet à l'utilisateur d'accéder à une interface interactive
// Création d'une fonction setUpSwagger() ?


// Synchronisation de la base de données avec Sequelize pour s'assurer que les tables sont créées et synchronisées avec le modèle défini
sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });


const PORT = process.env.PORT || 5007; // définition du port d'écoute du serveur. Le serveur doit savoir sur quel port il doit écouter pour recevoir les requêtes HTTP
app.listen(PORT, () => { // démarrage du serveur Express sur le port défini ci-dessus
  console.log(`Server running on port ${PORT}`);
});
// En local, la valeur de process.env.PORT n'est pas définie. Le serveur écoutera donc sur le port 5007.
// En production (sur Render), process.env.PORT sera défini par la plateforme, donc le serveur écoutera sur ce port.


// app.js sert à configurer serveur API. Point central de l'application backend, où est définie comment l'API doit répondre aux différentes requêtes et comment elle interagit avec la bdd
// Actions de ce fichier :
// Chargement des dépendances : express, cors...
// Chargement des variables d'environnement avec dotenv.config()
// Création de l'application Express
// Mise en place des middlewares : cors, bodyParser
// Définition des routes
// Configuration de Swagger pour la documentation API
// Synchronisation avec la base de données
// Démarrage du serveur