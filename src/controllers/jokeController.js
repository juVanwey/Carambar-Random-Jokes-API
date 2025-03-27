import { Joke } from '../models/joke.js'; // On importe le modèle Joke qui nous permet d'interagir avec la base de données
import { Sequelize } from "sequelize";

// Récupérer toutes les jokes
export const getAllJokes = async (req, res) => {
  try {
    // Recherche de toutes les blagues dans la base de données via le modèle Joke
    const jokes = await Joke.findAll(); 
    
    // Si la récupération réussit, on renvoie les blagues au format JSON
    res.json(jokes); 
  } catch (error) {
    // En cas d'erreur, on renvoie une réponse avec un statut 500 (erreur serveur) et un message d'erreur
    res.status(500).send('Error retrieving jokes');
  }
};

// Récupérer une joke aléatoire
export const getRandomJoke = async (req, res) => {
  try {
    // Recherche d'une blague aléatoire dans la base de données
    const randomJoke = await Joke.findOne({
      order: Sequelize.literal('random()'), // Utilisation de `random()` pour récupérer une blague aléatoire
    });
    
    // Renvoie de la blague aléatoire trouvée au format JSON
    res.json(randomJoke);
  } catch (error) {
    // En cas d'erreur, on renvoie une erreur 500
    res.status(500).send('Error retrieving random joke');
  }
};

// Ajouter une nouvelle joke
export const addJoke = async (req, res) => {
  // On récupère la question et la réponse de la blague envoyée dans le corps de la requête
  const { question, answer } = req.body; 
  try {
    // On crée la nouvelle blague dans la base de données
    const newJoke = await Joke.create({ question, answer });
    
    // On renvoie la blague nouvellement créée avec un statut HTTP 201 (créée avec succès)
    res.status(201).json(newJoke); 
  } catch (error) {
    // En cas d'erreur, on renvoie une erreur 500
    res.status(500).send('Error adding joke');
  }
};

// Récupérer une joke par son ID
export const getJokeById = async (req, res) => {
  // Récupère l'ID de la blague à partir des paramètres de l'URL
  const { id } = req.params; 
  try {
    // Recherche de la blague dans la base de données par son ID
    const joke = await Joke.findByPk(id); 
    
    if (joke) {
      // Si la blague existe, on la renvoie au format JSON
      res.json(joke);
    } else {
      // Si la blague n'existe pas, on renvoie une erreur 404 (blague non trouvée)
      res.status(404).send('Joke not found');
    }
  } catch (error) {
    // En cas d'erreur, on renvoie une erreur 500
    res.status(500).send('Error retrieving joke');
  }
};


// import { Joke } from '../models/joke.js';

// // Récupérer toutes les jokes
// export const getAllJokes = async (req, res) => {
//   try {
//     const jokes = await Joke.findAll();
//     res.json(jokes);
//   } catch (error) {
//     res.status(500).send('Error retrieving jokes');
//   }
// };

// // Récupérer une joke aléatoire
// export const getRandomJoke = async (req, res) => {
//   try {
//     const randomJoke = await Joke.findOne({
//       order: Sequelize.literal('random()'),
//     });
//     res.json(randomJoke);
//   } catch (error) {
//     res.status(500).send('Error retrieving random joke');
//   }
// };

// // Ajouter une nouvelle joke
// export const addJoke = async (req, res) => {
//   const { question, answer } = req.body;
//   try {
//     const newJoke = await Joke.create({ question, answer });
//     res.status(201).json(newJoke);
//   } catch (error) {
//     res.status(500).send('Error adding joke');
//   }
// };

// // Récupérer une joke par son ID
// export const getJokeById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const joke = await Joke.findByPk(id);
//     if (joke) {
//       res.json(joke);
//     } else {
//       res.status(404).send('Joke not found');
//     }
//   } catch (error) {
//     res.status(500).send('Error retrieving joke');
//   }
// };
