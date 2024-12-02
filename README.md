# Brain Builders Game

[View live project here](https://tommckechnie-90.github.io/The-Brain-Builders/)

## Table of Contents

-[Overview](#overview)
-[User Stories](#user-stories)
-[Design](#design)
-[Features](#features)
-[Testing and Validation](#testing-and-validation)
-[Deployment](#deployment)
-[Credits](#credits)
-[AI Contributions](#ai-contributions)
-[Future Improvements](#future-improvements)

## Overview

This project is a Flip and Match Cards game called the Brain Builders Game. It enhances our memory by helping to remember where objects are located so we can match similiar picture objects together. It is designed using HTML, CSS, and JavaScript. The player flips two cards per turn, if they match they are kept open and the game increments the number of matched pairs (successful matches). If the cards do not match, they are flipped back to the board (within one second) while the player continues the game.The player wins when all the flipped pairs match. The player is congratulated.

![responsivity-image](/assets/images/resonsivity-image.png)
![game-image](/assets/images/game-image.png)

## User stories

- As a player, I want to see a welcome screen so that I know how to start the game.
- As a player, I want to be able to flip cards so that I can see the images.
- As a player, I want to play the game on different devices so that I can enjoy it anywhere.
- As a player, I want to match pairs of cards so that I can win the game.
- As a player, I want to be able to flip cards so that I can see the images.
- As a player, I want to see my score so that I can track my performance.

## Design

### Wireframes

![mobile-wireframe](/assets/images/mobile-wireframe.PNG)

![tablet-wireframe](/assets/images/tablet-wireframe.PNG)

![desktop-wireframe](/assets/images/desktop-wireframe.png)

### Colour Scheme

![colour-palette](/assets/images/new-colour-palette%20.png)

## Features

1. Card Matching Logic: Flipping two cards per turn, matching them based on images.
2. Timer/Feedback: If cards don’t match, they flip back after a delay
3. Victory Screen: Displays a congratulatory message when all matches are found.
4. Scoring System: Tracks the number of successful matches.
5. Responsive Design: Works across devices of all sizes (mobile, tablet, desktop).
6. Reset Option: Allows restarting the game.

## Testing and Validation

### Testing Results

All game functionalities were manually tested:

- Cards flip correctly when clicked.
- Matching logic functions as intended.
- Victory message appears when the game is completed.
- The timer begins when the first card is clicked.
- Game resets properly when the game ends.

### Validation

- HTML validator
![html-validator](/assets/images/html-validator.PNG)

- CSS validator
![css-validator](/assets/images/css-validator.PNG)

- Javascript validator
![javascript-validator](/assets/images/javascript-validator.PNG)

- Lighthouse score
![lighthouse-testing](/assets/images/lighthouse-testing.PNG)

## Deployment

1. Go to your GithHub account and open the repository for the project.
2. In the respository, navigate to the **Settings** tab.
3. Select **Pages** from the left-hand menu.
4. Set the source to deploy from the **Main** branch and choose the `/root` folder.
5. Save the settings, and the live project link will be generated within a few minutes.

## Credits

### Media

- [Google-Fonts](https://fonts.google.com)
- [Flaticon](https://www.flaticon.com)
- [Coolors](https://coolors.co)

### Testing

- [HTML Validator](https://validator.w3.org/)
- [CSS Validator](https://jigsaw.w3.org/css-validator/)
- [JS-Validator] <https://jshint.com/>

## AI Contributions

AI was like having an extra teammate on this project, helping to make the development of the game faster and simpler.

### Code Generation and Problem Solving

AI was a big help when it came to writing the logic for flipping cards, checking matches, and keeping track of progress.

### Bug Fixes

Whenever bugs showed up, AI was there to help troubleshoot. For example

- when you clicked three cards the third would stay showing and wouldnt allow you to finish the game

### Boosting Efficiency

Using AI sped up the whole process. From solving coding challenges to suggesting improvements, it made development faster and less frustrating.

## Future Improvements

1. Add sound effects for better feedback during gameplay.
2. Save high scores locally using browser storage or an online leaderboard system.
