import { Component } from '@angular/core';

@Component({
  selector: 'app-carsoul',
  imports: [],
  templateUrl: './carsoul.html',
  styleUrl: './carsoul.css',
})

export class Carsoul {
  images: string[] = [
    '1.jfif',
    '2.jfif',
    '3.jfif',
    '4.jfif'
  ];
   currentIndex: number = 0;

   next(){
    this.currentIndex=(this.currentIndex+1)%this.images.length; 
    }
    prev(){
      this.currentIndex=(this.currentIndex -1 +this.images.length)%this.images.length
    }
    goTo(index:number){
      this.currentIndex=index
    }
}

