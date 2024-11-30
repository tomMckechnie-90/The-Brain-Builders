
const restartGameButton = document.getElementById("restart-game-button");
const header = document.getElementById("hero");
const main = document.getElementById("main");



// Start button
//startGameButton.addEventListener("click", startGame);
// Restart button
//restartGameButton.addEventListener("click", startGame);

// Hide main section
main.style.display = "none";
// Hide restart button
//restartGameButton.style.display = "none";
// Start game boolean
//let start = false;
let level = 1;
let scores = 0;
let timer;
let timeLeft = 60;
const gameLevel = document.getElementById("level");
gameLevel.textContent = `Level ${level}`;

// Shared variables
// let cards = [];
// let flippedCards = [];
// let matchedPairs = 0;

// imageMap mapping numbers to flag images
const imageMap = {
  0: "assets/images/czech_republic.png",
  1: "assets/images/france.png",
  2: "assets/images/germany.png",
  3: "assets/images/italy.png",
  4: "assets/images/norway.png",
  5: "assets/images/portugal.png",
  6: "assets/images/spain.png",
  7: "assets/images/sweden.png",  
}

function gotoPlayboard() {  
  // Hide header section
  const header = document.getElementById("hero");  
  header.style.display = "none";
  // Unhide the main section    
  main.style.display = "block";
  
}

// Start game function
function startGame() {   
  // clear timer ID
  clearTimeout(timer);
  const gameLevel = document.getElementById("level");
  gameLevel.textContent = `Level ${level}`;

  // reset game
  resetGame();

  // Initialize Game Cards
  initializeGameCards(level);

  // Start the timer
  startTimer();  
}

// Reset game function. This reset the state of the game
function resetGame() {
  const gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = ""; // clear the board for the cards
  scores = 0;
  timeLeft = 60;

  const scoreDisplay = document.getElementById("score");
  const timeDisplay = document.getElementById("time");
  const statusMessage = document.getElementById("status-message");
  timeDisplay.textContent = `Time Left: ${timeLeft} sec.`;
  scoreDisplay.textContent = `Score: 0 points`;
  statusMessage.textContent = ""; // No messages

}

// Create and initialize game cards
function initializeGameCards(level) {
  // Initalize the game board
  const gameBoard = document.getElementById("game-board");

  // For level 1, 5 pairs = 10 cards, level 2, 6 pairs = 12 cards
  // Level 1 = 1 + 4 = 5, Level 2 = 2 + 4 = 6
  const numOfPairs = level + 4;  
  const all_values_from_pairs = [...Array(numOfPairs).keys(), ...Array(numOfPairs).keys()];
  // Reshuffle these numbers using shufflecardValues
  const reshuffledCardValues = shuffleCardValues(all_values_from_pairs);
  console.log(reshuffledCardValues)

  // Create cards from these values for the level
  reshuffledCardValues.forEach((value, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.animationDelay = `${index * 0.1}s`; // This gives the card class staggered dealy for transition animation
    card.innerHTML = `
     <div class="card-inner">
        <div class="card-front">?</div>
        <div class="card-back"><img src="${imageMap[value]}" alt="Card ${value}"></div>
      </div>
    `;
    card.addEventListener('click', () => flipCard(card, value));
    gameBoard.appendChild(card);    
  });
}

// Function to shuffle card numbers (Fisher-Yates algorithm)
function shuffleCardValues(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Flip card logic
let firstCard = null;
function flipCard(card, value) {
  const cardInner = card.querySelector(".card-inner");
  if (cardInner.classList.contains("flip")) return; // Prevent flipping the same card again

  cardInner.classList.add("flip");

  if (!firstCard) {
    firstCard = { card, value };
  } else {
    // Match logic
    if (firstCard.value === value) {
      scores += 10;
      const scoreDisplay = document.getElementById("score");
      scoreDisplay.textContent = `Score: ${scores} points`;
      firstCard = null;
      checkWinCondition();
    } else {
      // Flip back after delay if no match
      setTimeout(() => {
        scores-=1;
        const scoreDisplay = document.getElementById("score");
        scoreDisplay.textContent = `Score: ${scores} points`;
        firstCard.card.querySelector(".card-inner").classList.remove("flip");
        cardInner.classList.remove("flip");
        firstCard = null;
      }, 1000);
    }
  }
}

// Check if the player has won
function checkWinCondition() {
  const totalPairs = level + 4;
  if (scores >= totalPairs * 10) {
    clearInterval(timer);
    endGame(true);
  }
}

// Timer
function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    const timeDisplay = document.getElementById("time");
    timeDisplay.textContent = `Time Left: ${timeLeft} sec.`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame(false);
    }
  }, 1000);
}

// End the game
function endGame(isWin) {
  const statusMessage = document.getElementById("status-message");
  if (isWin) {
    statusMessage.textContent = `Congratulations! You completed Level ${level}`;
    level++; // Advance to the next level
    setTimeout(startGame, 3000); // Start the next level after 3 seconds
  } else {
    statusMessage.textContent = `You didn't make it! Try again at Level ${level}`;
    setTimeout(startGame, 3000); // Restart the current level
  }
}

// Start game
const startGameButton = document.getElementById("start-game-btn");
startGameButton.addEventListener('click', startGame);
// Goto playboard button
document.getElementById('goto-playboard-btn').addEventListener('click', gotoPlayboard)