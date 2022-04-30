import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CardModel } from '../../../../../main-cabinet/models/card.model';

import { CardService } from '../../../../../main-cabinet/services/card.service';

@Component({
    selector: 'app-card-list',
    templateUrl: './card-list.component.html',
    styleUrls: ['./styles/card-list.component.scss'],
})
export class CardListComponent {
    public mockCards: CardModel[];

    constructor(
        cardService: CardService,
        private _router: Router,
    ) {
        this.mockCards = cardService.getCardList();
    }

    public onCardClick(card: CardModel): void {
        this._router.navigate(['card', card.id]);
    };

}
