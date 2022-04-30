import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as JsBarcode from 'jsbarcode';
import { CardViewModel } from '../../../../../main-cabinet/viewmodels/card.viewmodel';

import { CardService } from '../../../../../main-cabinet/services/card.service';

@Component({
    templateUrl: './card.page.html',
    styleUrls: ['./styles/card.page.scss'],
})
export class CardPage implements OnInit {
    public card!: CardViewModel;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _cardService: CardService,
    ) { }

    public ngOnInit(): void {
        this._route.params.subscribe((params: Params) => {
            this.card = new CardViewModel(this._cardService.getCardById(+params['id']));
        });
        JsBarcode('#barcode', this.card.cardNumber.toString());
    }

    public onClickBack(): void {
        this._router.navigate(['cabinet']);
    }

    public async onDeleteCard(): Promise<void> {
        if (await this._cardService.getConfirm(`УДАЛИТЬ КАРТУ?`)) {
            this._route.params.subscribe((params: Params) => {
                this._cardService.deleteCardById(+params['id']);
            });
            this._router.navigate(['cabinet']);
        }
    }

    public onRedactCard(): void {
        this._route.params.subscribe((params: Params) => {
            this._router.navigate(['edit-card'], { relativeTo: this._route });
        });
    }
}
