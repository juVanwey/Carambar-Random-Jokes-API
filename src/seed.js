import { Joke } from './models/joke.js';

const jokes = [
  { question: "Quelle est la femelle du hamster ?", answer: "L’Amsterdam" },
  { question: "Que dit un oignon quand il se cogne ?", answer: "Aïe" },
  { question: "Quel est l'animal le plus heureux ?", answer: "Le hibou, parce que sa femme est chouette." },
  { question: "Pourquoi le football c'est rigolo ?", answer: "Parce que Thierry en rit" },
  { question: "Quel est le sport le plus fruité ?", answer: "La boxe, parce que tu te prends des pêches dans la poire et tu tombes dans les pommes." },
  { question: "Que se fait un Schtroumpf quand il tombe ?", answer: "Un Bleu" },
  { question: "Quel est le comble pour un marin ?", answer: "Avoir le nez qui coule" },
  { question: "Qu'est ce que les enfants usent le plus à l'école ?", answer: "Le professeur" },
  { question: "Quel est le sport le plus silencieux ?", answer: "Le para-chuuuut" },
  { question: "Quel est le comble pour un joueur de bowling ?", answer: "C’est de perdre la boule" }
];

const insertJokes = async () => {
  try {
    for (const joke of jokes) {
      // Vérification si la blague existe déjà dans la base
      const existingJoke = await Joke.findOne({ where: { question: joke.question } });
      
      if (!existingJoke) {
        // Si la blague n'existe pas, on l'ajoute
        await Joke.create(joke);
        console.log(`Blague ajoutée : ${joke.question}`);
      } else {
        console.log(`Blague déjà présente : ${joke.question}`);
      }
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout des blagues:', error);
  }
};

// Appel de la fonction pour insérer les blagues
insertJokes();
// Un tableau de blagues (jokes) est défini.
// La fonction insertJokes parcourt chaque blague du tableau.
// Chaque blague est insérée dans la base de données via Sequelize avec la méthode Joke.create().
// Si l'insertion est réussie, un message est affiché dans la console indiquant que la blague a été ajoutée.
// Si une erreur survient pendant l'insertion, elle est capturée et un message d'erreur est affiché.