const startGameButton = document.getElementById("start-game-button");
const restartGameButton = document.getElementById("restart-game-button");
const header = document.getElementById("hero");
const main = document.getElementById("main");
const gameBoard = document.getElementById("game-board");
const statusMessage = document.getElementById("status-message");
const gameLevel = document.getElementById("level");
const timeDisplay = document.getElementById("time");
const scoresDisplay = document.getElementById("scoreLine");

// Start button
startGameButton.addEventListener("click", startGame);
// Restart button
restartGameButton.addEventListener("click", startGame);

// Hide main section
main.style.display = "none";
// Hide restart button
restartGameButton.style.display = "none";
// Start game boolean
let start = false;
let level = 1;
gameLevel.textContent = `Level ${level}`;

// Shared variables
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let unmatchedPairs = 0;
let timeIntervalID; // TimeInterval ID
let timeOutID;  // TimeOut ID
let timeLeft = 60; // total time for game
let scores = 0; // At the beginning

// imageMap mapping numbers to flag images
const imageMap = {
  1: "assets/images/czech_republic.png",
  2: "assets/images/france.png",
  3: "assets/images/germany.png",
  4: "assets/images/italy.png",
  5: "assets/images/norway.png",
  
}

const laevel2ImageMap = {
  1: "assets/images/czech_republic.png",
  2: "assets/images/france.png",
  3: "assets/images/germany.png",
  4: "assets/images/italy.png",
  5: "assets/images/norway.png",
  6: "assets/images/portugal.png",
  7: "assets/images/spain.png",
  8: "assets/images/sweden.png"
}

// Start game function
function startGame() {   
  console.log(scores)
  // Hide header section
  header.style.display = "none";
  // Unhide main section
  main.style.display = "block";

  // Start timer
  startTimer();

  // rest the state of these variables
  cards = [];
  flippedCards = [];
  matchedPairs = 0;
  start = true; // Game started, turn start to true   
  
  gameBoard.innerHTML = ""; // clear the board for the cards
  // Generate values for the cards
  const generatedCardValues = generateCardValues();
  // Shuffle the numbers
  const shuffledCardValues = shuffleCardValues(generatedCardValues); 
  

  // Create the card
  shuffledCardValues.forEach((element, index) => {
    const card = createCard(element);
    // Staggered transition    
    setTimeout(() => {
    card.classList.add("slideIn");
    }, index * 200);     
    gameBoard.appendChild(card);
  });

  // this function creates a card
  function createCard(value) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = value;

    // inner div in card
    const cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");
    // front div with class and content 
    const cardFront = document.createElement("div");
    cardFront.classList.add("card-front");
    cardFront.textContent = "?"; // Question mark on front

    // back div with flag image
    const cardBack = document.createElement("div");
    cardBack.classList.add("card-back");
    const img = document.createElement("img");
    img.src = imageMap[value]; // Use the image map to assign the correct image
    img.alt = "Flag";
    cardBack.appendChild(img);

    // inner div should contain front and back divs which should go inside card
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);

    // Add flip functionality
    card.addEventListener("click", () => flipCard(card));   
    return card;   
  }  
  
}

// Function to generate card values
function generateCardValues() {
  const values = Object.keys(imageMap); // list the key
  return [...values, ...values]; // Unpack the array and return two times
}

// Function to shuffle card numbers (Fisher-Yates algorithm)
function shuffleCardValues(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Function to flip the card
function flipCard(card) { 
  if(flippedCards.length < 2 && !card.classList.contains('flipped')) {
    card.classList.add("flipped");
  }
  flippedCards.push(card);

  if(flippedCards.length === 2) {
    checkForMatch();
  }
  
}

// Function to check if the flipped cards match
function checkForMatch() {
  const [card1, card2] = flippedCards;
  if(card1.dataset.value === card2.dataset.value) {
    matchedPairs++;
    scores = scores + 10;
    scoresDisplay.textContent = `${scores} points`;
    flippedCards = [];
    // Check if all the cards are flipped
    if(matchedPairs === Object.keys(imageMap).length) {
      tidyUp(true)      
    }
  } else {
    unmatchedPairs++;
    scores = scores - 2;
    scoresDisplay.textContent = `${scores} points`;
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      flippedCards = [];
    }, 1000);
    
  }  
}

// start timer function
function startTimer() {
  timeDisplay.textContent = `0:${timeLeft} sec.`;
  timeIntervalID = setInterval(() => {
    timeLeft--;
    if(timeLeft < 10) {
      timeDisplay.textContent = `0:0${timeLeft} sec.`;
    } else {
      timeDisplay.textContent = `0:${timeLeft} sec.`;
    }
    // Time up?
    if(timeLeft <= 0) {
      clearInterval(timeIntervalID); // stops the time
      tidyUp(false); // Play has lost the game
    }   
  }, 1000);
}

// TidyUp function
function tidyUp(status) {
  // Give one more second to tidy up things
  timeOutID = setTimeout(() => {
    console.log("TimeUp! Tidy Up.")
    endGame(status)
  }, 1000);

}

// endGame function
function endGame(isWin) {
  clearInterval(timeIntervalID); // stops the timer  
  clearTimeout(timeOutID); // stops the timeout
  // Check the status of each player and give customized message
  const btnMC = document.getElementById('btn-modal-close');
 
  if(isWin && scores >= 25) {
      // console.log("Congratulations! You won with high points. Move to the next level")
      statusMessage.textContent = "Congratulations! You've won the game with good points. Move to the next level.";
      const congratulationsModal = new bootstrap.Modal(document.getElementById('game-over-modal'));
      congratulationsModal.show();
      btnMC.addEventListener('click', () => {
        // Start game boolean
        start = false;
        level = 2;  
        
        level2();
      })
  } else if (isWin && scores < 25) {
    //console.log("You won but lower scores. Repeat level 1")
    statusMessage.textContent = "Congratulations! You won but lower scores. Repeat level 1.";
    const congratulationsModal = new bootstrap.Modal(document.getElementById('game-over-modal'));
    congratulationsModal.show();
    btnMC.addEventListener('click', () => {
      // Start game boolean
      start = false;
      level = 1;

      // Initialize cvariables
      cards = [];
      flippedCards = [];
      matchedPairs = 0;
      unmatchedPairs = 0;
      timeIntervalID; // TimeInterval ID
      timeOutID;  // TimeOut ID
      timeLeft = 60; // total time for game
      scores = 0; // At the beginning
      startGame();
    })
  } else {
    //console.log("You lost! Repeat level 1")
    statusMessage.textContent = "You lost! Repeat level 1.";
    const congratulationsModal = new bootstrap.Modal(document.getElementById('game-over-modal'));
    congratulationsModal.show();
    btnMC.addEventListener('click', () => {
      // Start game boolean
      start = false;
      level = 1;

      // Initialize cvariables
      cards = [];
      flippedCards = [];
      matchedPairs = 0;
      unmatchedPairs = 0;
      timeIntervalID; // TimeInterval ID
      timeOutID;  // TimeOut ID
      timeLeft = 60; // total time for game
      scores = 0; // At the beginning
      startGame();
    })    
  }
  
  //statusMessage.textContent = "Congratulations! You've matched all the cards!";
      // const congratulationsModal = new bootstrap.Modal(document.getElementById('game-over-modal'));
      // congratulationsModal.show();
      // Unhide restart button
      //restartGameButton.style.display = "block";
      // restartGameButton.innerHTML = `Click to go to level ${++level}`;     

}

// Function to play level 2
function level2() {
  console.log("Starting Level 2");
}