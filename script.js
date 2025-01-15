const gameBoard = document.getElementById('game-board');
const playerTurn = document.getElementById('player-turn');

let cards = [];
let currentPlayer = 1;
let currentTarget = 1; // Players need to start with 1

// Initialize Game
function initializeGame() {
  // Generate shuffled card numbers
  cards = shuffle([...Array(9).keys()].map(i => i + 1));
  gameBoard.innerHTML = '';
  
  cards.forEach((number, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.number = number;
    card.dataset.index = index;
    card.addEventListener('click', () => handleCardClick(card));
    gameBoard.appendChild(card);
  });
}

// Shuffle an array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Handle Card Click
function handleCardClick(card) {
  const cardNumber = parseInt(card.dataset.number);

  if (card.classList.contains('revealed')) return; // Ignore already revealed cards

  card.classList.add('revealed');
  card.textContent = cardNumber;

  if (cardNumber === currentTarget) {
    // Correct selection
    currentTarget++;
    if (currentTarget > 9) {
      setTimeout(() => {
        alert(`Player ${currentPlayer} wins!`);
        initializeGame();
      }, 500);
    }
  } else {
    // Incorrect selection
    setTimeout(() => {
      // Flip back all revealed cards
      const revealedCards = document.querySelectorAll('.card.revealed');
      revealedCards.forEach(card => {
        card.classList.remove('revealed');
        card.textContent = '';
      });
      switchPlayer();
    }, 1000); // Delay to let players see the incorrect card
  }
}


// Switch Player
function switchPlayer() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  document.getElementById('player-turn').textContent = `Player ${currentPlayer}'s Turn`;

  // Change background gradient based on the current player
  if (currentPlayer === 1) {
    document.body.style.background = 'linear-gradient(to right, #4a90e2, #ffffff)'; // Blue gradient for Player 1
  } else {
    document.body.style.background = 'linear-gradient(to left, #ff77aa, #ffffff)'; // Pink gradient for Player 2
  }
}

// Start the game
initializeGame();
