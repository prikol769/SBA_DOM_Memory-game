const arrayFullCardsContent = [
  "★",
  "☾",
  "♊︎",
  "♠",
  "♥",
  "⚘",
  "✿",
  "❦",
  "𓃠",
  "𓃥",
  "𓃭",
  "𓆝",
  "𝄞",
  "🕸",
  "🗡",
  "🜲",
];

const jsConfetti = new JSConfetti();

let cardsChosen = [];
let cardOneName = "";
let cardTwoName = "";
let countdownSec = 3;
let score = 0;
let arrayCardsContent;

const lang = document.getElementById("lang");
lang.innerHTML = `Language is: ${window.navigator.language}`;

const form = document.querySelector("form");
const inputName = form.elements["name"];
const inputNumberOfCardPairs = form.elements["numberOfCardPairs"];

let numberOfCardPairs = 8;
let maxScore = 80;

const changeUiScore = () => {
  scoreEl.textContent = `${inputName.value} Score:${"\u00A0"}${score}`;
};

const scoreEl = document.querySelector("#score");
changeUiScore();

const maxScoreEl = document.querySelector("#maxScore");
maxScoreEl.textContent = `Max Score:${"\u00A0"}${maxScore}`;

const content = document.getElementById("content");

content.style.display = "grid";
content.style.gridTemplateColumns = `repeat(4, 150px)`;
content.style.gridTemplateRows = "repeat(4, 150px)";
content.style.gap = "16px";
content.style.justifyContent = "center";

const createArrAndShuffleCards = () => {
  //shuffle the cards of arrayFullCardsContent
  arrayFullCardsContent.sort(() => 0.5 - Math.random());

  //creating array of unique cards, based on user input numberOfCardPairs
  arrayCardsContent = arrayFullCardsContent.slice(0, numberOfCardPairs);

  //add a second pair
  arrayCardsContent.push(...arrayCardsContent);

  //shuffle the cards of arrayCardsContent
  arrayCardsContent.sort(() => 0.5 - Math.random());
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nameVal = validateName();

  if (nameVal === false) {
    return false;
  }

  score = 0;
  changeUiScore();

  numberOfCardPairs = inputNumberOfCardPairs.value;

  maxScore = numberOfCardPairs * 10;
  maxScoreEl.textContent = `Max Score:${"\u00A0"}${maxScore}`;

  createArrAndShuffleCards();

  deleteAllContent();
  //blocking user click on cards
  content.style.pointerEvents = "none";
  createBoardHandler();
});

const validateName = () => {
  let nameValue = inputName.value;
  if (nameValue == "") {
    window.alert("Name cannot be empty");
    return false;
  }
};

const createBoardHandler = () => {
  //create grid columns of cards depending on numberOfCardPairs
  content.style.gridTemplateColumns = `repeat(${numberOfCardPairs / 2}, 150px)`;

  for (let i = 0; i < arrayCardsContent.length; i++) {
    const card = document.createElement("div");
    card.textContent = arrayCardsContent[i];
    card.setAttribute("name", `${arrayCardsContent[i]}`);

    card.style.boxShadow =
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
    card.style.borderRadius = "8px";
    card.style.width = "150px";
    card.style.height = "150px";
    card.style.cursor = "pointer";
    card.style.fontSize = "100px";
    card.style.display = "flex";
    card.style.justifyContent = "center";
    card.style.alignItems = "center";
    card.style.color = "rgb(255, 255, 255)";
    card.style.transition = "1s";

    card.addEventListener("click", (e) => {
      const currentCardName = e.target.getAttribute("name");

      //if a pair of cards has already been turned over, return
      if (cardsChosen.find((cardName) => cardName === currentCardName)) {
        const cardsEls = document.getElementsByName(cardOneName);
        cardsEls[0].style.color = "#000";
        cardsEls[1].style.color = "#000";
        return;
      }

      //if the card text color is white, it means the card is not open
      const isNotOpenCard = e.target.style.color === "rgb(255, 255, 255)";
      e.target.style.color = "#000";

      //if this is the first card we turned over and it's not the open card
      if (!cardOneName && isNotOpenCard) {
        cardOneName = currentCardName;
        //if this is the second card we turned over and it's not the open card
      } else if (cardOneName && isNotOpenCard) {
        cardTwoName = currentCardName;
        //if the cards match
        if (cardOneName === cardTwoName) {
          cardsChosen.push(cardOneName, cardTwoName);
          score += 10;
          //if the cards don't match
        } else {
          const arrCardOneName = document.getElementsByName(cardOneName);
          const arrCardTwoName = document.getElementsByName(cardTwoName);

          //cover the cards by painting them white
          setTimeout(() => {
            arrCardOneName[0].style.color = "rgb(255, 255, 255)";
            arrCardOneName[1].style.color = "rgb(255, 255, 255)";
            arrCardTwoName[0].style.color = "rgb(255, 255, 255)";
            arrCardTwoName[1].style.color = "rgb(255, 255, 255)";
          }, 300);
          score -= 5;
        }

        cardOneName = "";
        cardTwoName = "";
      }
      changeUiScore();
      scoreEl.style.color = score >= 0 ? "green" : "red";

      //if all cards are revealed add Confetti
      if (cardsChosen.length === arrayCardsContent.length) {
        jsConfetti.addConfetti();
      }
    });
    content.appendChild(card);
  }
};

//clear our board
const deleteAllContent = () => {
  while (content.hasChildNodes()) {
    content.removeChild(content.firstChild);
  }
};

const btnStart = document.getElementById("start-btn");

const handleStartGame = () => {
  if (!arrayCardsContent) {
    alert("Please fill out and submit the form to start the game");
    return;
  }
  createArrAndShuffleCards();
  deleteAllContent();
  createBoardHandler();

  cardsChosen = [];
  countdownSec = 3;
  cardOneName = "";
  cardTwoName = "";
  score = 0;

  changeUiScore();

  btnStart.disabled = true;

  const spanCountdown = document.getElementById("countdown");

  let countdownTimer = setInterval(() => {
    if (countdownSec <= 0) {
      spanCountdown.textContent = "";
      clearInterval(countdownTimer);
      btnStart.disabled = false;
    }
    spanCountdown.textContent = countdownSec <= 0 ? "" : countdownSec;
    countdownSec -= 1;
  }, 900);

  //While the countdown is going on, we show the cards and block them
  for (let i = 0; i < arrayCardsContent.length; i++) {
    content.children[i].style.color = "#000";
    content.style.pointerEvents = "none";

    setTimeout(() => {
      content.children[i].style.color = "rgb(255, 255, 255)";
      content.style.pointerEvents = "auto";
    }, 3000);
  }
};

btnStart.onclick = handleStartGame;
