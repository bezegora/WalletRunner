import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from, map, Observable } from 'rxjs';
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
        private _router: Router,
    ) {
    }

    public ngOnInit(): void {
        this.mockCards$ = from(this._cardService.getCardList());
    }



    public onCardClick(card: CardModel): void {
        this._router.navigate(['card', card.id]);
    };

}
