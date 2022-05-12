import { Component, ComponentRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner, ScanResult } from '@capacitor-community/barcode-scanner';

import { CardService } from '../../../../main-cabinet/services/card.service';
import { CardModel } from '../../../models/card.model';
import { ModalComponent } from '../../../modules/modal-window/modal/modal.component';
import { RefDirective } from '../../../modules/modal-window/ref.directive';
import { AddCardViewModel } from './add-card.view-model';

@Component({
    templateUrl: './add-card.page.html',
    styleUrls: ['./styles/add-card.page.scss'],
})
export class AddCardPage {
    public stores: string[] = ['Пятёрочка', 'Красное&белое', 'Перекресток', 'Лента', 'Магнит', 'Монетка'];
    public selectedOptions!: string;

    public addCardViewModel: AddCardViewModel = new AddCardViewModel();
    @ViewChild(RefDirective, { static: false }) public refDir!: RefDirective;

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

        // this._notificationService.showToast(new TinyNotificationModel('ТЕСТ', 'ТЕСТ'));
        // if (this.addCardViewModel.cardForm.valid && await this._cardService.getConfirm(`ДОБАВИТЬ КАРТУ?`)) {
        //     this._cardService.addCard(card);
        //     this._router.navigate(['cabinet']);
        // }
    }

    // private markFormGroupTouched(formGroup: FormGroup): void {
    //     (<any>Object).values(formGroup.controls).forEach((control) => {
    //         if (control.controls) { // control is a FormGroup
    //             this.markFormGroupTouched(control);
    //         } else { // control is a FormControl
    //             control.markAsTouched();
    //         }
    //     });
    // }

    public async onStartScan(): Promise<void> {
        BarcodeScanner.hideBackground();
        const result: ScanResult = await BarcodeScanner.startScan();
        if (result.hasContent) {
            console.log(result.content);
        }
    }
    private showModal(modalTitle: string, modalAgree: VoidFunction, modalDisagree: VoidFunction): void {
        this.refDir.container.clear();
        const component: ComponentRef<ModalComponent> = this.refDir.container.createComponent(ModalComponent);

        component.instance.title = modalTitle;
        component.instance.agree.subscribe(modalAgree);
        component.instance.disagree.subscribe(modalDisagree);
    }

}
