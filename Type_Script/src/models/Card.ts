import type { ICard } from './../interfaces/ICard.js';

export default class Card implements ICard {
  
  constructor(public id: number,public value: string,public isFlipped = false, public isMatched = false) {
    
  }
}

