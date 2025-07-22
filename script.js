// Memory Game: JavaScript Logic

const cardsArray = ['🌵', '⛺', '🚋', '🍕', '🍉', '🐳', '⚽', '🥑'];
let cardValues = [...cardsArray, ...cardsArray];
let firstCard = null, secondCard = null;
let isLocked = false;
let matchedPairs = 0;
let moves = 0;

const grid = document.getElementById('game-grid');
const movesDisplay = document.getElementById('moves');
const restartBtn = document.getElementById('restart');
const congratsOverlay = document.getElementById('congrats-overlay');

function shuffle(array) {
  for (let i = array.length-1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createBoard() {
  grid.innerHTML = '';
  cardValues = [...cardsArray, ...cardsArray];
  shuffle(cardValues);
  matchedPairs = 0;
  moves = 0;
  movesDisplay.textContent = "Moves: 0";
  firstCard = null; 
  secondCard = null; 
  isLocked = false;

  cardValues.forEach((value, idx) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.value = value;
    card.dataset.index = idx;
    card.innerHTML = `<span class="hide">${value}</span>`;
    card.addEventListener('click', handleCardClick);
    grid.appendChild(card);
  });
}

function showMatchCongrats() {
  congratsOverlay.classList.remove('hidden');
  congratsOverlay.style.animation = 'none'; // reset animation
  // Trigger reflow to restart animation
  void congratsOverlay.offsetWidth;
  congratsOverlay.style.animation = null;
  setTimeout(() => {
    congratsOverlay.classList.add('hidden');
  }, 2000); // animation duration
}

function handleCardClick(e) {
  const card = e.currentTarget;
  if (isLocked || card.classList.contains('flipped') || card.classList.contains('matched')) return;

  card.classList.add('flipped');
  card.firstChild.classList.remove('hide');

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  isLocked = true;
  moves++;
  movesDisplay.textContent = `Moves: ${moves}`;

  if (firstCard.dataset.value === secondCard.dataset.value) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchedPairs++;

    showMatchCongrats();

    resetTurn();
    if (matchedPairs === cardsArray.length) {
      setTimeout(() => {
        alert(`🎉 Congratulations! You won in ${moves} moves!`);
      }, 700);
    }
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      firstCard.firstChild.classList.add('hide');
      secondCard.firstChild.classList.add('hide');
      resetTurn();
    }, 850);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  isLocked = false;
}

restartBtn.addEventListener('click', createBoard);

window.onload = createBoard;
