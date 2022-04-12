import { Injectable } from '@angular/core';
import { Card } from '../app.component';

@Injectable({
  providedIn: 'root',
})
export class GetCardService {
  private mockCard!: Card[];

  constructor() {
    this.initialize();
  }

  public initialize(): void {
    this.mockCard = [
      { title: 'Пятерочка', num: 123456789, id: 1 },
      { title: 'Магнит', num: 123456, id: 2 },
      { title: 'Монетка', num: 123, id: 3 },
    ];
  }

  getCardById(id: number) {
    return this.mockCard.filter((card: Card) => card.id === id)[0];
  }

  addCard(card: Card) {
    this.mockCard.push(card);
    console.log(this.mockCard);
  }

  getCardList() {
    return this.mockCard;
  }

  deleteCardById(id: number) {
    this.mockCard = this.mockCard.filter((card: Card) => card.id !== id);
  }
}
