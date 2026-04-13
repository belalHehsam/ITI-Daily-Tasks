import { Game } from './models/Game.js';
import { renderGameBoard } from './ui.js';
import sound from './services/gameServices.js';
let startDiv = document.querySelector(".start");
let startGameDiv = document.querySelector(".startGame");
let startBtn = document.querySelector(".startBtn");
const images = [
    "../assets/images2/1.jfif",
    "../assets/images2/3.jfif",
    "../assets/images2/5.jfif",
    "../assets/images2/6.jfif",
    "../assets/images2/7.jfif",
    "../assets/images2/8.jfif",
    "../assets/images2/9.jfif",
    "../assets/images2/10.jfif",
];
var game;
startBtn?.addEventListener("click", async () => {
    console.log("tmmm");
    await count();
    var game = new Game(images);
    renderGameBoard(game);
});
function count() {
    return new Promise((resolve) => {
        setTimeout(() => {
            sound.countDown();
        }, 1000);
        let i = 3;
        let interval = setInterval(() => {
            if (i > 0) {
                startDiv.innerText = i.toString();
            }
            else if (i === 0) {
                startDiv.innerText = "GO";
            }
            else {
                clearInterval(interval);
                startDiv.style.display = "none";
                resolve();
            }
            i--;
        }, 1000);
    });
}
//# sourceMappingURL=index.js.map