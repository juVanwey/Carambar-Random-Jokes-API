import { Joke } from '../models/joke.js'; // pour interagir avec la base de données
import { Sequelize } from "sequelize"; // pour utiliser des fonctionnalités supplémentaires dans la manipulation de la bdd comme litteral

// Récupérer toutes les jokes
export const getAllJokes = async (req, res) => {
  try {
    const jokes = await Joke.findAll(); // .findAll() : méthode de Sequelize qui recherche toutes les blagues dans la table liée au modèle Joke
    res.json(jokes); // renvoie un tableau de jokes
  } catch (error) {
    res.status(500).send('Error retrieving jokes');
  }
};

// Récupérer une joke aléatoire
export const getRandomJoke = async (req, res) => {
  try {
    const randomJoke = await Joke.findOne({ // méthode de Sequelize pour récupérer une blague
      order: Sequelize.literal('random()'), // utilisation de `random()` pour récupérer une blague aléatoire (fonction SQL native)
    });
    res.json(randomJoke); // renvoie la blague
  } catch (error) {
    res.status(500).send('Error retrieving random joke');
  }
};

// Récupérer une joke par son ID
export const getJokeById = async (req, res) => {
  const { id } = req.params; // récupère l'ID de la blague à partir des paramètres de l'URL (destructuration d'objet)
  try {
    const joke = await Joke.findByPk(id); // méthode de Sequelize pour récupérer une blague en utilisant son ID, qui est la clé primaire (Pk) de la table
    if (joke) {
      res.json(joke); // renvoie la blague
    } else {
      res.status(404).send('Joke not found');
    }
  } catch (error) {
    res.status(500).send('Error retrieving joke');
  }
};

// Ajouter une nouvelle joke
export const addJoke = async (req, res) => {
  const { question, answer } = req.body; // destructuration d'objet pour extraire les données question et answer envoyées par le client dans le corps de la requête (c'est-à-dire dans req.body).
  try {
    const newJoke = await Joke.create({ question, answer }); // crée la nouvelle blague dans la bdd
    res.status(201).json(newJoke); // renvoie la blague créée avec un statut HTTP 201 (créée avec succès)
  } catch (error) {
    res.status(500).send('Error adding joke');
  }
};