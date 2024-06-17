const arrayCardsContent = [
  "♥",
  "★",
  "❦",
  "🜲",
  "🕸",
  "♠",
  "✿",
  "☾",
  "♥",
  "★",
  "❦",
  "🜲",
  "🕸",
  "♠",
  "✿",
  "☾",
];

// "𓆝",
// "🗡",
// "𓃠",
// "𓃥",
// "𝄞",
// "⚘",
// "♊︎",
// "𓃭",
// "♥",
// "★",
// "❦",
// "🜲",
// "🕸",
// "♠",
// "✿",
// "☾",

let cardsChosen = [];
let cardOneName = "";
let cardTwoName = "";
let countdownSec = 3;

const content = document.getElementById("content");

content.style.display = "grid";
content.style.gridTemplateColumns = "150px 150px 150px 150px";
content.style.gap = "16px";
content.style.justifyContent = "center";

const createBoardHandler = () => {
  arrayCardsContent.sort(() => 0.5 - Math.random());

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
        }

        cardOneName = "";
        cardTwoName = "";
      }
    });
    content.appendChild(card);
  }
};

const btnStart = document.getElementById("start-btn");

const handleStartGame = () => {
  while (content.hasChildNodes()) {
    content.removeChild(content.firstChild);
  }

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
