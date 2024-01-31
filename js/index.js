let cardsArray = [
  {
    name: "apple",
    img: "../assets/apple.png",
  },
  {
    name: "orange",
    img: "../assets/orange.png",
  },

  {
    name: "cherry",
    img: "../assets/cherry.png",
  },
  {
    name: "coconut",
    img: "../assets/coconut.png",
  },
  {
    name: "guava",
    img: "../assets/guava.png",
  },
  {
    name: "grapes",
    img: "../assets/grapes.png",
  },
];

const parentDiv = document.querySelector("#card-section");

// step 2 - to duplicate each card..
const gameCard = cardsArray.concat(cardsArray);

// step 3
// Note that this method creates a new shuffled array instead of modifying the original one.
const myNumbers = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    // console.log(i, j)
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

let clickCount = 0;
let firstCard = "";
let secondCard = "";

// styling the match card
const card_matches = () => {
  let card_selected = document.querySelectorAll(".card_selected");

  card_selected.forEach((curElem) => {
    curElem.classList.add("card_match");
  });
};

// step 7 - reset cards
const resetGame = () => {
  firstCard = "";
  secondCard = "";
  clickCount = 0;

  let card_selected = document.querySelectorAll(".card_selected");

  card_selected.forEach((curElem) => {
    curElem.classList.remove("card_selected");
  });
};

// step 4
parentDiv.addEventListener("click", (Event) => {
  let currentCard = Event.target;

  if (currentCard.id === "card-section") {
    return false;
  }

  clickCount++;
  if (clickCount < 3) {
    if (clickCount === 1) {
      firstCard = currentCard.parentNode.dataset.name;
      currentCard.parentNode.classList.add("card_selected");
    } else {
      secondCard = currentCard.parentNode.dataset.name;
      currentCard.parentNode.classList.add("card_selected");
    }

    if (firstCard !== "" && secondCard !== "") {
      if (firstCard === secondCard) {
        // currentCard.classList.add("card_match");
        setTimeout(() => {
          card_matches();
          resetGame();
        }, 1000);
      } else {
        setTimeout(() => {
          resetGame();
        }, 1000);
      }
    }
  }
});

// step 1 to add the card
const shuffledChild = myNumbers(gameCard);
for (let i = 0; i < shuffledChild.length; i++) {
  const childDiv = document.createElement("div");
  childDiv.classList.add("card");
  childDiv.dataset.name = shuffledChild[i].name;

  const front_div = document.createElement("div");
  front_div.classList.add("front-card");

  const back_div = document.createElement("div");
  back_div.classList.add("back-card");

  back_div.style.backgroundImage = `url(${shuffledChild[i].img})`;

  parentDiv.appendChild(childDiv);
  childDiv.appendChild(front_div);
  childDiv.appendChild(back_div);
}
