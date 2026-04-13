import type { IGame } from './../interfaces/IGame.js';
import type { ICard } from './../interfaces/ICard.js';
import Card from './Card.js';
export declare class Game implements IGame {
    cards: ICard[];
    flippedCards: ICard[];
    matchedPairs: number;
    count: number;
    constructor(images: string[]);
    private createCards;
    flipCard(card: Card, update?: () => void): void;
    checkMatch(update?: () => void): void;
    resetFlipped(): void;
    canFlip(): boolean;
    isGameOver(): boolean;
    getProgressBar(): number;
    halfMatched(): void;
}
//# sourceMappingURL=Game.d.ts.map