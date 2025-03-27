// boutons et sections
const randomJokeBtn = document.getElementById('random-joke-btn');
const randomJokeText = document.getElementById('random-joke-text');
const getJokeBtn = document.getElementById('get-joke-btn');
const jokeIdInput = document.getElementById('joke-id');
const jokeResult = document.getElementById('joke-result');
const addJokeBtn = document.getElementById('add-joke-btn');
const jokeQuestionInput = document.getElementById('joke-question');
const jokeAnswerInput = document.getElementById('joke-answer');
const allJokesBtn = document.getElementById('all-jokes-btn');

// Fonction pour obtenir une blague aléatoire
randomJokeBtn.addEventListener('click', async () => {
    try {
      const response = await fetch('http://localhost:5007/jokes/random');
      const data = await response.json();
      randomJokeText.textContent = `${data.question} - ${data.answer}`;
    } catch (error) {
      randomJokeText.textContent = 'Une erreur est survenue, réessayez plus tard.';
    }
  });
  
  // Fonction pour consulter une blague avec un numéro
  getJokeBtn.addEventListener('click', async () => {
    const jokeId = jokeIdInput.value;
    try {
      const response = await fetch(`http://localhost:5007/jokes/${jokeId}`);
      const data = await response.json();
      if (data.id) {
        jokeResult.textContent = `${data.question} - ${data.answer}`;
      } else {
        jokeResult.textContent = 'Blague introuvable. Assurez-vous d\'entrer un ID valide.';
      }
    } catch (error) {
      jokeResult.textContent = 'Une erreur est survenue, réessayez plus tard.';
    }
  });
  
  // Fonction pour ajouter une blague
  addJokeBtn.addEventListener('click', async () => {
    const question = jokeQuestionInput.value;
    const answer = jokeAnswerInput.value;
  
    if (!question || !answer) {
      alert('Veuillez entrer une question et une réponse.');
      return;
    }
  
    const joke = { question, answer };
  
    try {
      const response = await fetch('http://localhost:5007/jokes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(joke),
      });
      const data = await response.json();
      alert('Blague ajoutée avec succès !');
      jokeQuestionInput.value = '';
      jokeAnswerInput.value = '';
    } catch (error) {
      alert('Une erreur est survenue, réessayez plus tard.');
    }
  });
  
  // Fonction pour découvrir toutes les blagues
  allJokesBtn.addEventListener('click', () => {
    window.location.href = 'http://localhost:5007/jokes'; // redirection vers la route API pour toutes les blagues
  });
  