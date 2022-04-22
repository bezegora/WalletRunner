import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardService } from 'src/app/services/card.service';
import { ICard } from '../../app.component';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
    public mockCards: ICard[];
    constructor(
        private _router: Router,
        private _cardService: CardService,
    ) {
        this.mockCards = this._cardService.getCardList();
    }

    public ngOnInit(): void {
    }


    public toAddCardPage(): void {
        this._router.navigate(['add-card']);
    }
}
