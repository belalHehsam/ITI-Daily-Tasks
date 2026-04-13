import type { ICard } from './../interfaces/ICard.js';
export default class Card implements ICard {
    id: number;
    value: string;
    isFlipped: boolean;
    isMatched: boolean;
    constructor(id: number, value: string, isFlipped?: boolean, isMatched?: boolean);
}
//# sourceMappingURL=Card.d.ts.map