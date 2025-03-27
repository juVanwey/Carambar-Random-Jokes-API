/**
 * @swagger
 *  components:
 *    schemas:
 *      Joke:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            description: L'identifiant unique de la blague
 *          question:
 *            type: string
 *            description: La question de la blague
 *          answer:
 *            type: string
 *            description: La réponse de la blague
 *        required:
 *          - question
 *          - answer
 *        example:
 *          question: "Quelle est la femelle du hamster ?"
 *          answer: "L'Amsterdam"
 */

/**
 * @swagger
 *  tags:
 *    - name: Jokes
 *      description: API pour récupérer et ajouter des blagues
 */

/**
 * @swagger
 * /jokes:
 *   get:
 *     summary: Récupérer toutes les blagues
 *     tags: [Jokes]
 *     responses:
 *       200:
 *         description: Une liste de toutes les blagues
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Joke'
 *       500:
 *         description: Erreur du serveur
 */

/**
 * @swagger
 * /jokes/random:
 *   get:
 *     summary: Récupérer une blague aléatoire
 *     tags: [Jokes]
 *     responses:
 *       200:
 *         description: Une blague aléatoire
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Joke'
 *       500:
 *         description: Erreur du serveur
 */

/**
 * @swagger
 * /jokes:
 *   post:
 *     summary: Ajouter une nouvelle blague
 *     tags: [Jokes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Joke'
 *     responses:
 *       201:
 *         description: La blague a été ajoutée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Joke'
 *       400:
 *         description: Mauvais format ou données manquantes
 *       500:
 *         description: Erreur du serveur
 */

/**
 * @swagger
 * /jokes/{id}:
 *   get:
 *     summary: Récupérer une blague par son ID
 *     tags: [Jokes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: L'ID de la blague à récupérer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: La blague correspondante
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Joke'
 *       404:
 *         description: Blague non trouvée
 *       500:
 *         description: Erreur du serveur
 */
