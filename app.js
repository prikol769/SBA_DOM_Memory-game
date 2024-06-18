const arrayFullCardsContent = [
  "★",
  "★",
  "☾",
  "☾",
  "♊︎",
  "♊︎",
  "♠",
  "♠",
  "♥",
  "♥",
  "⚘",
  "⚘",
  "✿",
  "✿",
  "❦",
  "❦",
  "𓃠",
  "𓃠",
  "𓃥",
  "𓃥",
  "𓃭",
  "𓃭",
  "𓆝",
  "𓆝",
  "𝄞",
  "𝄞",
  "🕸",
  "🕸",
  "🗡",
  "🗡",
  "🜲",
  "🜲",
];

let cardsChosen = [];
let cardOneName = "";
let cardTwoName = "";
let countdownSec = 3;
let score = 0;
let arrayCardsContent;

const form = document.querySelector("form");
const inputName = form.elements["name"];
const inputNumberOfCardPairs = form.elements["numberOfCardPairs"];

let numberOfCardPairs = 8;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  scoreEl.textContent = `${inputName.value} Score:${"\u00A0"}${score}`;

  numberOfCardPairs = inputNumberOfCardPairs.value;
  arrayCardsContent = arrayFullCardsContent.slice(0, numberOfCardPairs * 2);

  deleteAllContent();
  content.style.pointerEvents = "none";
  createBoardHandler();
});

const scoreEl = document.getElementById("score");
scoreEl.textContent = `${inputName.value} Score:${"\u00A0"}${score}`;

const content = document.getElementById("content");

content.style.display = "grid";
content.style.gridTemplateColumns = `repeat(4, 150px)`;
content.style.gridTemplateRows = "repeat(4, 150px)";
content.style.gap = "16px";
content.style.justifyContent = "center";

const createBoardHandler = () => {
  arrayCardsContent.sort(() => 0.5 - Math.random());
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

      if (cardsChosen.find((cardName) => cardName === currentCardName)) {
        return;
      }

      const isNotOpenCard = e.target.style.color === "rgb(255, 255, 255)";
      e.target.style.color = "#000";

      if (!cardOneName && isNotOpenCard) {
        cardOneName = currentCardName;
      } else if (cardOneName && isNotOpenCard) {
        cardTwoName = currentCardName;
        if (cardOneName === cardTwoName) {
          cardsChosen.push(cardOneName, cardTwoName);
          score += 10;
        } else {
          const arrCardOneName = document.getElementsByName(cardOneName);
          const arrCardTwoName = document.getElementsByName(cardTwoName);

          console.log("arrCardTwoName", arrCardTwoName);

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
      scoreEl.textContent = `${inputName.value} Score:${"\u00A0"}${score}`;
      scoreEl.style.color = score >= 0 ? "green" : "red";
    });
    content.appendChild(card);
  }
};

const deleteAllContent = () => {
  while (content.hasChildNodes()) {
    content.removeChild(content.firstChild);
  }
};

const btnStart = document.getElementById("start-btn");

const handleStartGame = () => {
  if (!arrayCardsContent) {
    alert("Please fill out and submit the form to start the game");
  }
  deleteAllContent();
  createBoardHandler();

  cardsChosen = [];
  countdownSec = 3;
  cardOneName = "";
  cardTwoName = "";

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
