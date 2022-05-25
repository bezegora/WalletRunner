import { Component, ComponentRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as JsBarcode from 'jsbarcode';
import { take } from 'rxjs';

import { ModalComponent } from '../../../../../main-cabinet/modules/modal-window/modal/modal.component';
import { RefDirective } from '../../../../../main-cabinet/modules/modal-window/ref.directive';
import { CardService } from '../../../../../main-cabinet/services/card.service';
import { CardViewModel } from '../../../../view-models/card.viewmodel';

@Component({
    templateUrl: './card.page.html',
    styleUrls: ['./styles/card.page.scss'],
})
export class CardPage implements OnInit {
    public card!: CardViewModel;

    @ViewChild(RefDirective, { static: false }) public refDir!: RefDirective;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _cardService: CardService,
    ) { }

    public ngOnInit(): void {
        this._route.params
            .subscribe((params: Params) => {
                this.card = new CardViewModel(this._cardService.getCardById(+params['id']));
            })
            .unsubscribe();
        JsBarcode('#barcode', this.card.cardNumber.toString(), { background: '#E9E9E9', width: 3, height: 70 });
    }

    public onClickBack(): void {
        this._router.navigate(['cabinet']);
    }

    public onDeleteCard(): void {
        this.showModal(
            'УДАЛИТЬ КАРТУ?',
            () => {
                this.refDir.container.clear();
                this._route.params
                    .subscribe((params: Params) => {
                        this._cardService.deleteCardById(+params['id']);
                    })
                    .unsubscribe();
                this._router.navigate(['cabinet']);
            },
            () => {
                this.refDir.container.clear();
            });
    }

    public onRedactCard(): void {
        this._route.params
            .subscribe((params: Params) => {
                this._router.navigate(['edit-card'], { relativeTo: this._route });
            })
            .unsubscribe();
    }

    public onChangeFavourites(): void {
        this.card.isFavorite = !this.card.isFavorite;
        this._route.params
            .subscribe((params: Params) => {
                this._cardService.changeIsFavorite(+params['id']);
            })
            .unsubscribe();
    }

    private showModal(modalTitle: string, modalAgree: VoidFunction, modalDisagree: VoidFunction): void {
        this.refDir.container.clear();
        const component: ComponentRef<ModalComponent> = this.refDir.container.createComponent(ModalComponent);

        component.instance.title = modalTitle;
        component.instance.agree
            .pipe(
                take(1)
            )
            .subscribe(modalAgree);
        component.instance.disagree
            .pipe(
                take(1)
            )
            .subscribe(modalDisagree);
    }
}
