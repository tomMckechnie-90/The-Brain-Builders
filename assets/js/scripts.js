const startGameButton = document.getElementById("start-game-button");
const restartGameButton = document.getElementById("restart-game-button");
const header = document.getElementById("hero");
const main = document.getElementById("main");

// Start button
startGameButton.addEventListener("click", startGame);
// Hide main section
main.style.display = "none";
// Hide restart button
restartGameButton.style.display = "none";

// Start game
let startGame = false;

// Card images (use dummy numbers or replace with images)
const cardImages = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]; // 5 pairs

 


function startGame() { 
  console.log("Game started");
  

  // Hide header section
  header.style.display = "none";
  // Unhide main section
  main.style.display = "block";

  let cards = [];
  let flippedCards = [];
  let matchedPairs = 0;
  let startGame = false;

 

}

// Shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
