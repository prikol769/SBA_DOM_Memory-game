<div align="center">
  <h1>The Document Object Model</h1>
  <h1>Memory Game</h1>
</div>

## How to Play

1. Enter your name and the number of card pairs you want to play with.
2. Submit the form to start the game.
3. Click button "Start New Game".
4. Click on the cards to reveal them and try to find matching pairs.
5. Match all pairs to win the game and see a confetti animation.
6. Enjoy playing!

## Objectives

- Use DOM properties, methods, and techniques to create a web application that provides a dynamic user experience
- Use BOM properties, methods, and techniques to facilitate creation of a dynamic web application
- Demonstrate proficiency with event-driven programming and DOM events
- Implement basic form validation using any combination of built-in HTML validation attributes and DOM-event-driven JavaScript validation

## Functions created

- changeUiScore - updates the displayed score with the current player's name and score.
- createArrAndShuffleCards - shuffles the symbols(cards), creates pairs based on the user input, and shuffles the pairs.
- validateName - validates that the player's name is not empty.
- createBoardHandler - sets up the game board with the cards and their styles, and attaches event listeners to the cards.
- deleteAllContent - clears the game board.
- handleCardClick card.addEventListener - handles the logic for card clicks, matching pairs, updating the score, and displaying confetti when all pairs are matched.
- handleStartGame - starts the game, initializes the board, and handles the countdown before the game begins.

- greetBasedOnTime - function that generates a time-based greeting and prints it to the console using switch statement and new Date()
