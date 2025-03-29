import express from 'express'; // permet de créer des routes et gérer des requêtes
import { getAllJokes, getRandomJoke, addJoke, getJokeById } from '../controllers/jokeController.js';

const router = express.Router(); // express.Router() crée un objet qui va contenir toutes les routes de l'application.

router.get('/', getAllJokes); // route pour récupérer toutes les jokes
// / est la racine du routeur /jokes, donc l'URL finale serait /jokes
// si le client envoie une requête à l'url /, la fonction getAllJokes sera exécutée

router.get('/random', getRandomJoke); // pour récupérer une joke aléatoire

router.post('/', addJoke); // pour ajouter une nouvelle joke

router.get('/:id', getJokeById); // // pour récupérer une joke par son ID

export default router;
