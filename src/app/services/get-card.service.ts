import { Injectable } from '@angular/core';
import { Card } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class GetCardService {
  _mockCard!: Card[]
  constructor() { }

  getCard(id: number) {
    this._mockCard
    return this._mockCard[id]
  }
}
