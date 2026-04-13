import Card from './Card.js';
import { shuffle } from './../utils/Shuffle.js';
import sound from '../services/gameServices.js';
export class Game {
    cards = [];
    flippedCards = [];
    matchedPairs = 0;
    count = 0;
    constructor(images) {
        this.cards = this.createCards(images);
        sound.playBackground();
    }
    createCards(images) {
        const allImages = [...images, ...images];
        const shuffled = shuffle(allImages);
        console.log(shuffled);
        return shuffled.map((image, index) => new Card(index, image));
    }
    flipCard(card, update) {
        if (card.isFlipped || card.isMatched || !this.canFlip())
            return;
        sound.playFlip();
        card.isFlipped = true;
        this.flippedCards.push(card);
        if (this.flippedCards.length >= 2) {
            console.log(this.flippedCards.length);
            this.checkMatch(update);
            console.log(this.flippedCards.length);
        }
    }
    checkMatch(update) {
        const [card1, card2] = this.flippedCards;
        if (card1?.value === card2?.value) {
            sound.playMatch();
            card1 && (card1.isMatched = true);
            card2 && (card2.isMatched = true);
            this.matchedPairs++;
            this.resetFlipped();
            (update && update());
            if (this.isGameOver()) {
                sound.stopBackground();
                sound.playBGCongratulaions();
                sound.playCongratulaions();
                console.log("game over");
            }
        }
        else {
            this.halfMatched();
            setTimeout(() => {
                card1 && (card1.isFlipped = false);
                card2 && (card2.isFlipped = false);
                this.resetFlipped();
                (update && update());
            }, 900);
        }
    }
    resetFlipped() {
        this.flippedCards = [];
        console.log("reset");
    }
    canFlip() {
        return this.flippedCards.length < 2;
    }
    isGameOver() {
        return this.matchedPairs === this.cards.length / 2;
    }
    getProgressBar() {
        return Math.floor((this.matchedPairs / (this.cards.length / 2)) * 100);
        ;
    }
    halfMatched() {
        this.count++;
        if (this.count == 3 || this.count == 10)
            sound.playNotMatch();
    }
}
//# sourceMappingURL=Game.js.map