const startGameButton = document.getElementById("start-game-button");
const restartGameButton = document.getElementById("restart-game-button");
const header = document.getElementById("hero");
const main = document.getElementById("main");
const gameBoard = document.getElementById("game-board");

// Start button
startGameButton.addEventListener("click", startGame);
// Hide main section
main.style.display = "none";
// Hide restart button
restartGameButton.style.display = "none";
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
// Start game
let start = false;

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
  let start = true;

  // Shuffle cards
  const shuffledImages = shuffleArray([...cardImages]);  
  
  // Create cards dynamically
  gameBoard.innerHTML = "";
  shuffledImages.forEach((image, index) => {

    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = image;
    card.dataset.index = index;

    

    card.addEventListener("click", handleCardClick);
    gameBoard.appendChild(card);
    cards.push(card);
  });

  // Delay adding 'active' class for smooth transition
  // setTimeout(() => {
  //   cards.forEach((card) => card.classList.add("active"));
  // }, 100); // Delay ensures DOM rendering before transition starts
  // Staggered transition
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("active");
    }, index * 150); // Adjust this multiplier for slower or faster stagger
  });


 

}

// Shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Handle card click
function handleCardClick(e) {
  const card = e.target;

  // Ignore clicks on already flipped or matched cards
  if (card.classList.contains("flipped") || card.classList.contains("matched")) {
    return;
  }

  // Flip the card
  flipCard(card);
  flippedCards.push(card);

  // Check for match
  if (flippedCards.length === 2) {
    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
      // Match found
      card1.classList.add("matched");
      card2.classList.add("matched");
      matchedPairs++;

      // Check win condition
      if (matchedPairs === cardImages.length / 2) {
        statusMessage.textContent = "Congratulations! You've matched all the cards!";
          // Show restart button
          restartGameButton.style.display = "block";
      }
    } else {
      // No match, flip back after a delay
      setTimeout(() => {
        unflipCard(card1);
        unflipCard(card2);
      }, 1000);
    }

    flippedCards = [];
  }
}

// Flip card
function flipCard(card) {
  card.classList.add("flipped");
  card.textContent = card.dataset.value; // Show card value (or image)
}

// Unflip card
function unflipCard(card) {
  card.classList.remove("flipped");
  card.textContent = ""; // Hide card value
}
