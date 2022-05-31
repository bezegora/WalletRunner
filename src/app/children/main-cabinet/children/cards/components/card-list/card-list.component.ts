import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';

import { CardModel } from '../../../../../main-cabinet/models/card.model';
import { CardService } from '../../../../../main-cabinet/services/card.service';

@Component({
    selector: 'app-card-list',
    templateUrl: './card-list.component.html',
    styleUrls: ['./styles/card-list.component.scss'],
})
export class CardListComponent implements OnInit {
    public mockCards$!: Observable<CardModel[]>;

    constructor(
        private _cardService: CardService,
    ) { }

    public ngOnInit(): void {
        if (navigator.onLine) {
            this.mockCards$ = this._cardService.getCardList();
        } else {
            this.mockCards$ = this._cardService.offlineGetCardList();
        }
    }
}
