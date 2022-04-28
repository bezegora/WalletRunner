import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as JsBarcode from 'jsbarcode';
import { ICard } from 'src/app/app.component';
import { CardService } from 'src/app/services/card.service';

@Component({
    selector: 'app-card-page',
    templateUrl: './card-page.component.html',
    styleUrls: ['./card-page.component.scss'],
})
export class CardPageComponent implements OnInit {
    public card!: ICard;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _cardService: CardService,
    ) { }

    public ngOnInit(): void {
        this._route.params.subscribe((params: Params) => {
            this.card = this._cardService.getCardById(+params['id']);
        });
        JsBarcode('#barcode', this.card.num.toString());
    }

    public onClickBack(): void {
        this._router.navigate(['main-page']);
    }

    public async onDeleteCard(): Promise<void> {
        if (await this._cardService.getConfirm(`УДАЛИТЬ КАРТУ?`)) {
            this._route.params.subscribe((params: Params) => {
                this._cardService.deleteCardById(+params['id']);
            });
            this._router.navigate(['main-page']);
        }
    }

    public onRedactCard(): void {
        this._route.params.subscribe((params: Params) => {
            this._router.navigate(['redact'], { relativeTo: this._route });
        });
    }
}
