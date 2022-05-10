import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation, Position } from '@capacitor/geolocation';
import { from, map, Observable } from 'rxjs';

import { CardService } from '../../../main-cabinet/services/card.service';
import { CardModel } from '../../models/card.model';


@Component({
    templateUrl: './main-cabinet.page.html',
    styleUrls: ['./styles/main-cabinet.page.scss']
})
export class MainCabinetPage implements OnInit {
    public mockCards$!: Observable<CardModel[]>;

    constructor(
        private _router: Router,
        private _cardService: CardService,
    ) { }

    public ngOnInit(): void {
        this.mockCards$ = from(this._cardService.getCardList());
    }


    public toAddCardPage(): void {
        this._router.navigate(['add-card']);
    }

    public geolocationTest = async (): Promise<void> => {
        const coordinates: Position = await Geolocation.getCurrentPosition();
        console.log(coordinates.coords.latitude);
        console.log(coordinates.coords.longitude);

        this._cardService.getSortedStoresFromServer(coordinates.coords.latitude, coordinates.coords.longitude)
            .pipe(
                map((v: CardModel[]) => v.map((card: CardModel) => console.log(card)))
            )
            .subscribe();
    };

}
