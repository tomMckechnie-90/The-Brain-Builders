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
// Start game boolean
let start = false;

// Shared variables
let cards = [];
let flippedCards = [];
let matchedPairs = 0;

// imageMap mapping numbers to flag images
const imageMap = {
  1: "assets/images/czech_republic.png",
  2: "assets/images/france.png",
  3: "assets/images/germany.png",
  4: "assets/images/italy.png",
  5: "assets/images/norway.png"
 

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
  // Hide header section
  header.style.display = "none";
  // Unhide main section
  main.style.display = "block";

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
  shuffledCardValues.forEach((element) => {
    const card = createCard(element);

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



    /*

    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = value;
    card.textContent = "?";
  
    // Add an image placeholder
    const cardImage = document.createElement("img");
    const cardValue = `${value}`;
    cardImage.src = imageMap[cardValue]; // Back of the card
    cardImage.alt = "Card back";
    cardImage.classList.add("card-img");
  
    card.appendChild(cardImage);
  
    // Add flip functionality
    card.addEventListener("click", () => flipCard(card));
    return card;*/
  }


  // shuffledImages.forEach((image, index) => {

  //   const card = document.createElement("div");
  //   card.classList.add("card");
  //   card.dataset.value = image;
  //   card.dataset.index = index;

    

  //   card.addEventListener("click", handleCardClick);
  //   gameBoard.appendChild(card);
  //   cards.push(card);
  // });

  // Delay adding 'active' class for smooth transition
  // setTimeout(() => {
  //   cards.forEach((card) => card.classList.add("active"));
  // }, 100); // Delay ensures DOM rendering before transition starts
  // Staggered transition
  // cards.forEach((card, index) => {
  //   setTimeout(() => {
  //     card.classList.add("active");
  //   }, index * 150); 
    // Adjust this multiplier for slower or faster stagger
//   });
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
  console.log("Card flipped")
  
  
}
