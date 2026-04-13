import { Game } from "./models/Game.js";
import Card from "./models/Card.js";
export function renderGameBoard(game) {
    const container = document.querySelector('.card-grid');
    container.innerHTML = "";
    game.cards.forEach((card) => {
        const cardDiv = document.createElement('div');
        const cardInner = document.createElement('div');
        const cardFront = document.createElement('div');
        const cardBack = document.createElement('div');
        const frontImg = document.createElement('img');
        const backImg = document.createElement('img');
        cardDiv.className = 'card';
        cardInner.className = 'card-inner';
        cardFront.className = 'card-front';
        cardBack.className = 'card-back';
        frontImg.src = "../assets/Back/15.jfif";
        backImg.src = card.value;
        cardFront.appendChild(frontImg);
        cardBack.appendChild(backImg);
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        cardDiv.appendChild(cardInner);
        if (card.isFlipped || card.isMatched) {
            cardDiv.classList.add("flipped");
        }
        if (card.isMatched) {
            cardDiv.classList.add("matched");
        }
        const progressBar = document.querySelector(".progress-bar");
        const progressDegree = document.querySelector(".progress-degree");
        progressBar.style.width = game.getProgressBar() + "%";
        progressDegree.innerText = game.getProgressBar() + "%";
        cardDiv.addEventListener("click", () => {
            game.flipCard(card, () => {
                renderGameBoard(game);
            });
            if (game.isGameOver()) {
                winPopUp();
            }
            renderGameBoard(game);
        });
        container.appendChild(cardDiv);
    });
}
function winPopUp() {
    let popUp = document.querySelector(".congratulations");
    let popUpCongratulation = document.querySelector(".divCongratulation");
    setTimeout(() => {
        popUp.classList.remove("d-none");
        popUpCongratulation.classList.add("show");
    }, 1000);
}
let reStartBtn = document.querySelector(".againBtn");
reStartBtn.addEventListener("click", () => {
    location.reload();
});
//# sourceMappingURL=ui.js.map