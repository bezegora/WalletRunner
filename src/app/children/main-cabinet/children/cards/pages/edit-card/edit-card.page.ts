import { Component, ComponentRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as JsBarcode from 'jsbarcode';
import { take } from 'rxjs';

import { CardModel } from '../../../../../main-cabinet/models/card.model';
import { ModalComponent } from '../../../../../main-cabinet/modules/modal-window/modal/modal.component';
import { RefDirective } from '../../../../../main-cabinet/modules/modal-window/ref.directive';
import { CardService } from '../../../../../main-cabinet/services/card.service';
import { EditCardViewModel } from '../../../../view-models/edit-card.view-model';

@Component({
    templateUrl: './edit-card.page.html',
    styleUrls: ['./styles/edit-card.page.scss']
})
export class EditCardPage implements OnInit {

    public stores: string[] = ['Пятёрочка', 'Красное&белое', 'Перекрёсток', 'Лента', 'Магнит', 'Монетка'];
    public editCardViewModel!: EditCardViewModel;
    public storeForm!: FormGroup;
    @ViewChild(RefDirective, { static: false })
    public refDir!: RefDirective;
    public selectedStore: string;

    constructor(
        private _route: ActivatedRoute,
        private _cardService: CardService,
        private _router: Router,
    ) {
        this._route.params
            .subscribe((params: Params) => {
                const card: CardModel = this._cardService.getCardById(+params['id']);
                this.editCardViewModel = new EditCardViewModel(card);
            })
            .unsubscribe();
        this.storeForm = this.editCardViewModel.storeForm;
        this.selectedStore = this.editCardViewModel.card.title;
    }

    public ngOnInit(): void {
        JsBarcode('#barcode', this.editCardViewModel.card.cardNumber.toString(), { width: 3, height: 70, displayValue: false });
    }

    public onSubmit(): void {
        this.showModal(
            'СОХРАНИТЬ ИЗМЕНЕНИЯ',
            () => {
                this.refDir.container.clear();
                this._cardService.redactCardById(this.editCardViewModel.card.id, this.storeForm.value.store);
                this._router.navigate(['card', this.editCardViewModel.card.id]);
            }, () => {
                this.refDir.container.clear();
            });
    }

    public onClickBack(): void {
        this.showModal(
            'СОХРАНИТЬ ИЗМЕНЕНИЯ',
            () => {
                this.refDir.container.clear();
                this._cardService.redactCardById(this.editCardViewModel.card.id, this.storeForm.value.store);
                this._router.navigate(['card', this.editCardViewModel.card.id]);
            },
            () => {
                this.refDir.container.clear();
                this._router.navigate(['card', this.editCardViewModel.card.id]);
            });
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
