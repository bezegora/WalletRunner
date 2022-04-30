import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as JsBarcode from 'jsbarcode';

import { CardModel } from '../../../../../main-cabinet/models/card.model';
import { CardService } from '../../../../../main-cabinet/services/card.service';

@Component({
    templateUrl: './edit-card.page.html',
    styleUrls: ['./styles/edit-card.page.scss']
})
export class EditCardPage implements OnInit {

    public stores: string[] = ['Пятёрочка', 'Красное&белое', 'Перекресток', 'Лента', 'Магнит', 'Монетка'];
    public storeForm!: FormGroup;
    public card!: CardModel;

    constructor(
        private _route: ActivatedRoute,
        private _cardService: CardService,
        private _router: Router,
    ) {
        this._route.params.subscribe((params: Params) => {
            this.card = this._cardService.getCardById(+params['id']);
        });
        this.storeForm = new FormGroup({
            store: new FormControl(this.card.title)
        });
    }
    public ngOnInit(): void {
        JsBarcode('#barcode', this.card.cardNumber.toString());
    }

    public async onSubmit(): Promise<void> {
        if (await this._cardService.getConfirm(`ИЗМЕНИТЬ КАРТУ?`)) {
            this._cardService.redactCardById(this.card.id, this.storeForm.value.store);
        }
        this._router.navigate(['card', this.card.id]);
    }

    public onClickBack(): void {
        this._router.navigate(['card', this.card.id]);
    }
}
