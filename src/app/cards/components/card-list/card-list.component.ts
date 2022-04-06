import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/app.component';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  mockCards!: Card[]

  constructor() {
    this.mockCards = [
      { title: 'Пятерочка', num: 123456789, id: 1 },
      { title: 'Магнит', num: 123456, id: 2 },
      { title: 'Монетка', num: 123, id: 3 }
    ];
  }

  ngOnInit(): void {
  }

}
