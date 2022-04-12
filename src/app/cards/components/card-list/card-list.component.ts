import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/app.component';
import {GetCardService} from 'src/app/services/get-card.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  mockCards!: Card[];

  constructor(
    cardService: GetCardService,
  ) {
    this.mockCards = cardService.getCardList();
  }

  ngOnInit(): void {
  }
}
