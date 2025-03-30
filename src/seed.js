import { Joke } from "./models/joke.js";
import { sequelize } from "./db.js";

const initialJokes = [
  { question: "Quelle est la femelle du hamster ?", answer: "L’Amsterdam" },
  { question: "Que dit un oignon quand il se cogne ?", answer: "Aïe" },
  {
    question: "Quel est l'animal le plus heureux ?",
    answer: "Le hibou, parce que sa femme est chouette.",
  },
  {
    question: "Pourquoi le football c'est rigolo ?",
    answer: "Parce que Thierry en rit",
  },
  {
    question: "Quel est le sport le plus fruité ?",
    answer:
      "La boxe, parce que tu te prends des pêches dans la poire et tu tombes dans les pommes.",
  },
  { question: "Que se fait un Schtroumpf quand il tombe ?", answer: "Un Bleu" },
  {
    question: "Quel est le comble pour un marin ?",
    answer: "Avoir le nez qui coule",
  },
  {
    question: "Qu'est ce que les enfants usent le plus à l'école ?",
    answer: "Le professeur",
  },
  {
    question: "Quel est le sport le plus silencieux ?",
    answer: "Le para-chuuuut",
  },
  {
    question: "Quel est le comble pour un joueur de bowling ?",
    answer: "C’est de perdre la boule",
  },
];

async function seedDatabase() {
  try {
    await sequelize.authenticate();
    const jokeCount = await Joke.count();
   
    if (jokeCount > 0) {
      console.log(`Database already contains ${jokeCount} jokes. Skipping seeding.`);
    } else {
      await sequelize.sync(); // crée la table des blagues dans la bdd
      console.log("Adding sample jokes...");
      await Joke.bulkCreate(initialJokes); // bulkCreate() est une méthode de Sequelize qui permet d'ajouter plusieurs enregistrements à la fois dans la base de données
      console.log(`Successfully added ${initialJokes.length} jokes!`);
    }
   
    await sequelize.close();
  } catch (error) {
    await sequelize.sync({ force: true });
  }
}

// async function seedDatabase() {
//   try {
//     console.log("Initializing database...");
//     await sequelize.sync({ force: true }); // crée la table des blagues dans la bdd
//     console.log("Database table created!");

//     console.log("Adding sample jokes...");
//     const jokes = await Joke.bulkCreate(initialJokes); // bulkCreate() est une méthode de Sequelize qui permet d'ajouter plusieurs enregistrements à la fois dans la base de données
//     console.log(`Successfully added ${jokes.length} jokes to the database!`);
//     console.log("Database seeding completed successfully!");

//     await sequelize.close(); // ferme proprement la connexion à la base de données une fois que tout est terminé
//   } catch (error) {
//     console.error("Error seeding database:", error);
//     process.exit(1); // Arrête le processus avec un code de sortie 1, indiquant qu'il y a eu une erreur
//   }
// }

seedDatabase();

// Actions de ce fichier :
// Synchronise (et réinitialise) la base de données
// Insère un tableau de blagues
// Affiche des messages de statut dans la console pour te tenir informé du progrès
// Ferme la connexion à la base de données une fois l'opération terminée
// Gère les erreurs et arrête le processus en cas de problème