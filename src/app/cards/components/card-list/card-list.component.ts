import { Component } from '@angular/core';
import { ICard } from 'src/app/app.component';
import { CardService } from 'src/app/services/card.service';

@Component({
    selector: 'app-card-list',
    templateUrl: './card-list.component.html',
    styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent {
    public mockCards: ICard[];

    constructor(
        cardService: CardService,
    ) {
        this.mockCards = cardService.getCardList();
    }
}
