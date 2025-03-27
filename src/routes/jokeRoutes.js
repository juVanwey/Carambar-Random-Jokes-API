import express from 'express';
import { getAllJokes, getRandomJoke, addJoke, getJokeById } from '../controllers/jokeController.js';

const router = express.Router();

// Route pour récupérer toutes les jokes
router.get('/', getAllJokes);

// Route pour récupérer une joke aléatoire
router.get('/random', getRandomJoke);

// Route pour ajouter une nouvelle joke
router.post('/', addJoke);

// Route pour récupérer une joke par son ID
router.get('/:id', getJokeById);

export default router;
