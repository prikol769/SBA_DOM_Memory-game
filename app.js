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

const content = document.getElementById("content");
let cards;
content.style.display = "grid";
content.style.gridTemplateColumns = "150px 150px 150px 150px";
content.style.gap = "16px";
content.style.justifyContent = "center";

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

    console.log("cardsChosen", cardsChosen);
    console.log("cardOneName", cardOneName);
    console.log("cardTwoName", cardTwoName);
  });

  content.appendChild(card);
}
