import type {IGame} from './../interfaces/IGame.js';
import type { ICard } from './../interfaces/ICard.js';
import Card from './Card.js';
import { shuffle } from './../utils/Shuffle.js';
import sound from '../services/gameServices.js'

export class Game implements IGame {   
    cards: ICard[]=[];
    flippedCards: ICard[]=[];
    matchedPairs: number=0;
    count=0;
    constructor(images:string[]) {
        this.cards=this.createCards(images);
        sound.playBackground()
    }

    private createCards(images: string[]): Card[] {
        const allImages=[...images,...images];
        const shuffled=shuffle(allImages);
        console.log(shuffled);
        return shuffled.map((image:string,index:number)=> new Card(index,image))
    } 

    flipCard(card:Card,update?:()=> void ){
        if (card.isFlipped || card.isMatched ||!this.canFlip()) return;

        sound.playFlip()
        card.isFlipped=true;
        this.flippedCards.push(card);
        if(this.flippedCards.length>=2){
                console.log(this.flippedCards.length);
                  this.checkMatch(update);
                  console.log(this.flippedCards.length);
        }
    }

    checkMatch(update?:()=>void){
        const[card1,card2]=this.flippedCards;
        if(card1?.value===card2?.value){
            sound.playMatch()
            card1 && (card1.isMatched=true);
            card2 && (card2.isMatched=true);
            this.matchedPairs++;
            this.resetFlipped();
            (update && update())

            if(this.isGameOver()){
             sound.stopBackground()
             sound.playBGCongratulaions()
             sound.playCongratulaions();
             console.log("game over");
            }
        }

        else{
            this.halfMatched()
            setTimeout(() => {
                card1 && (card1.isFlipped=false);
                 card2 && (card2.isFlipped=false);
                 this.resetFlipped();
               (update && update())
            }, 900); 
        }
    }

    resetFlipped(){
        this.flippedCards=[];
        console.log("reset");
    }

    canFlip():boolean {
        return this.flippedCards.length < 2
    }

    isGameOver():boolean{
        return this.matchedPairs ===this.cards.length / 2;
    }

    getProgressBar():number{
        return  Math.floor((this.matchedPairs / (this.cards.length / 2)) * 100); ;
    }

    halfMatched(){
        this.count++;
        if(this.count==3||this.count==10)
            sound.playNotMatch()
    }

}
