// Bibliothèque Express qui permet de créer un serveur web
import express from "express";

// Body-parser pour analyser les données JSON envoyées dans les requêtes
import bodyParser from "body-parser";

// Instance de sequelize depuis le fichier 'db.js' qui gère la connexion à la base de données
import { sequelize } from "./db.js";

// Routes pour gérer les blagues
import jokeRoutes from "./routes/jokeRoutes.js";

// Swagger-jsdoc pour générer la documentation API au format Swagger
import swaggerJsdoc from "swagger-jsdoc";

// Swagger-ui-express pour afficher la documentation Swagger sous forme d'interface graphique
import swaggerUi from "swagger-ui-express";

import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

// Création d'une instance d'Express pour le serveur
const app = express();

// Active CORS pour toutes les origines
app.use(
  cors({
    origin: [
      "https://your-username.github.io",
      "http://localhost:5007",
      "http://127.0.0.1:5501",
    ],
  })
);

app.use(bodyParser.json());
// app.use() : méthode dans Express pour ajouter un middleware (fonction qui intervient dans le cycle de vie de la requête avant qu'elle n'atteigne la route finale ou avant de renvoyer la réponse au client).
// bodyParser.json() est un middleware spécifique qui sert à parser les données JSON dans une requête HTTP. Cela signifie que lorsque tu envoies une requête HTTP contenant un corps (body) avec des données au format JSON (comme une requête POST ou PUT), ce middleware va convertir cette donnée JSON en un objet JavaScript

app.use("/jokes", jokeRoutes);
// toutes les requêtes qui commencent par /jokes redirigent vers les routes définies dans jokeRoutes.js. Cela permet d'avoir des routes organisées par fonction, rendant le code plus propre et modulaire.

// Définition de la configuration pour Swagger (documentation de l'API), décrit l'API que Swagger affichera
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "API Carambar @ co",
      description: "API pour récupérer et ajouter des blagues",
      version: "1.0.0",
    },
    host: "localhost:5007",
    basePath: "/",
    schemes: ["http"],
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
  apis: ["./src/swagger/swagger.js"],
};

// Génération de la documentation Swagger à partir des options ci-dessus
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// On utilise Swagger pour servir la documentation accessible sous /api-docs. Quand on navigue vers 'localhost:5004/api-docs', Swagger affichera l'interface de la documentation de l'API
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// On synchronise la base de données avec Sequelize pour s'assurer que les tables sont créées et synchronisées avec le modèle défini. Table : Lorsque tu utilises sequelize.sync() pour synchroniser la base de données, Sequelize va créer une table "Jokes" dans ta base de données qui va contenir les données réelles (les blagues) en suivant la structure que tu as définie dans ton modèle.
sequelize
  .sync()
  .then(() => {
    console.log("Database synced"); // Si la base de données est correctement synchronisée, on affiche un message dans la console
  })
  .catch((error) => {
    console.error("Error syncing database:", error); // Si une erreur survient lors de la synchronisation, on l'affiche
  });

// On définit le port d'écoute du serveur.
const PORT = process.env.PORT || 5007;

// On démarre le serveur sur le port défini ci-dessus
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Affichage d'un message dans la console pour indiquer que le serveur est bien lancé
});
