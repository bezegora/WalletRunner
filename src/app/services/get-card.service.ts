import { Injectable } from '@angular/core';
import { Card } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class GetCardService {
  private _mockCard!: Card[]

  constructor() {
    this.initialize()
  }

  public initialize(): void{
    this._mockCard =  [
      { title: 'Пятерочка', num: 123456789, id: 1 },
      { title: 'Магнит', num: 123456, id: 2 },
      { title: 'Монетка', num: 123, id: 3 }
    ];
  }

  getCardById(id: number) {
    return this._mockCard.filter((card: Card) => {
      return card.id === id
    })[0]
  }
}
