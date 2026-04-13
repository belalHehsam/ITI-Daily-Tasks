export default class Card {
    id;
    value;
    isFlipped;
    isMatched;
    constructor(id, value, isFlipped = false, isMatched = false) {
        this.id = id;
        this.value = value;
        this.isFlipped = isFlipped;
        this.isMatched = isMatched;
    }
}
//# sourceMappingURL=Card.js.map