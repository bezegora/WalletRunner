import { Component, ComponentRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner, ScanResult } from '@capacitor-community/barcode-scanner';
import { take } from 'rxjs';

import { CardService } from '../../../../main-cabinet/services/card.service';
import { CardModel } from '../../../models/card.model';
import { ModalComponent } from '../../../modules/modal-window/modal/modal.component';
import { RefDirective } from '../../../modules/modal-window/ref.directive';
import { AddCardViewModel } from '../../../view-models/add-card.view-model';

@Component({
    templateUrl: './add-card.page.html',
    styleUrls: ['./styles/add-card.page.scss'],
})
export class AddCardPage {
    public stores: string[] = ['Пятёрочка', 'Красное&белое', 'Перекрёсток', 'Лента', 'Магнит', 'Монетка'];
    public addCardViewModel: AddCardViewModel = new AddCardViewModel();
    @ViewChild(RefDirective, { static: false })
    public refDir!: RefDirective;
    public selectedOptions!: string;

    public get isOnWeb(): boolean {
        console.log(navigator.userAgent);

        return /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent);
    }


    constructor(
        private _router: Router,
        private _cardService: CardService,
    ) { }



    public onClickBack(): void {
        this._router.navigate(['cabinet']);
    }

    public onSubmit(): void {
        const card: CardModel = this.addCardViewModel.toModel();
        if (this.addCardViewModel.cardForm.valid) {
            this.showModal(
                'СОХРАНИТЬ КАРТУ?',
                () => {
                    this.refDir.container.clear();
                    this._cardService.addCard(card);
                    this._router.navigate(['cabinet']);
                },
                () => {
                    this.refDir.container.clear();
                });
        };
    }

    public async onStartScan(): Promise<void> {
        BarcodeScanner.hideBackground();
        const result: ScanResult = await BarcodeScanner.startScan();
        if (result.hasContent) {
        }
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
