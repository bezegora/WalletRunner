import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ICard } from 'src/app/app.component';
import { CardService } from 'src/app/services/card.service';

@Component({
    selector: 'app-redact',
    templateUrl: './redact.page.html',
    styleUrls: ['./redact.page.scss']
})
export class RedactComponent {

    public stores: string[] = ['ПЯТЁРОЧКА', 'КРАСНОЕ&БЕЛОЕ', 'ПЕРЕКРЁСТОК', 'ЛЕНТА', 'МАГНИТ', 'МОНЕТКА'];
    public storeForm!: FormGroup;
    public card!: ICard;

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
